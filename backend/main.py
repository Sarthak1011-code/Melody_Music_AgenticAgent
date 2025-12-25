import sys
import os
import uuid
import traceback
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
from google.genai import types

# Ensure the parent directory is in the python path to import Assistant
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from Assistant.agent import root_agent
from google.adk.apps.app import App
from google.adk.runners import Runner
from google.adk.sessions.in_memory_session_service import InMemorySessionService
from google.adk.artifacts.in_memory_artifact_service import InMemoryArtifactService
from google.adk.memory.in_memory_memory_service import InMemoryMemoryService
from google.adk.auth.credential_service.in_memory_credential_service import InMemoryCredentialService
from google.adk.utils.context_utils import Aclosing
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Nyaya Agent API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Services
session_service = InMemorySessionService()
artifact_service = InMemoryArtifactService()
memory_service = InMemoryMemoryService()
# Note: InMemoryCredentialService might not need arguments
credential_service = InMemoryCredentialService()

# Wrap agent in App
agent_app = App(name="NyayaAgent", root_agent=root_agent)

# Initialize Runner
runner = Runner(
    app=agent_app,
    session_service=session_service,
    artifact_service=artifact_service,
    memory_service=memory_service,
    credential_service=credential_service
)

class ChatRequest(BaseModel):
    message: str
    user_id: str = "default_user"
    session_id: str = "default_session"

class ChatResponse(BaseModel):
    response: str

@app.get("/")
def read_root():
    return {"status": "Agent Backend Running"}

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        # Ensure session exists
        session = await session_service.get_session(
            app_name="NyayaAgent",
            user_id=request.user_id,
            session_id=request.session_id
        )
        if not session:
            session = await session_service.create_session(
                app_name="NyayaAgent",
                user_id=request.user_id,
                session_id=request.session_id
            )

        print(f"Running agent for session {request.session_id}")
        
        # Create Content object wrapping the user message
        user_msg_content = types.Content(
            role="user",
            parts=[types.Part(text=request.message)]
        )
        
        events = []
        async with Aclosing(
            runner.run_async(
                user_id=request.user_id,
                session_id=request.session_id,
                new_message=user_msg_content,
            )
        ) as agen:
            async for event in agen:
                events.append(event)
                print(f"Event received: {type(event)}")

        # Extract response from events
        response_text = "No response text found."
        
        # Look for the last event that contains the model response
        for event in reversed(events):
             if hasattr(event, 'content') and event.content:
                 content = event.content
                 # Check if content has parts
                 if hasattr(content, 'parts') and content.parts:
                     # Join text from all parts
                     texts = []
                     for part in content.parts:
                         if hasattr(part, 'text') and part.text:
                             texts.append(part.text)
                     if texts:
                         response_text = "".join(texts)
                         break
                 # Fallback if it's just a string or other type
                 else:
                     response_text = str(content)
                     break
        
        return ChatResponse(response=response_text)
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)

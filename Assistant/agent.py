from google.adk.agents.sequential_agent import SequentialAgent
from google.adk.agents.parallel_agent import ParallelAgent
from google.adk.agents import LlmAgent

from dotenv import load_dotenv

from .tools import get_weather, log_interaction

from .logging_utils import get_logger, log_interaction

load_dotenv()

# Initialize logger for this session/run
logger = get_logger()
logger.info("Agent System Initialized")  


from .subagents import (
    create_song_suggestion_agent,
    create_mood_wiser_agent,
    create_previous_listening_analyzer,
    create_critic_agent
)

# --- specialized Pipelines ---

# 1. Weather Pipeline
# Routes directly to song_suggestion_agent which has the weather tool.
weather_pipeline = SequentialAgent(
    name="weather_based_pipeline",
    sub_agents=[create_song_suggestion_agent()],
    description="Handles requests specifically about the weather (e.g., 'songs for rain', 'sunny day playlist')."
)

# 2. Mood Pipeline
# Runs Mood Analyzer -> Song Suggestion
mood_pipeline = SequentialAgent(
    name="mood_based_pipeline",
    sub_agents=[create_mood_wiser_agent(), create_song_suggestion_agent()],
    description="Handles requests specifically about the user's mood or emotional state."
)

# 3. History Pipeline
# Runs History Analyzer -> Song Suggestion
history_pipeline = SequentialAgent(
    name="history_based_pipeline",
    sub_agents=[create_previous_listening_analyzer(), create_song_suggestion_agent()],
    description="Handles requests specifically about the user's listening history or past preferences."
)

# --- Advanced Pattern: Parallel Context Gathering ---
# Run Mood Analysis and History Analysis at the same time.
# This is faster and provides a richer context for the suggestion agent.
context_gathering_agent = ParallelAgent(
    name="context_gathering_agent",
    sub_agents=[create_mood_wiser_agent(), create_previous_listening_analyzer()],
    description="Gathers context from multiple sources (mood and history) simultaneously."
)

# --- Comprehensive Pipeline (Fallback/Complex) ---
# 1. Gather Context (Parallel)
# 2. Generate Suggestions (Sequential)
# 3. Critique/Verify (Sequential)
advanced_pipeline = SequentialAgent(
    name="advanced_pipeline",
    sub_agents=[context_gathering_agent, create_song_suggestion_agent(), create_critic_agent()],
    description=("Advanced pipeline that: "
                 "1. Gathers mood and history context in parallel. "
                 "2. Generates song suggestions based on that context. "
                 "3. Critiques the suggestions to ensure quality and relevance.")
)

# Main orchestrator agent
root_agent = LlmAgent(
    name="song_suggestion_orchestrator",
    model="gemini-2.5-flash",
    # Removed get_weather from here to force delegation to weather_pipeline
    tools=[log_interaction],
    sub_agents=[weather_pipeline, mood_pipeline, history_pipeline, advanced_pipeline],
    instruction="""
    You are a friendly song suggestion assistant. Your role is to handle greetings and intelligently route song suggestion requests to the most appropriate pipeline.
    
    **CRITICAL LOGGING RULE**:
    - **IMMEDIATELY** upon receiving a message, call `log_interaction(role='user', content=user_message)` to save the user's query to the log file.
    - If you generate a direct response (like a greeting), call `log_interaction(role='agent', content=your_response)` BEFORE you output the final answer.
    
    IMPORTANT ROUTING RULES:
    
    1. **Weather Requests**: 
       - If the user asks for songs based on weather (e.g., "songs for rain", "sunny day songs", "it's cold outside"), route to `weather_based_pipeline`.
       - **IMAGE INPUT**: If the user provides an IMAGE (photo, upload), assume it is a weather context (e.g., photo of the sky/outdoors) and route to `weather_based_pipeline`.
       
    2. **Mood Requests**: 
       - If the user mentions their mood (e.g., "I'm sad", "happy songs", "feeling energetic"), route to `mood_based_pipeline`.
       
    3. **History Requests**: 
       - If the user asks about their history or wants songs based on past listening (e.g., "what did I listen to?", "based on my history"), route to `history_based_pipeline`.
       
    4. **Complex/Mixed Requests**: 
       - If the user mentions MULTIPLE factors (e.g., "sad songs for rainy day", "history based songs for my happy mood") or if the request doesn't fit the above categories, route to `advanced_pipeline`.
    
    5. **Greetings**:
       - For greetings (hi, hello, hey, how are you, etc.), give a SHORT, friendly response (1-2 sentences max).
       - Example: "Hey! How are you doing? I can suggest songs based on your mood, history, or the weather. What would you like?"
       - DO NOT trigger sub-agents for greetings.
    
    6. **General Conversation**:
       - Keep responses brief and friendly.
       - Gently redirect to song suggestions.
    """,
    description="Main orchestrator that routes song requests to specific pipelines based on user intent."
)

#something new
# Melody AI - AI-Powered Music Recommendation Agent 🎵

Melody AI is an intelligent, multi-agent music recommendation system that provides personalized song suggestions based on user mood, weather conditions, and listening history. Built with Google's Agent Development Kit (ADK) and featuring a modern React frontend, this project demonstrates advanced agent orchestration patterns including parallel execution, sequential pipelines, and quality control mechanisms.

## 🎯 Features

### Core Functionality
- **Intelligent Music Recommendations**: Get personalized song suggestions based on multiple contextual factors
- **Weather-Based Suggestions**: Songs tailored to current weather conditions (rainy, sunny, cold, etc.)
- **Mood-Based Recommendations**: Music suggestions that match or enhance your emotional state
- **History-Aware Suggestions**: Recommendations based on your past listening preferences
- **Image Analysis**: Upload images (e.g., weather photos) for context-aware recommendations
- **Regional Preferences**: Automatically adapts to regional music preferences (e.g., Hindi songs for India)
- **Playlist Creation**: Generate and save playlists with custom names

### Agent Features

#### 1. **Multi-Agent Architecture**
The system uses a sophisticated orchestration pattern with specialized sub-agents:

- **Root Orchestrator Agent**: Intelligently routes requests to the most appropriate pipeline
- **Weather Pipeline**: Direct path for weather-based requests
- **Mood Pipeline**: Sequential analysis of mood → song suggestions
- **History Pipeline**: Sequential analysis of history → song suggestions
- **Advanced Pipeline**: Parallel context gathering → suggestions → quality critique

#### 2. **Subagents**

- **Song Suggestion Agent** (`song_suggestion_agent`)
  - Analyzes user preferences, mood, weather, and history
  - Provides 10 curated song recommendations
  - Includes "Personal Recommendations" section with top 2 picks
  - Supports image analysis for weather context
  - Regional/cultural context awareness

- **Mood Wiser Agent** (`mood_wiser_agent`)
  - Analyzes emotional state from user messages
  - Creates mood profiles for downstream agents
  - Suggests appropriate musical vibes

- **Previous Listening Analyzer** (`previous_listening_analyzer`)
  - Retrieves and analyzes user listening history
  - Provides taste profiles and genre preferences
  - Works in background for context enrichment

- **Critic Agent** (`critic_agent`)
  - Quality control and verification
  - Ensures suggestions match user requests
  - Validates genre, mood, and relevance

#### 3. **Tools**

- **`get_weather(city: str)`**: Fetches real-time weather data using OpenMeteo API
  - Geocoding for city location
  - Current weather conditions
  - Temperature and wind speed
  - Weather interpretation codes

- **`get_user_history(user_id: str)`**: Retrieves user's listening history
  - Returns past songs, artists, and genres
  - Mock data structure for demonstration

- **`create_playlist(playlist_name: str, songs: list[str])`**: Creates playlists
  - Generates playlist with custom name
  - Returns confirmation with playlist link

- **`log_interaction(role: str, content: str)`**: Logs all interactions
  - Session-based logging
  - Timestamped entries
  - Tool call tracking

## 🏗️ Architecture

### Agent Architecture

```
Root Agent (Orchestrator)
│
├── Weather Pipeline (Sequential)
│   └── Song Suggestion Agent
│
├── Mood Pipeline (Sequential)
│   ├── Mood Wiser Agent
│   └── Song Suggestion Agent
│
├── History Pipeline (Sequential)
│   ├── Previous Listening Analyzer
│   └── Song Suggestion Agent
│
└── Advanced Pipeline (Sequential)
    ├── Context Gathering Agent (Parallel)
    │   ├── Mood Wiser Agent
    │   └── Previous Listening Analyzer
    ├── Song Suggestion Agent
    └── Critic Agent
```

### Backend Architecture

The backend is built with **FastAPI** and uses Google ADK for agent management:

```
┌─────────────────┐
│  React Frontend │
│  (Port 5173)    │
└────────┬────────┘
         │ HTTP POST /chat
         ▼
┌─────────────────┐
│  FastAPI Server │
│  (Port 8000)    │
│  - CORS enabled │
│  - Session mgmt │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  ADK Runner     │
│  - Session Svc  │
│  - Artifact Svc │
│  - Memory Svc   │
│  - Credential   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Root Agent     │
│  (Orchestrator) │
└─────────────────┘
```

### Frontend Architecture

The frontend is a **React** application with Vite, styled with **Tailwind CSS**:

```
App.jsx
│
├── Sidebar (Navigation)
├── Main Content Area
│   ├── HomeView (Playlist browsing)
│   ├── SearchView (Search functionality)
│   └── AgentView (Chat interface)
│       ├── ChatWindow (Message display)
│       └── InputArea (User input)
└── PlayerBar (Music player controls)
```

### How Backend and Frontend Connect

1. **Frontend → Backend**: React app sends POST requests to `http://localhost:8000/chat`
   - Request body: `{ message: string, user_id?: string, session_id?: string }`
   - CORS middleware allows requests from `localhost:5173` and `localhost:5174`

2. **Backend Processing**:
   - FastAPI receives request
   - Creates/retrieves session via `InMemorySessionService`
   - Wraps user message in `Content` object
   - Passes to ADK `Runner.run_async()`
   - Collects events from agent execution

3. **Agent Execution**:
   - Root agent analyzes intent
   - Routes to appropriate pipeline
   - Sub-agents execute (sequentially or in parallel)
   - Tools are called as needed
   - Final response is generated

4. **Backend → Frontend**: Response sent back as JSON
   - Response body: `{ response: string }`
   - Frontend displays in chat interface

## 🚀 Getting Started

### Prerequisites

- Python 3.8+ (Python 3.13 recommended)
- Node.js 18+ and npm
- Google ADK access (for `google-adk` and `google-genai` packages)
- API key for Google Gemini (if required)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/Sarthak1011-code/Melody_Music_AgenticAgent.git
cd Melody_Music_AgenticAgent
```

#### 2. Set Up Python Virtual Environment

```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate
```

#### 3. Install Python Dependencies

```bash
# Install required packages
pip install -r requirements.txt
```

**Key Dependencies:**
- `fastapi`: Web framework for the backend API
- `uvicorn`: ASGI server for running FastAPI
- `pydantic`: Data validation
- `google-genai`: Google Generative AI SDK
- `google-adk`: Google Agent Development Kit
- `python-dotenv`: Environment variable management

#### 4. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
# .env file (DO NOT commit this file)
# Add your API keys and configuration here
GOOGLE_API_KEY=your_api_key_here
# Add other environment variables as needed
```

**⚠️ Important**: Never commit `.env` files or API keys to version control!

#### 5. Install Frontend Dependencies

```bash
cd react-ui
npm install
```

**Key Dependencies:**
- `react`: UI library
- `react-dom`: React DOM bindings
- `vite`: Build tool and dev server
- `tailwindcss`: Utility-first CSS framework
- `lucide-react`: Icon library
- `react-markdown`: Markdown rendering

### Running the Application

#### 1. Start the Backend Server

```bash
# From project root (with venv activated)
cd backend
python main.py
# Or use uvicorn directly:
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at `http://localhost:8000`

#### 2. Start the Frontend Development Server

```bash
# In a new terminal (from react-ui directory)
cd react-ui
npm run dev
```

The frontend will be available at `http://localhost:5173`

#### 3. Access the Application

Open your browser and navigate to `http://localhost:5173`

### Alternative: Streamlit Frontend

The project also includes a Streamlit-based frontend:

```bash
# With venv activated
cd frontend
streamlit run app.py
```

## 📁 Project Structure

```
NyayaArtificial/
├── Assistant/                 # Agent system
│   ├── __init__.py
│   ├── agent.py              # Root orchestrator and pipelines
│   ├── subagents.py          # Sub-agent definitions
│   ├── logging_utils.py      # Logging functionality
│   ├── README.md             # Agent-specific documentation
│   └── tools/               # Agent tools
│       ├── __init__.py
│       ├── weather_tool.py   # Weather API integration
│       ├── history_tool.py   # User history retrieval
│       └── playlist_tool.py  # Playlist creation
│
├── backend/                  # FastAPI backend
│   └── main.py              # API server and agent runner
│
├── frontend/                 # Streamlit frontend (alternative)
│   └── app.py
│
├── react-ui/                 # React frontend
│   ├── src/
│   │   ├── App.jsx          # Main app component
│   │   ├── components/     # React components
│   │   │   ├── AgentView.jsx
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── HomeView.jsx
│   │   │   ├── InputArea.jsx
│   │   │   ├── MessageBubble.jsx
│   │   │   ├── PlayerBar.jsx
│   │   │   └── Sidebar.jsx
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── logs/                     # Session logs (gitignored)
│
├── .gitignore               # Git ignore rules
├── requirements.txt         # Python dependencies
└── README.md               # This file
```

## 🔧 Configuration

### Backend Configuration

- **Port**: Default `8000` (configurable in `backend/main.py`)
- **CORS Origins**: `localhost:5173`, `localhost:5174` (configurable)
- **Model**: `gemini-2.5-flash` (configurable in `Assistant/agent.py`)

### Frontend Configuration

- **Backend URL**: `http://localhost:8000` (configurable in `react-ui/src/App.jsx`)
- **Port**: Default `5173` (Vite default)

## 📝 Usage Examples

### Example Queries

1. **Weather-based**:
   - "Songs for a rainy day"
   - "What should I listen to? It's sunny outside"
   - Upload an image of the weather

2. **Mood-based**:
   - "I'm feeling sad, suggest some songs"
   - "Happy songs for my mood"
   - "I need energetic music"

3. **History-based**:
   - "Songs like my history"
   - "What did I listen to before?"
   - "Recommend based on my past preferences"

4. **Complex requests**:
   - "Sad songs for a rainy day based on my history"
   - "I'm happy and it's sunny, suggest songs"

## 🛠️ Development

### Adding New Tools

1. Create tool function in `Assistant/tools/`
2. Add to `__init__.py` exports
3. Import and add to agent's `tools` list

### Adding New Subagents

1. Create agent factory function in `Assistant/subagents.py`
2. Add to appropriate pipeline in `Assistant/agent.py`
3. Update root agent's `sub_agents` list if needed

### Logging

All interactions are logged to `logs/session_YYYYMMDD_HHMMSS.log`:
- User messages
- Agent responses
- Tool calls
- Subagent activations

## 🔒 Security Notes

- **Never commit** `.env` files or API keys
- Use environment variables for sensitive data
- The `.gitignore` file excludes:
  - `venv/`
  - `.env*` files
  - `logs/`
  - `__pycache__/`
  - `node_modules/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the Apache License 2.0 (see `adk_server_source.txt` for details).

## 🙏 Acknowledgments

- Google ADK for the agent development framework
- OpenMeteo for weather data API
- React and Vite communities
- FastAPI for the excellent web framework

## 📧 Support

For issues, questions, or contributions, please open an issue on the GitHub repository.

---

**Note**: This project uses Google ADK and Gemini models. Ensure you have appropriate API access and credentials configured before running the application.


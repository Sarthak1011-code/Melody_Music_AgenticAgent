# Song Suggestion Assistant

## Overview
This is an intelligent agentic system designed to provide personalized song recommendations. It goes beyond simple keyword matching by analyzing the user's **mood**, **local weather**, and **listening history** to curate the perfect playlist. It employs advanced multi-agent patterns including parallel execution and critical verification to ensure high-quality outputs.

## Architecture
The system is built using the Google ADK (Agent Development Kit) and follows a sophisticated "Smart Router" architecture:

1.  **Root Orchestrator (`root_agent`)**: The intelligent entry point. It analyzes the user's intent and routes the request to the most efficient pipeline, avoiding unnecessary agent invocations.
2.  **Specialized Pipelines**:
    *   **Weather Pipeline**: (`weather_based_pipeline`) - Activated for weather-related requests. Invokes only the song suggestion agent with weather tools.
    *   **Mood Pipeline**: (`mood_based_pipeline`) - Activated for mood-related requests. Runs Mood Analyzer -> Song Suggestion.
    *   **History Pipeline**: (`history_based_pipeline`) - Activated for history-related requests. Runs History Analyzer -> Song Suggestion.
    *   **Comprehensive Pipeline**: (`advanced_pipeline`) - Activated for complex or mixed requests. Runs full context gathering (Mood + History in parallel) -> Song Suggestion -> Critic.

## Agents & Components

### 1. Root Agent (`song_suggestion_orchestrator`)
*   **Role**: Intelligent Router.
*   **Capabilities**: Handles greetings and dynamically routes requests to the specific pipeline needed (Weather, Mood, History, or Advanced).
*   **Model**: `gemini-2.5-flash`

### 2. Specialized Pipelines
*   **Weather**: Direct path to song suggestion for efficiency.
*   **Mood**: Ensures mood analysis happens before suggestion.
*   **History**: Ensures history analysis happens before suggestion.

### 3. Context Gathering Agent (`context_gathering_agent`)
*   **Type**: `ParallelAgent` (Used in Advanced Pipeline)
*   **Role**: Runs mood and history analysis simultaneously for complex requests.

### 4. Song Suggestion Agent (`song_suggestion_agent`)
*   **Role**: The creative expert.
*   **Input**: User request + Context (Mood/History if available) + Weather.
*   **Output**: A curated list of songs with explanations.

### 5. Critic Agent (`critic_agent`)
*   **Role**: Quality control.
*   **Function**: Reviews the generated songs against the original request. (Used in Advanced Pipeline).

## Tools
*   **`get_weather`**: Fetches current weather conditions to influence song choices (e.g., Rainy -> Jazz/Lo-fi).
*   **`get_user_history`**: Retrieves the user's past listening data to personalize recommendations.

## Recent Changes & Improvements
*   **Smart Routing**: Implemented intent-based routing to invoke ONLY the necessary agents (e.g., asking for weather songs no longer triggers mood analysis).
*   **Specialized Pipelines**: Created dedicated pipelines for Weather, Mood, and History to improve efficiency and latency.
*   **Parallel Execution**: Retained `ParallelAgent` for complex context gathering.
*   **Critic Loop**: Retained `critic_agent` for complex requests to ensure high quality.

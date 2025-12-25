import logging
import os
from datetime import datetime

# Directory to store logs
LOG_DIR = "logs"

def setup_logger():
    """Sets up a logger for the current session."""
    if not os.path.exists(LOG_DIR):
        os.makedirs(LOG_DIR)

    # Generate a unique filename based on timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    log_file = os.path.join(LOG_DIR, f"session_{timestamp}.log")

    # Create a custom logger
    logger = logging.getLogger(f"session_{timestamp}")
    logger.setLevel(logging.INFO)

    # File handler
    file_handler = logging.FileHandler(log_file)
    formatter = logging.Formatter('%(asctime)s - %(message)s', datefmt='%Y-%m-%d %H:%M:%S')
    file_handler.setFormatter(formatter)

    # Avoid adding multiple handlers if setup is called multiple times
    if not logger.handlers:
        logger.addHandler(file_handler)

    return logger

# Global logger instance (lazy initialization could be better, but this is simple)
# In a real multi-session server, we'd need a way to track session IDs contextually.
# For this local agent, a single global logger per run is a reasonable start.
current_logger = None

def get_logger():
    global current_logger
    if current_logger is None:
        current_logger = setup_logger()
    return current_logger

def log_interaction(role: str, content: str) -> str:
    """Logs a message from the user or agent to the session log file.

    Args:
        role (str): The role of the speaker (e.g., 'user', 'agent').
        content (str): The content of the message to log.
    
    Returns:
        str: A confirmation message.
    """
    logger = get_logger()
    logger.info(f"[{role.upper()}]: {content}\n" + "-"*50)
    return "Logged successfully."

def log_tool_call(tool_name, args, result):
    """Logs a tool execution."""
    logger = get_logger()
    logger.info(f"[TOOL CALL] {tool_name}\nArguments: {args}\nResult: {result}\n" + "-"*50)

def log_subagent_activation(subagent_name):
    """Logs when a subagent is activated."""
    logger = get_logger()
    logger.info(f"[SUBAGENT STARTED] {subagent_name}\n" + "-"*50)

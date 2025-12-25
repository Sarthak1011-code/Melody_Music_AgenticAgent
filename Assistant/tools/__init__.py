from .weather_tool import get_weather
from .history_tool import get_user_history
from .playlist_tool import create_playlist
from ..logging_utils import log_tool_call
import functools

def log_tool(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        # Log the call
        try:
            result = func(*args, **kwargs)
            log_tool_call(func.__name__, args if args else kwargs, result)
            return result
        except Exception as e:
            log_tool_call(func.__name__, args if args else kwargs, f"ERROR: {str(e)}")
            raise e
    return wrapper

# Wrap the tools
get_weather = log_tool(get_weather)
get_user_history = log_tool(get_user_history)
create_playlist = log_tool(create_playlist)

# Expose log_interaction directly (no wrapper to avoid recursion)
from ..logging_utils import log_interaction

__all__ = ['get_weather', 'get_user_history', 'create_playlist', 'log_interaction']

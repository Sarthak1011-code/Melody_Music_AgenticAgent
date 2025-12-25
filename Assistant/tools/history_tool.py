from typing import List, Dict

def get_user_history(user_id: str = "default_user") -> List[Dict[str, str]]:
    """
    Retrieves the listening history for a user.
    
    Args:
        user_id: The ID of the user. Defaults to "default_user".
        
    Returns:
        A list of dictionaries, where each dictionary represents a song 
        and contains keys like 'title', 'artist', and 'genre'.
    """
    # Mock data for demonstration purposes
    return [
        {"title": "Bohemian Rhapsody", "artist": "Queen", "genre": "Rock"},
        {"title": "Shape of You", "artist": "Ed Sheeran", "genre": "Pop"},
        {"title": "Blinding Lights", "artist": "The Weeknd", "genre": "Synth-pop"},
        {"title": "Hotel California", "artist": "Eagles", "genre": "Rock"},
        {"title": "Levitating", "artist": "Dua Lipa", "genre": "Pop"}
    ]

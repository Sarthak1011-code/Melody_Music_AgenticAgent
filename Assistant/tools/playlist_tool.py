def create_playlist(playlist_name: str, songs: list[str]) -> str:
    """
    Creates a playlist with the given name and list of songs.
    
    Args:
        playlist_name: The title of the playlist.
        songs: A list of song titles (and artists) to include.
        
    Returns:
        A confirmation message with a link to the created playlist.
    """
    # In a real app, this would call Spotify/Apple Music APIs.
    # For this demo, we simulate the creation.
    
    print(f"Creating playlist '{playlist_name}' with {len(songs)} songs...")
    for song in songs:
        print(f" - Adding: {song}")
        
    # Simulate a delay or API call
    import time
    time.sleep(1)
    
    mock_id = abs(hash(playlist_name)) % 100000
    playlist_link = f"https://music.example.com/playlist/{mock_id}"
    
    return f"Successfully created playlist '{playlist_name}' containing {len(songs)} songs. Listen here: {playlist_link}"

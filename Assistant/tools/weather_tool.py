import urllib.request
import json
import urllib.parse

def get_weather(city: str) -> dict:
    """Retrieves the current weather report for a specified city using OpenMeteo API.

    Args:
        city (str): The name of the city for which to retrieve the weather report.

    Returns:
        dict: status and result or error msg.
    """
    try:
        # 1. Geocoding: Get Lat/Lon for the city
        encoded_city = urllib.parse.quote(city)
        geo_url = f"https://geocoding-api.open-meteo.com/v1/search?name={encoded_city}&count=1&language=en&format=json"
        
        with urllib.request.urlopen(geo_url) as response:
            geo_data = json.loads(response.read().decode())
            
        if not geo_data.get("results"):
             return {
                "status": "error",
                "error_message": f"Could not find location '{city}'. Please check the spelling.",
            }
            
        location = geo_data["results"][0]
        lat = location["latitude"]
        lon = location["longitude"]
        city_name = location["name"]
        country = location.get("country", "")

        # 2. Weather: Get current weather
        weather_url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true"
        
        with urllib.request.urlopen(weather_url) as response:
            weather_data = json.loads(response.read().decode())
            
        current = weather_data.get("current_weather")
        if not current:
             return {
                "status": "error",
                "error_message": f"Could not retrieve weather data for '{city}'.",
            }
            
        temp = current["temperature"]
        wind_speed = current["windspeed"]
        # WMO Weather interpretation codes (simplified)
        wmo_code = current["weathercode"]
        condition = "Unknown"
        if wmo_code == 0: condition = "Clear sky"
        elif wmo_code in [1, 2, 3]: condition = "Partly cloudy"
        elif wmo_code in [45, 48]: condition = "Foggy"
        elif wmo_code in [51, 53, 55, 56, 57]: condition = "Drizzle"
        elif wmo_code in [61, 63, 65, 66, 67]: condition = "Rainy"
        elif wmo_code in [71, 73, 75, 77]: condition = "Snowy"
        elif wmo_code in [80, 81, 82]: condition = "Rain showers"
        elif wmo_code in [95, 96, 99]: condition = "Thunderstorm"
        
        report = (
            f"The weather in {city_name}, {country} is {condition} with a temperature of {temp}°C "
            f"and wind speeds of {wind_speed} km/h."
        )

        return {
            "status": "success",
            "report": report,
            "data": current # Return raw data too if needed by agent
        }

    except Exception as e:
        return {
            "status": "error",
            "error_message": f"Failed to fetch weather: {str(e)}",
        }
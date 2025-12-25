import streamlit as st
import requests

# Page configuration
st.set_page_config(page_title="Nyaya Agent", page_icon="🎵")

st.title("Nyaya Music Agent 🎵")
st.write("Ask for song suggestions based on weather, mood, or history!")

# Initialize chat history
if "messages" not in st.session_state:
    st.session_state.messages = []

# Display chat messages from history on app rerun
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# Function to query backend
def get_agent_response(user_input):
    try:
        response = requests.post(
            "http://localhost:8000/chat", 
            json={"message": user_input}
        )
        if response.status_code == 200:
            return response.json().get("response", "Error: No response from agent.")
        else:
            return f"Error: {response.status_code} - {response.text}"
    except Exception as e:
        return f"Connection Error: {str(e)}"

# Accept user input
if prompt := st.chat_input("What would you like to listen to?"):
    # Add user message to chat history
    st.session_state.messages.append({"role": "user", "content": prompt})
    
    # Display user message in chat message container
    with st.chat_message("user"):
        st.markdown(prompt)

    # Display assistant response in chat message container
    with st.chat_message("assistant"):
        with st.spinner("Thinking..."):
            response_text = get_agent_response(prompt)
            st.markdown(response_text)
            
    # Add assistant response to chat history
    st.session_state.messages.append({"role": "assistant", "content": response_text})

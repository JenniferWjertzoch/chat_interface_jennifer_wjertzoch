import React, { useState, useEffect } from 'react';

import MessageList from './components/MessageList';

import StyledInputField from "./components/styled/StyledInputField"
import StyledButton from "./components/styled/StyledButton"

import settings from './settings';

import './App.css';


function App() {

  const [allMessages, setAllMessages] = useState([]);
  const [messageToSend, setMessageToSend] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


   // get messages function
   const getAllMessages = async () => {
    // fetch from the api
    try{
      const res = await fetch(settings.url);
      const data = await res.json();
  
      // add the messages to our list
      setAllMessages(data)
  
    }catch (e){
      setErrorMessage("An error has occurred while fetching the messages")
    }

  };
  
  useEffect(() => {
    getAllMessages()
  }, []);

  async function handleSendMessage() {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': 'u4wbEFmRn3Et'
      },
      body: JSON.stringify({
        message: messageToSend, // message to send form state
        author: 'Tom',
      })
    };
    try {
      // Sending the message
      const response = await fetch(settings.sendUrl, requestOptions)
      const messageSent = await response.json()
      setMessageToSend("") // reset chat to empty
      setAllMessages([...allMessages, messageSent])
    } catch (e){
      console.log(e)
      setErrorMessage("An error has occurred when sending the message")
    }
  }

  function handleTypeMessage(event) {
    setMessageToSend(event.target.value)
  }

  return (
    <div className="App">
      <div className="container">
        <h1 className="chat-title">Chat Interface</h1>
      </div>
      {!errorMessage ? <div>
        <div className="message-container">
          <MessageList allMessages={allMessages} />
        </div>
        <div className="container">
          <StyledInputField type="text" id="name" data-cy={`input`} name="name" placeholder=" Message" value={messageToSend} onChange={handleTypeMessage}></StyledInputField>
          <StyledButton onClick={handleSendMessage} data-cy={`send-btn`}>Send</StyledButton>
        </div>
      </div> : <p>Error: {errorMessage}</p>}
    </div>
  );
}

export default App;

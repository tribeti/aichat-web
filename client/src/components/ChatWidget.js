import React, { useState, useEffect, useRef } from 'react'
import { FaRobot, FaPaperPlane, FaTimes, FaCommentDots } from 'react-icons/fa'

const ChatWidget = ({ products }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [threadId, setThreadId] = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMessages = [
        {
          text: "Hello! I'm your shopping assistant. How can I help you today?", // Greeting text
          isAgent: true // Flag to indicate this is from the AI agent
        }
      ]
      setMessages(initialMessages)
    }
  }, [isOpen, messages.length]) // Dependencies: re-run when isOpen or message count changes

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages]) // Dependency: re-run whenever messages array changes

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  console.log(messages)
  
  const handleSendMessage = async (e) => {
    e.preventDefault()
    console.log(inputValue)

    const message = {
      text: inputValue,  // User's typed message
      isAgent: false,    // Flag indicating this is from user, not AI
    }

    setMessages(prevMessages => [...prevMessages, message])
    setInputValue("")

    if (inputValue.toLowerCase().includes("recommend") && products && products.length > 0) {
      const recommendedProduct = products[0];
      const agentResponse = {
        text: `I recommend ${recommendedProduct.name} for you! Price: ${recommendedProduct.price} VND.`,
        isAgent: true,
      };
      setMessages(prevMessages => [...prevMessages, agentResponse]);
      return;
    }

    const endpoint = threadId ? `http://localhost:5070/chat/${threadId}` : 'http://localhost:5070/chat'

    try {
      const response = await fetch(endpoint, {
        method: 'POST', // HTTP method
        headers: {
          'Content-Type': 'application/json', // Tell server we're sending JSON
        },
        body: JSON.stringify({
          message: inputValue // Send user's message in request body
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Success:', data)
      
      const agentResponse = {
        text: data.response,    // AI's response text
        isAgent: true,          // Flag indicating this is from AI agent
        threadId: data.threadId // Thread ID for conversation continuity
      }
      
      setMessages(prevMessages => [...prevMessages, agentResponse])
      setThreadId(data.threadId)
      console.log(messages)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className={`chat-widget-container ${isOpen ? 'open' : ''}`}>
      {isOpen ? (
        <>
          <div className="chat-header">
            <div className="chat-title">
              <FaRobot />
              <h3>Shop Assistant</h3>
            </div>
            <button className="close-button" onClick={toggleChat}>
              <FaTimes />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index}>
                <div className={`message ${message.isAgent ? 'message-bot' : 'message-user'}`}>
                  {message.text}
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-container" onSubmit={handleSendMessage}>
            <input
              type="text"                           // Input type
              className="message-input"             // CSS class for styling
              placeholder="Type your message..."    // Placeholder text
              value={inputValue}                    // Controlled input value
              onChange={handleInputChange}          // Handle input changes
            />
            <button
              type="submit"                         // Submit form when clicked
              className="send-button"               // CSS class for styling
              disabled={inputValue.trim() === ''}   // Disable if input is empty or whitespace
            >
              <FaPaperPlane size={16} />
            </button>
          </form>
        </>
      ) : (
        <button className="chat-button" onClick={toggleChat}>
          <FaCommentDots />
        </button>
      )}
    </div>
  )
}

export default ChatWidget
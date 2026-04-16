// Import necessary React hooks and MUI components
import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, IconButton, Fab } from '@mui/material';
import { styled } from '@mui/system';
// Import icons from MUI
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MinimizeOutlinedIcon from '@mui/icons-material/MinimizeOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';



// Define the interface for the message object
interface Message {
  message: string;
  sentTime: string;
  sender: string;
}

// API key for OpenAI API access
const API_KEY = import.meta.env.VITE_REACT_APP_OPENAI_API_KEY as string;

// Predefined system message for the assistant's initial state
const systemMessage = {
  role: "system",
  content: "You are a crisis and disaster management AI assistant. Your purpose is to guide users and provide advice in crisis situations. If the user asks a question not related to crisis or disaster management, politely explain that you are specialized in those areas and cannot assist with that particular query."
};

// Styled MUI Paper component for the chat interface
const StyledPaper = styled(Paper)({
  padding: 16,
  maxWidth: 400,
  backgroundColor: 'white',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)'
  },
  position: 'relative'
});

// Main component function renamed to CrisisConnectBot
const CrisisConnectBot = () => {
  // State for managing chat messages
  const [messages, setMessages] = useState<Message[]>([
    {
      message: "Hello, I'm CrisisConnectGPT! Ask me anything related to crisis/disaster management.",
      sentTime: "just now",
      sender: "CrisisConnectGPT"
    }
  ]);
  // State to control typing indicator visibility
  const [isTyping, setIsTyping] = useState(false);
  // State for the user's input message
  const [inputMessage, setInputMessage] = useState('');
  // State to control whether the chat interface is minimized
  const [isMinimized, setIsMinimized] = useState(false);
  // State to control whether the chat interface is visible
  const [isClosed, setIsClosed] = useState(true);

  // Function to handle sending a message
  const handleSend = async (message: string) => {
    const newMessage: Message = {
      message,
      sentTime: "now",
      sender: "user"
    };

    // Update state with the new message and trigger the API call
    setMessages([...messages, newMessage]);
    setIsTyping(true);
    await processMessageToChatGPT([...messages, newMessage]);
    setInputMessage('');
  };

  // Function to process messages using OpenAI's API
  async function processMessageToChatGPT(chatMessages: Message[]) {
    // Map messages for API request
    const apiMessages = chatMessages.map(messageObject => ({
      role: messageObject.sender === "CrisisConnectGPT" ? "assistant" : "user",
      content: messageObject.message
    }));

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages]
    };

    try {
      // Make the API call
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      });

      const data = await response.json();

      if (!data.choices || data.choices.length === 0) {
        throw new Error('No choices returned from the API');
      }

      // Process the response and update messages
      const newMessage = {
        message: data.choices[0].message.content,
        sender: "CrisisConnectGPT",
        sentTime: "just now"
      };

      setMessages(prevMessages => [...prevMessages, newMessage]);
    } catch (error) {
      console.error('Failed to process message:', error);
    } finally {
      // Reset typing state
      setIsTyping(false);
    }
  }

  // Render the chat interface
  return (
    <Box sx={{ position: 'fixed', bottom: 0, right: 0, m: 2 }}>
      {isClosed ? (

        // <Fab color="primary" onClick={() => setIsClosed(false)}>
        //   <ChatOutlinedIcon />
        // </Fab>

              <Fab 
        sx={{
          bgcolor: '#307277', // Your chosen color
          '&:hover': {
            bgcolor: '#307277' // Same color for hover state or you can choose a slightly darker shade
          }
        }} 
        onClick={() => setIsClosed(false)}
      >
        <ChatOutlinedIcon sx={{ color: 'white' }} /> {/* Assuming you want the icon to be white */}
      </Fab>
      

        
      ) : (
        <StyledPaper>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">CrisisConnect Chat</Typography>
            <Box>
             
                    <IconButton onClick={() => setIsMinimized(!isMinimized)}>
        <MinimizeOutlinedIcon sx={{ color: '#307277' }} />
      </IconButton>
      <IconButton onClick={() => setIsClosed(true)}>
        <CloseOutlinedIcon sx={{ color: '#307277' }} />
      </IconButton>

            </Box>
          </Box>
          {!isMinimized && (
            <>
              <Box sx={{ maxHeight: 300, overflowY: 'auto', my: 1 }}>
                {messages.map((message, index) => (
                  <Typography key={index} color={message.sender === 'CrisisConnectGPT' ? 'blue' : 'gray'}>
                    {message.sender}: {message.message}
                  </Typography>
                ))}
                {isTyping && <Typography style={{ animation: 'blink 1s linear infinite' }}>CrisisConnectGPT is typing...</Typography>}
              </Box>
              <Box sx={{ display: 'flex', mt: 2 }}>
                <TextField
                  fullWidth
                  variant="filled"
                  placeholder="Type your message here..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend(inputMessage)}
                />
                <Button
  variant="contained"
  onClick={() => handleSend(inputMessage)}
  sx={{
    ml: 1,
    bgcolor: '#307277', // Button background color
    color: 'white', // Text color
    '&:hover': {
      bgcolor: '#205255' // Darker shade for hover state, adjust as needed
    }
  }}
>
  Send
</Button>

              </Box>
            </>
          )}
        </StyledPaper>
      )}
    </Box>
  );
}

export default CrisisConnectBot;

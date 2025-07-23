import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Chip,
  Fade,
  Slide,
  styled,
  useTheme,
} from '@mui/material';
import {
  Send as SendIcon,
  Chat as ChatIcon,
  Close as CloseIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import './Chatbot.css';

const ChatbotContainer = styled(Box)(({ theme, isOpen }) => ({
  position: 'fixed',
  bottom: 20,
  right: 20,
  zIndex: 1000,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  transform: isOpen ? 'scale(1)' : 'scale(0.8)',
  opacity: isOpen ? 1 : 0,
  pointerEvents: isOpen ? 'auto' : 'none',
}));

const ChatbotWindow = styled(Paper)(({ theme }) => ({
  width: 380,
  height: 500,
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
  backdropFilter: 'blur(20px)',
  borderRadius: 20,
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.05)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    borderRadius: '20px 20px 0 0',
  },
}));

const ChatbotHeader = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
  backdropFilter: 'blur(10px)',
  padding: '16px 20px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const ChatbotBody = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: '16px',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(241, 245, 249, 0.5)',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'linear-gradient(135deg, #cbd5e1, #94a3b8)',
    borderRadius: '4px',
  },
}));

const MessageBubble = styled(Box)(({ theme, isUser }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '8px',
  maxWidth: '85%',
  alignSelf: isUser ? 'flex-end' : 'flex-start',
  animation: 'fadeInUp 0.3s ease-out',
  '@keyframes fadeInUp': {
    from: {
      opacity: 0,
      transform: 'translateY(10px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

const MessageContent = styled(Box)(({ theme, isUser }) => ({
  background: isUser 
    ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)'
    : 'linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(241, 245, 249, 0.8) 100%)',
  backdropFilter: 'blur(12px)',
  border: `1px solid ${isUser ? 'rgba(102, 126, 234, 0.3)' : 'rgba(226, 232, 240, 0.4)'}`,
  borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
  padding: '12px 16px',
  color: isUser ? 'white' : '#374151',
  boxShadow: isUser 
    ? '0 4px 16px rgba(102, 126, 234, 0.2)'
    : '0 2px 8px rgba(0, 0, 0, 0.06)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: isUser 
      ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    borderRadius: 'inherit',
    pointerEvents: 'none',
  },
}));

const ChatbotInput = styled(Box)(({ theme }) => ({
  padding: '16px 20px',
  borderTop: '1px solid rgba(255, 255, 255, 0.3)',
  background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(241, 245, 249, 0.8) 100%)',
  backdropFilter: 'blur(10px)',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    border: '1px solid rgba(226, 232, 240, 0.4)',
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
    '& input': {
      padding: '12px 16px',
      fontSize: '14px',
    },
  },
}));

const ChatbotToggle = styled(IconButton)(({ theme, isOpen }) => ({
  width: 60,
  height: 60,
  background: isOpen 
    ? 'linear-gradient(135deg, #ef4444, #f87171)'
    : 'linear-gradient(135deg, #667eea, #764ba2)',
  color: 'white',
  borderRadius: '50%',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.15)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
    borderRadius: '50%',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover::before': {
    opacity: 1,
  },
}));

const QuickReplies = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginTop: '8px',
}));

const QuickReplyChip = styled(Chip)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(102, 126, 234, 0.2)',
  color: '#667eea',
  fontSize: '12px',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.2)',
  },
}));

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you with your real estate intelligence today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const theme = useTheme();

  // Debug log to check if component is rendered
  console.log('Chatbot component rendered');

  const quickReplies = [
    "Show me recent prospects",
    "Market analysis",
    "Help with tasks",
    "Property search",
    "Performance insights"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "I've analyzed your request and found some interesting insights. Let me gather that information for you.",
        "Based on our AI analysis, I can help you with that. Here's what I found in our database.",
        "Great question! Our intelligence engine has processed similar queries. Let me share the results.",
        "I'm accessing our cross-database analysis to provide you with the most relevant information.",
        "Perfect timing! Our AI has detected some patterns that might be relevant to your query."
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage = {
        id: Date.now() + 1,
        text: randomResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (reply) => {
    handleSendMessage(reply);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <>
    
      {/* Chatbot Toggle Button - Always Visible */}
      <ChatbotToggle
        onClick={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
        sx={{ 
          position: 'fixed', 
          bottom: 20, 
          right: 20, 
          zIndex: 1001,
          width: 60,
          height: 60,
          background: isOpen 
            ? 'linear-gradient(135deg, #ef4444, #f87171)'
            : 'linear-gradient(135deg, #667eea, #764ba2)',
          color: 'white',
          borderRadius: '50%',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </ChatbotToggle>

      {/* Chatbot Window */}
      {isOpen && (
        <ChatbotContainer isOpen={isOpen}>
          <ChatbotWindow>
            <ChatbotHeader>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  sx={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    width: 32,
                    height: 32,
                    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
                  }}
                >
                  <BotIcon sx={{ fontSize: 18 }} />
                </Avatar>
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    AI Assistant
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b', fontSize: '10px' }}>
                    {isTyping ? 'Typing...' : 'Online'}
                  </Typography>
                </Box>
              </Box>
              <IconButton
                onClick={() => setIsOpen(false)}
                sx={{
                  color: '#64748b',
                  '&:hover': {
                    background: 'rgba(102, 126, 234, 0.1)',
                    color: '#667eea',
                  },
                }}
              >
                <CloseIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </ChatbotHeader>

            <ChatbotBody>
              {messages.map((message) => (
                <MessageBubble key={message.id} isUser={message.isUser}>
                  {!message.isUser && (
                    <Avatar
                      sx={{
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        width: 24,
                        height: 24,
                        fontSize: '12px',
                        boxShadow: '0 2px 8px rgba(102, 126, 234, 0.2)',
                      }}
                    >
                      <BotIcon sx={{ fontSize: 12 }} />
                    </Avatar>
                  )}
                  <MessageContent isUser={message.isUser}>
                    <Typography variant="body2" sx={{ fontSize: '13px', lineHeight: 1.4 }}>
                      {message.text}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        marginTop: '4px',
                        opacity: 0.7,
                        fontSize: '10px',
                      }}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                  </MessageContent>
                  {message.isUser && (
                    <Avatar
                      sx={{
                        background: 'linear-gradient(135deg, #10b981, #34d399)',
                        width: 24,
                        height: 24,
                        fontSize: '12px',
                        boxShadow: '0 2px 8px rgba(16, 185, 129, 0.2)',
                      }}
                    >
                      <PersonIcon sx={{ fontSize: 12 }} />
                    </Avatar>
                  )}
                </MessageBubble>
              ))}

              {isTyping && (
                <MessageBubble isUser={false}>
                  <Avatar
                    sx={{
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      width: 24,
                      height: 24,
                      fontSize: '12px',
                      boxShadow: '0 2px 8px rgba(102, 126, 234, 0.2)',
                    }}
                  >
                    <BotIcon sx={{ fontSize: 12 }} />
                  </Avatar>
                  <MessageContent isUser={false}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          background: '#667eea',
                          animation: 'typing 1.4s infinite ease-in-out',
                          '&:nth-of-type(1)': { animationDelay: '0s' },
                          '&:nth-of-type(2)': { animationDelay: '0.2s' },
                          '&:nth-of-type(3)': { animationDelay: '0.4s' },
                          '@keyframes typing': {
                            '0%, 60%, 100%': { transform: 'translateY(0)' },
                            '30%': { transform: 'translateY(-10px)' },
                          },
                        }}
                      />
                      <Box
                        sx={{
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          background: '#667eea',
                          animation: 'typing 1.4s infinite ease-in-out',
                          animationDelay: '0.2s',
                        }}
                      />
                      <Box
                        sx={{
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          background: '#667eea',
                          animation: 'typing 1.4s infinite ease-in-out',
                          animationDelay: '0.4s',
                        }}
                      />
                    </Box>
                  </MessageContent>
                </MessageBubble>
              )}

              {messages.length === 1 && (
                <QuickReplies>
                  {quickReplies.map((reply, index) => (
                    <QuickReplyChip
                      key={index}
                      label={reply}
                      onClick={() => handleQuickReply(reply)}
                      size="small"
                    />
                  ))}
                </QuickReplies>
              )}

              <div ref={messagesEndRef} />
            </ChatbotBody>

            <ChatbotInput>
              <StyledTextField
                fullWidth
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isTyping}
                variant="outlined"
                size="small"
              />
              <IconButton
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                sx={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  width: 40,
                  height: 40,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a67d8, #6b46c1)',
                    transform: 'scale(1.05)',
                  },
                  '&:disabled': {
                    background: '#e2e8f0',
                    color: '#94a3b8',
                  },
                }}
              >
                <SendIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </ChatbotInput>
          </ChatbotWindow>
        </ChatbotContainer>
      )}
    </>
  );
};

export default Chatbot; 
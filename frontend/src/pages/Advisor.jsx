import { useState, useRef, useEffect } from 'react';
import HamburgerMenu from '../components/common/HamburgerMenu';
import './styles/advisor.css';

const API_KEY = 'AIzaSyCvnUqO_IGQXyN1fqYO6O_JYIrHiJhhCm4';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const careerKeywords = [
  'career','job','work','employment','profession','occupation','resume','cv','interview',
  'salary','promotion','skills','experience','hiring','fired','layoff','benefits','workplace',
  'office','remote','hybrid','position','role','application','apply','hired','manager',
  'employee','employer','staff','company','corporation','business','industry','market','field',
  'sector','opportunity','advancement','growth','professional','networking','linkedin','portfolio',
  'references','recommendation','quit','resign','notice','cover letter','jobseeker',
  'job hunt','job search','offer','compensation','negotiate','career change','transition','mentor',
  'education','school','university','college','degree','course','study','learning','training',
  'certification','qualification','major','minor','bachelor','master','phd','doctorate','diploma',
  'graduate','undergraduate','student','bootcamp','program','continuing education',
  'skills','learn','develop','knowledge','expertise','competence','aptitude','talent','strength',
  'weakness','improve','advance','progress','future','goal','plan','path','direction','success',
  'achievement','leadership','management','communication','teamwork','collaboration',
  'problem-solving','decision-making','critical thinking','creative thinking','innovation',
  'technology','technical','interpersonal','soft skills','hard skills','transferable skills'
];

function isCareerRelated(message) {
  const lower = message.toLowerCase();
  return careerKeywords.some(kw => lower.includes(kw));
}

function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutes} ${ampm}`;
}

export default function Advisor() {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your career advisor. I can help with job hunting, resume building, interview preparation, career transitions, and educational pathways. How can I assist you today?",
      isUser: false,
      isError: false,
      time: getCurrentTime(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessageToAI = async (message) => {
    if (!isCareerRelated(message)) {
      return {
        text: "I'm sorry, I can only answer questions related to careers and education. Please ask me about career advice, job searching, education paths, skill development, or professional growth.",
        isError: true,
      };
    }

    try {
      const prompt = `You are a career advisor specialized in providing advice on jobs, careers, education, and professional development. 
Please answer the following question from a career perspective only.
If this question is not related to careers, jobs, education, or professional development, 
politely inform the user that you can only discuss career-related topics.

Question: ${message}`;

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

      const data = await response.json();
      const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I didn't understand that.";
      return { text: aiResponse, isError: false };
    } catch (error) {
      console.error('Error:', error);
      return {
        text: "Sorry, I'm having trouble connecting to the career advice service. Please try again later.",
        isError: true,
      };
    }
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = { text: trimmed, isUser: true, isError: false, time: getCurrentTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const { text, isError } = await sendMessageToAI(trimmed);

    setIsTyping(false);
    setMessages((prev) => [...prev, { text, isUser: false, isError, time: getCurrentTime() }]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const toggleMic = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech Recognition API not supported in this browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      setInput(event.results[0][0].transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <div className="advisor-page">
      <HamburgerMenu />

      <main className="advisor-main">
        <div className="chat-container">
          <h2>Career Advisor</h2>
          <div className="chat-info">
            <div className="info-icon"><i className="fas fa-info"></i></div>
            <div>
              This advisor is specially designed to answer questions about careers, jobs, education, and
              professional development. For the best experience, please keep your questions career-related.
            </div>
          </div>

          <div className="chat-messages" ref={chatRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.isUser ? 'user' : msg.isError ? 'error' : 'advisor'}`}>
                <div>{msg.text}</div>
                <div className="message-time">{msg.time}</div>
              </div>
            ))}
            {isTyping && (
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </div>

          <div className="chat-input-container">
            <div className="chat-input">
              <input
                type="text"
                placeholder="Ask about careers, education, skills..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button className={`input-button mic-btn ${isListening ? 'listening' : ''}`} onClick={toggleMic}>
                <i className="fas fa-microphone"></i>
              </button>
              <button className="input-button send-btn" onClick={handleSend}>
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

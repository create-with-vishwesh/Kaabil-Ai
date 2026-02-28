import { useState, useRef, useEffect } from 'react';
import HamburgerMenu from '../components/common/HamburgerMenu';
import './styles/consultancy.css';

const API_KEY = 'AIzaSyDvs4_jPh1vc0yziykULwJHn38xBs7b3Jc';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';

const services = [
  { title: 'Individual Therapy', desc: 'One-on-one sessions with licensed therapists to address personal mental health concerns and develop coping strategies.' },
  { title: 'Group Therapy', desc: 'Supportive group sessions led by experienced facilitators where you can share experiences and learn from others.' },
  { title: 'Family Counseling', desc: 'Professional guidance for families dealing with mental health challenges and improving communication.' },
  { title: 'Crisis Intervention', desc: 'Immediate support and guidance for individuals experiencing mental health crises or emergencies.' },
  { title: 'Specialized Treatment', desc: 'Targeted therapy programs for specific mental health conditions like anxiety, depression, and PTSD.' },
  { title: 'Online Consultation', desc: 'Convenient virtual sessions with mental health professionals from the comfort of your home.' },
];

const doctors = [
  { name: 'Dr. Sarah Johnson', role: 'Clinical Psychologist', desc: 'Specializing in anxiety disorders and depression with 15 years of experience in cognitive behavioral therapy.' },
  { name: 'Dr. Michael Chen', role: 'Psychiatrist', desc: 'Expert in mood disorders and PTSD treatment with a holistic approach to mental wellness.' },
  { name: 'Dr. Emily Martinez', role: 'Family Therapist', desc: 'Specialized in family dynamics and relationship counseling with a focus on systemic therapy approaches.' },
];

export default function Consultancy() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { text: "Hello! I'm Dr. Genie, your AI health assistant. I can help you with general health questions and provide science-based information. How can I assist you today?", isUser: false },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesRef = useRef(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [chatMessages, typing]);

  const sendChatMessage = async () => {
    const trimmed = chatInput.trim();
    if (!trimmed) return;

    setChatMessages((prev) => [...prev, { text: trimmed, isUser: true }]);
    setChatInput('');
    setTyping(true);

    try {
      const healthContext = `You are Dr. Genie, a helpful AI health assistant. You can provide general health information and guidance, but always:
- Focus only on health-related queries
- Provide science-based information
- Recommend consulting a doctor for serious concerns
- Avoid diagnosing specific conditions
- Be empathetic and professional

User's query: ${trimmed}`;

      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: healthContext }] }],
          generationConfig: { temperature: 0.7, topK: 40, topP: 0.95, maxOutputTokens: 1024 },
        }),
      });

      if (!response.ok) throw new Error('API Error');

      const data = await response.json();
      const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, but I encountered an error.';

      setTyping(false);
      setChatMessages((prev) => [...prev, { text: aiResponse, isUser: false }]);
    } catch {
      setTyping(false);
      setChatMessages((prev) => [...prev, { text: 'I apologize, but I encountered an error. Please try again.', isUser: false }]);
    }
  };

  const handleChatKeyPress = (e) => {
    if (e.key === 'Enter') sendChatMessage();
  };

  return (
    <div className="consultancy-page">
      <HamburgerMenu />

      <div className="main-content">
        <div className="consultation-header">
          <h1>Professional Mental Health Consultation</h1>
          <p>Get expert guidance and support from our experienced mental health professionals</p>
        </div>

        {/* Services Grid */}
        <div className="consultation-services">
          {services.map((service, i) => (
            <div className="service-card" key={i} style={{ animationDelay: `${(i + 1) * 0.1}s` }}>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>

        {/* Doctor Profiles */}
        <div className="doctor-profiles">
          <h2>Our Mental Health Professionals</h2>
          <div className="doctors-grid">
            {doctors.map((doc, i) => (
              <div className="doctor-card" key={i}>
                <div className="doctor-img-placeholder">
                  <i className="fas fa-user-md"></i>
                </div>
                <div className="doctor-info">
                  <h3>{doc.name}</h3>
                  <p className="doctor-role">{doc.role}</p>
                  <p className="doctor-desc">{doc.desc}</p>
                  <button className="chat-start-btn">Start Chat</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking */}
        <div className="booking-section">
          <h2>Ready to Take the First Step?</h2>
          <p>Schedule a consultation with our mental health professionals</p>
          <button className="book-button">Book a Consultation</button>
        </div>
      </div>

      {/* Chat Assistant */}
      <div className="chat-assistant">
        <button className="chat-fab" onClick={() => setChatOpen(!chatOpen)}>
          <i className="fas fa-comments"></i>
        </button>
        {chatOpen && (
          <div className="chat-window active">
            <div className="chat-header-bar">
              <div className="chat-header-info">
                <i className="fas fa-user-md" style={{ fontSize: '24px' }}></i>
                <div>
                  <h3>Dr. Genie</h3>
                  <small>AI Health Assistant</small>
                </div>
              </div>
              <button className="chat-close" onClick={() => setChatOpen(false)}>&times;</button>
            </div>
            <div className="chat-messages-area" ref={messagesRef}>
              {chatMessages.map((msg, i) => (
                <div key={i} className={`chat-msg ${msg.isUser ? 'user-msg' : 'bot-msg'}`}>
                  {msg.text}
                </div>
              ))}
              {typing && <div className="chat-msg bot-msg">Typing...</div>}
            </div>
            <div className="chat-input-area">
              <input
                type="text"
                placeholder="Ask me about your health concerns..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={handleChatKeyPress}
              />
              <button onClick={sendChatMessage}>
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

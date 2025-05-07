import React, { useState } from 'react';
import axios from 'axios';

function ChatBot({ onClose }) {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState([]);

  const handleSend = async () => {
    const response = await axios.post('http://localhost:5000/api/chat', { prompt: query });
    setHistory([...history, { query, response: response.data.result }]);
    setQuery('');
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '90px',
      right: '20px',
      width: '300px',
      height: '400px',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 0 15px rgba(0,0,0,0.3)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      zIndex: 1000,
    }}>
      <div style={{ padding: '10px', borderBottom: '1px solid #ddd', background: '#4b7bec', color: '#fff' }}>
        FlightBot <button onClick={onClose} style={{ float: 'right', color: 'white', background: 'transparent', border: 'none' }}>✖</button>
      </div>
      <div style={{ flex: 1, padding: '10px', overflowY: 'auto' }}>
        {history.map((entry, i) => (
          <div key={i}>
            <b>You:</b> {entry.query}<br />
            <b>Bot:</b> {entry.response}<hr />
          </div>
        ))}
      </div>
      <div style={{ padding: '10px', borderTop: '1px solid #ddd' }}>
        <input value={query} onChange={e => setQuery(e.target.value)} style={{ width: '75%' }} />
        <button onClick={handleSend} style={{ width: '20%' }}>Send</button>
      </div>
    </div>
  );
}

export default ChatBot;

import { useState } from 'react';
import './index.css';

import plushiesImg from './assets/plushies.png';
import sunflowerImg from './assets/sunflower.png';
import orchidImg from './assets/orchid.png';

export default function App() {
  const [activeTab, setActiveTab] = useState<'message' | 'garden' | 'plushies'>('message');
  const [plushieMessage, setPlushieMessage] = useState<string>("Click us for a hug!");

  const comfortingMessages = [
    "Here's a big, warm, cozy hug just for you! 🫂",
    "You are so strong, and I love you so much! 💕",
    "Take it easy today. You deserve all the rest! 🛌",
    "Sending you imaginary hot chocolate and heating pads! ☕",
    "You're the cutest, even when you're crampy! 🥰",
    "I'm always here for you. Snuggles await! 🧸"
  ];

  const handlePlushieClick = () => {
    const randomIndex = Math.floor(Math.random() * comfortingMessages.length);
    setPlushieMessage(comfortingMessages[randomIndex]);
  };

  return (
    <div className="app-container">
      <h1 className="handwritten" style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '10px' }}>
        For My Cutu 🌸
      </h1>

      <div className="tabs">
        <button 
          className={`tab-btn ${activeTab === 'message' ? 'active' : ''}`}
          onClick={() => setActiveTab('message')}
        >
          Love Note 💌
        </button>
        <button 
          className={`tab-btn ${activeTab === 'garden' ? 'active' : ''}`}
          onClick={() => setActiveTab('garden')}
        >
          Virtual Garden 🌻
        </button>
        <button 
          className={`tab-btn ${activeTab === 'plushies' ? 'active' : ''}`}
          onClick={() => setActiveTab('plushies')}
        >
          Virtual Hugs 🧸
        </button>
      </div>

      <div className="scrapbook-card">
        {activeTab === 'message' && (
          <div className="polaroid floating">
            <div style={{ backgroundColor: '#ffe3e3', width: '100%', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '4px' }}>
              <span style={{ fontSize: '4rem' }}>💌</span>
            </div>
            <p>
              Hey beautiful, <br /><br />
              I know this week is tough, but I just want to remind you how much you mean to me. <br />
              You're incredibly strong, and it's okay to just rest right now. <br /><br />
              I love you so, so much! ❤️
            </p>
          </div>
        )}

        {activeTab === 'garden' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <h2 className="handwritten" style={{ color: 'var(--text-secondary)' }}>A little garden just for you...</h2>
            <div className="item-grid" style={{ width: '100%', marginTop: '20px' }}>
              <div className="interactive-item swaying" style={{ animationDelay: '0s' }}>
                <img src={sunflowerImg} alt="Happy Sunflower" />
                <p className="handwritten" style={{ textAlign: 'center', marginTop: '10px' }}>Sunshine!</p>
              </div>
              <div className="interactive-item swaying" style={{ animationDelay: '1s' }}>
                <img src={orchidImg} alt="Elegant Orchid" />
                <p className="handwritten" style={{ textAlign: 'center', marginTop: '10px' }}>Pretty Orchid</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'plushies' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 className="handwritten" style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>Tap the plushies for a hug!</h2>
            
            <div 
              className="interactive-item pulser" 
              onClick={handlePlushieClick}
              style={{ maxWidth: '250px' }}
            >
              <img src={plushiesImg} alt="Cute Plushies Cuddling" />
            </div>

            <div className="message-bubble" style={{ maxWidth: '80%' }}>
              {plushieMessage}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

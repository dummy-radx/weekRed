import { useState, useRef } from 'react';
import './index.css';

import plushiesImg from './assets/plushies.png';
import sunflowerImg from './assets/sunflower.png';
import orchidImg from './assets/orchid.png';
import whiteLilyImg from './assets/white_lily.png';
import dandelionImg from './assets/white_dandelion.png';
import whiteSnowdropImg from './assets/white_snowdrop.png';
import whiteDaisyImg from './assets/white_daisy.png';
import musicFile from './assets/Sufjan_Stevens_-_Mystery_of_Love_(mp3.pm).mp3';

// Heart Particle Component
interface Particle {
  id: number;
  x: number;
  y: number;
  type: 'heart' | 'water';
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'message' | 'garden' | 'plushies' | 'reasons' | 'care'>('message');
  const [plushieMessage, setPlushieMessage] = useState<string>("Click us for a hug!");
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [reasonIndex, setReasonIndex] = useState(0);
  const [careAction, setCareAction] = useState("");

  const [isPlaying, setIsPlaying] = useState(false);
  
  const particleIdCounter = useRef(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const gardenRef = useRef<HTMLDivElement>(null);

  const comfortingMessages = [
    "Here's a big, warm, cozy hug just for you! 🫂",
    "You are so strong, and I love you so much! 💕",
    "Take it easy today. You deserve all the rest! 🛌",
    "Sending you imaginary hot chocolate and heating pads! ☕",
    "You're the cutest, even when you're crampy! 🥰",
    "I'm always here for you. Snuggles await! 🧸",
    "Just resting my chin on your head 🥺",
    "You're doing amazing, my love! ✨"
  ];

  const reasons = [
    "Your beautiful, radiant smile that lights up my whole day.",
    "The way you make the most adorable sleepy faces in the morning.",
    "How incredibly caring and empathetic you are to everyone.",
    "The cute little sounds you make when you're sleepy.",
    "Your passion and dedication to everything you do.",
    "How perfectly you fit in my arms.",
    "Your absolutely brilliant, beautiful mind.",
    "The comfort I feel just hearing your voice.",
    "How you make every ordinary moment feel special.",
    "The way you look at me makes me feel like the luckiest person alive.",
    "The little dances you do when you are happy.",
    "How brave you are, even when things are tough like today.",
    "The warmth of your hugs.",
    "The way we are and the way we love each other and laugh together.",
    "Just entirely, perfectly, beautifully everything about you. ❤️"
  ];

  const careItems = [
    { icon: "🍵", name: "Hot Tea", action: "Brewing you a warm cup of soothing tea... sip slowly! 🌸" },
    { icon: "🍫", name: "Chocolate", action: "Giving you all the chocolate. You deserve it! 😋" },
    { icon: "♨️", name: "Heat Pad", action: "Placing a warm, cozy heating pad on your tummy... ahh, better. 😌" },
    { icon: "🧸", name: "Blanket", action: "Wrapping you tightly in a soft, fluffy burrito blanket! 🌯" },
    { icon: "💆‍♀️", name: "Massage", action: "Giving you a gentle back and tummy massage. Relax... ✨" }
  ];

  const spawnParticles = (e: React.MouseEvent | null, type: 'heart' | 'water', count = 3, customRect?: DOMRect) => {
    const rect = customRect || (e?.target as HTMLElement).getBoundingClientRect();
    const newParticles = Array.from({ length: count }).map(() => ({
      id: particleIdCounter.current++,
      x: rect.left + Math.random() * rect.width,
      y: type === 'water' 
        ? rect.top + (Math.random() * (rect.height / 2)) - 20 
        : rect.top + Math.random() * rect.height,
      type
    }));
    
    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 2000);
  };

  const handlePlushieClick = (e: React.MouseEvent) => {
    const randomIndex = Math.floor(Math.random() * comfortingMessages.length);
    setPlushieMessage(comfortingMessages[randomIndex]);
    spawnParticles(e, 'heart', 5);
  };

  const nextReason = (e: React.MouseEvent) => {
    setReasonIndex((prev) => (prev + 1) % reasons.length);
    spawnParticles(e, 'heart', 2);
  };

  const prevReason = (e: React.MouseEvent) => {
    setReasonIndex((prev) => (prev - 1 + reasons.length) % reasons.length);
    spawnParticles(e, 'heart', 2);
  };


  const handleCareItemClick = (e: React.MouseEvent, action: string) => {
    setCareAction(action);
    spawnParticles(e, 'heart', 3);
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="app-container" style={{ position: 'relative', zIndex: 1 }}>
      <audio ref={audioRef} src={musicFile} loop />
      
      {/* Background Decor */}
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '10px' }}>
        <button 
          onClick={toggleAudio} 
          className="tab-btn floating"
          style={{ 
            background: 'var(--accent-pink)', 
            color: 'white',
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            padding: '8px 16px',
            animationDuration: '3s'
          }}
        >
          {isPlaying ? '⏸️ Pause Song' : '🎵 Play Song'}
        </button>
      </div>

      <h1 className="handwritten" style={{ textAlign: 'center', marginBottom: '10px', textShadow: '2px 2px 4px rgba(255,183,178,0.3)' }}>
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
          className={`tab-btn ${activeTab === 'care' ? 'active' : ''}`}
          onClick={() => setActiveTab('care')}
        >
          Care Package 🍵
        </button>
        <button 
          className={`tab-btn ${activeTab === 'plushies' ? 'active' : ''}`}
          onClick={() => setActiveTab('plushies')}
        >
          Virtual Hugs 🧸
        </button>
        <button 
          className={`tab-btn ${activeTab === 'reasons' ? 'active' : ''}`}
          onClick={() => setActiveTab('reasons')}
        >
          Reasons Why 🫙
        </button>
        <button 
          className={`tab-btn ${activeTab === 'garden' ? 'active' : ''}`}
          onClick={() => setActiveTab('garden')}
        >
          Garden 🌻
        </button>
      </div>

      <div className="scrapbook-card">
        {activeTab === 'message' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div 
              className={`envelope-wrapper ${isEnvelopeOpen ? 'open' : ''} floating`}
              onClick={() => setIsEnvelopeOpen(true)}
              style={{ width: '100%', maxWidth: '400px', margin: '20px 0' }}
            >
              {!isEnvelopeOpen && (
                <p className="handwritten" style={{ position: 'absolute', top: '-40px', width: '100%', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  Tap to open...
                </p>
              )}
              <div className="envelope-flap"></div>
              <div className="envelope-body">
                <div className="note-content polaroid" style={{ transform: isEnvelopeOpen ? 'translateY(0)' : 'translateY(100%)' }}>
                  <p>
                    Hey beautiful, <br /><br />
                    I know this week is physically and emotionally draining, but I just want to remind you how deeply I care about you. <br />
                    You are incredibly strong, and it is more than okay to just rest right now. Please don't stress about being productive. <br /><br />
                    Just lay back, get comfy, let me worry about the rest of the world. <br /><br />
                    I love you so, so much! ❤️
                    <br /><br />
                    <span style={{ fontSize: '1rem', color: 'var(--accent-pink)' }}>P.S. You're still gorgeous in your comfy clothes with a messy bun.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'care' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <h2 className="handwritten" style={{ color: 'var(--text-secondary)' }}>Your Virtual Care Package</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Tap an item when you need it</p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px', marginTop: '10px' }}>
              {careItems.map((item, idx) => (
                <div 
                  key={idx} 
                  className="care-item"
                  onClick={(e) => handleCareItemClick(e, item.action)}
                  title={item.name}
                >
                  {item.icon}
                </div>
              ))}
            </div>

            {careAction && (
              <div className="message-bubble floating" style={{ maxWidth: '90%', animationDuration: '4s' }}>
                {careAction}
              </div>
            )}
          </div>
        )}

        {activeTab === 'reasons' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <h2 className="handwritten" style={{ color: 'var(--text-secondary)' }}>Reasons I Love You</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Tap the card or use the buttons below</p>
            
            <div 
              className="reason-card floating" 
              onClick={nextReason}
              style={{ width: '100%', maxWidth: '350px', minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <p className="handwritten" style={{ margin: 0 }}>
                "{reasons[reasonIndex]}"
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginTop: '-10px' }}>
              <button 
                className="tab-btn" 
                style={{ padding: '8px 16px', fontSize: '0.9rem' }} 
                onClick={prevReason}
              >
                ⬅️ Prev
              </button>
              <p style={{ color: 'var(--text-secondary)', margin: '0 10px', minWidth: '40px', textAlign: 'center' }}>
                {reasonIndex + 1} / {reasons.length}
              </p>
              <button 
                className="tab-btn" 
                style={{ padding: '8px 16px', fontSize: '0.9rem' }} 
                onClick={nextReason}
              >
                Next ➡️
              </button>
            </div>
          </div>
        )}

        {activeTab === 'garden' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <h2 className="handwritten" style={{ color: 'var(--text-secondary)' }}>Your little zen garden...</h2>
            


            <div className="item-grid" ref={gardenRef} style={{ width: '100%', marginTop: '20px', position: 'relative' }}>
              <div className={`interactive-item swaying`} style={{ animationDelay: '0s' }}>
                <img src={sunflowerImg} alt="Happy Sunflower" />
                <p className="handwritten" style={{ textAlign: 'center', marginTop: '10px' }}>Sunshine!</p>
              </div>
              <div className={`interactive-item swaying`} style={{ animationDelay: '1s' }}>
                <img src={orchidImg} alt="Elegant Orchid" />
                <p className="handwritten" style={{ textAlign: 'center', marginTop: '10px' }}>Pretty Orchid</p>
              </div>
              <div className={`interactive-item swaying`} style={{ animationDelay: '0.5s' }}>
                <img src={whiteLilyImg} alt="White Lily" />
                <p className="handwritten" style={{ textAlign: 'center', marginTop: '10px' }}>Pure Lily</p>
              </div>
              <div className={`interactive-item swaying`} style={{ animationDelay: '1.5s' }}>
                <img src={dandelionImg} alt="Dandelion" />
                <p className="handwritten" style={{ textAlign: 'center', marginTop: '10px' }}>Make a Wish!</p>
              </div>
              <div className={`interactive-item swaying`} style={{ animationDelay: '0.2s' }}>
                <img src={whiteDaisyImg} alt="White Daisy" />
                <p className="handwritten" style={{ textAlign: 'center', marginTop: '10px' }}>Cute Daisy</p>
              </div>
              <div className={`interactive-item swaying`} style={{ animationDelay: '1.2s' }}>
                <img src={whiteSnowdropImg} alt="White Snowdrop" />
                <p className="handwritten" style={{ textAlign: 'center', marginTop: '10px' }}>Gentle Snowdrop</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'plushies' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 className="handwritten" style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>Tap for squishy hugs!</h2>
            
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

      {/* Particles Portal */}
      {particles.map(p => (
        <div 
          key={p.id}
          className={p.type === 'heart' ? 'floating-heart' : 'water-drop'}
          style={{ left: p.x, top: p.y }}
        >
          {p.type === 'heart' ? '💕' : '💧'}
        </div>
      ))}
    </div>
  );
}

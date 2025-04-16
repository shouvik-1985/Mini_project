// src/components/Home.js
import React from 'react';
import { motion } from 'framer-motion';

const blobs = [
  { top: '-100px', left: '-100px', bg: 'linear-gradient(135deg, #6EE7B7 0%, #3B82F6 100%)', size: 300, delay: 0 },
  { top: '200px', right: '-120px', bg: 'linear-gradient(135deg, #FDE68A 0%, #FCA5A5 100%)', size: 250, delay: 1 },
  { bottom: '-100px', left: '40vw', bg: 'linear-gradient(135deg, #C4B5FD 0%, #F472B6 100%)', size: 350, delay: 2 },
];

const typewriterText = "Welcome to Contact Manager";

export default function Home() {
  // Typewriter effect
  const [displayed, setDisplayed] = React.useState('');
  React.useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(typewriterText.slice(0, i + 1));
      i++;
      if (i === typewriterText.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '80vh', overflow: 'hidden', background: '#f8fafc' }}>
      {/* Animated Blobs */}
      {blobs.map((blob, idx) => (
        <motion.div
          key={idx}
          initial={{ scale: 0.7, opacity: 0.5 }}
          animate={{ 
            scale: [0.7, 1.1, 0.9, 1], 
            opacity: [0.5, 0.7, 0.6, 0.5], 
            rotate: [0, 360] 
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            repeatType: "mirror", 
            delay: blob.delay 
          }}
          style={{
            position: 'absolute',
            ...blob,
            width: blob.size,
            height: blob.size,
            borderRadius: '50%',
            background: blob.bg,
            filter: 'blur(60px)',
            zIndex: 0,
          }}
        />
      ))}

      {/* Floating Contact Book Icon */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 8, delay: 0.5 }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 80,
          zIndex: 2,
          position: 'relative'
        }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, repeatType: "mirror" }}
          style={{
            background: 'white',
            borderRadius: '50%',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            padding: 32,
            display: 'inline-block'
          }}
        >
          {/* SVG Contact Book Icon */}
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="16" rx="3" fill="#3B82F6" />
            <rect x="6" y="7" width="12" height="10" rx="2" fill="#fff" />
            <circle cx="12" cy="12" r="2" fill="#3B82F6" />
            <rect x="10" y="15" width="4" height="1.5" rx="0.75" fill="#3B82F6" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Typewriter Welcome Text */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
        style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          fontWeight: 700,
          marginTop: 32,
          color: '#22223b',
          letterSpacing: '1px',
          zIndex: 2,
          position: 'relative',
          fontFamily: 'Montserrat, sans-serif'
        }}
      >
        <span style={{ borderRight: '2px solid #3B82F6', paddingRight: 4 }}>
          {displayed}
        </span>
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        style={{
          textAlign: 'center',
          fontSize: '1.3rem',
          color: '#4f4f4f',
          marginTop: 16,
          zIndex: 2,
          position: 'relative'
        }}
      >
        Effortlessly manage your contacts with style and speed.<br />
        <span style={{ color: '#3B82F6', fontWeight: 600 }}>Add, edit, and organize</span> your network with a single click.
      </motion.p>
    </div>
  );
}

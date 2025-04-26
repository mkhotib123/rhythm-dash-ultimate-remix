import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

const quotes = {
  pulse: ["The beat never lies.", "Let the rhythm guide your soul.", "Pulse to perfection."]
};
const themes = ["pulse"];

function getRandomQuote(theme) {
  const q = quotes[theme] || [];
  return q[Math.floor(Math.random() * q.length)] || "Let the music move you.";
}

export default function Home() {
  const router = useRouter();
  const [quote, setQuote] = useState(getRandomQuote("pulse"));
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const iv = setInterval(() => setQuote(getRandomQuote("pulse")), 15000);
    return () => clearInterval(iv);
  }, []);

  const nav = (path) => {
    setTransitioning(true);
    setTimeout(() => router.push(path), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-purple-900 to-black text-white">
      <AnimatePresence>
        {transitioning && (
          <motion.div className="fixed inset-0 bg-black/80 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.h2 className="text-3xl">{quote}</motion.h2>
          </motion.div>
        )}
      </AnimatePresence>
      <h1 className="text-5xl font-bold mb-6">Rhythm Dash Remix</h1>
      <div className="space-x-4">
        <button onClick={() => nav("/login")} className="px-4 py-2 bg-purple-600 rounded">Login</button>
        <button onClick={() => nav("/signup")} className="px-4 py-2 bg-gray-700 rounded">Sign Up</button>
        <button onClick={() => nav("/game")} className="px-4 py-2 bg-green-600 rounded">Play</button>
      </div>
    </div>
);
}

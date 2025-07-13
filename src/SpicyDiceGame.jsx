// SpicyDiceGame.jsx
import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const vanillaActionBodyPairs = [
  { action: "Lick slowly", parts: ["Inner thighs", "Nipples", "Neck", "Lower back"] },
  { action: "Spank playfully", parts: ["Butt cheeks", "Lower back"] },
  { action: "Suck intensely", parts: ["Nipples", "Earlobes", "Inner thighs"] },
  { action: "Bite gently", parts: ["Neck", "Shoulder", "Nipples"] },
  { action: "Tease without touching", parts: ["Inner thighs", "Between the legs", "Neck"] },
  { action: "Use tongue only", parts: ["Nipples", "Between the legs", "Neck"] },
  { action: "Kiss deeply", parts: ["Mouth", "Neck", "Inner thighs"] },
  { action: "Massage slowly", parts: ["Back", "Butt cheeks", "Feet"] },
  { action: "Tickle softly", parts: ["Feet", "Sides", "Neck"] },
  { action: "Whisper dirty", parts: ["Ear", "Neck"] },
  { action: "Nuzzle gently", parts: ["Neck", "Shoulder", "Hair"] },
  { action: "Caress slowly", parts: ["Thighs", "Stomach", "Back"] },
  { action: "Graze with fingertips", parts: ["Chest", "Neck", "Inner thighs"] },
];

const wildActionBodyPairs = [
  { action: "Tie and tease", parts: ["Wrists", "Ankles", "Neck"] },
  { action: "Spank hard", parts: ["Butt cheeks", "Thighs"] },
  { action: "Drip candle wax", parts: ["Stomach", "Chest", "Back"] },
  { action: "Bite and mark", parts: ["Neck", "Inner thighs"] },
  { action: "Use a toy", parts: ["Between the legs"] },
  { action: "Edge them — but don’t finish", parts: ["Between the legs"] },
  { action: "Pin down and kiss", parts: ["Mouth", "Neck"] },
];

const bonusChallenges = [
  "Strip an item of clothing",
  "Blindfold your partner",
  "Use ice or something cold",
  "Perform with hands tied",
  "Only use your mouth for 1 minute",
  "Slow motion only for 2 minutes",
  "Moan every time you're touched",
  "Say what you want — no holding back",
  "No talking — only gestures",
  "Keep full eye contact during the act",
  "Make the other person beg before continuing",
  "Do it while standing",
  "Act out a fantasy you've never told before",
];

const musicTracks = {
  romantic: "https://www.bensound.com/bensound-music/bensound-love.mp3",
  seductive: "https://www.bensound.com/bensound-music/bensound-sexy.mp3",
  ambient: "https://www.bensound.com/bensound-music/bensound-slowmotion.mp3",
  playful: "https://www.bensound.com/bensound-music/bensound-funkyelement.mp3",
  chill: "https://www.bensound.com/bensound-music/bensound-creativeminds.mp3"
};

export default function SpicyDiceGame() {
  const [action, setAction] = useState("?");
  const [bodyPart, setBodyPart] = useState("?");
  const [bonus, setBonus] = useState("?");
  const [rolling, setRolling] = useState(false);
  const [wildMode, setWildMode] = useState(false);
  const [music, setMusic] = useState("romantic");
  const [musicPlaying, setMusicPlaying] = useState(true);
  const [diceValues, setDiceValues] = useState([1, 1, 1]);
  const audioRef = useRef(null);
  const musicRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("https://www.myinstants.com/media/sounds/dice-roll.mp3");
  }, []);

  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.pause();
    }
    musicRef.current = new Audio(musicTracks[music]);
    musicRef.current.loop = true;
    musicRef.current.volume = 0.4;
    if (musicPlaying) musicRef.current.play().catch(() => {});
  }, [music, musicPlaying]);

  const playSoundAndHaptic = () => {
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
      if ("vibrate" in navigator) navigator.vibrate(100);
    } catch (e) {
      console.warn("Sound/haptic error:", e);
    }
  };

  const rollDice = () => {
    playSoundAndHaptic();
    setRolling(true);
    const interval = setInterval(() => {
      setDiceValues([
        Math.ceil(Math.random() * 6),
        Math.ceil(Math.random() * 6),
        Math.ceil(Math.random() * 6),
      ]);
    }, 100);
    setTimeout(() => {
      clearInterval(interval);
      const pairs = wildMode ? wildActionBodyPairs : vanillaActionBodyPairs;
      const selected = pairs[Math.floor(Math.random() * pairs.length)];
      const part = selected.parts[Math.floor(Math.random() * selected.parts.length)];
      setAction(selected.action);
      setBodyPart(part);
      setBonus(bonusChallenges[Math.floor(Math.random() * bonusChallenges.length)]);
      setRolling(false);
    }, 1000);
  };

  const modeButtons = [
    { key: "romantic", icon: "💖" },
    { key: "seductive", icon: "🔥" },
    { key: "ambient", icon: "🌙" },
    { key: "playful", icon: "🎉" },
    { key: "chill", icon: "🧊" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-500 animate-gradient bg-gradient-to-br from-pink-200 to-red-300 text-pink-900">
      <h1 className="text-4xl font-bold tracking-wide text-center mb-8 animate-fade-in font-[Pacifico] bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
        🎲 Spicy Dice Experience
      </h1>

      <div className="flex flex-wrap gap-4 mb-6 justify-center items-center">
        <label className="flex items-center gap-2 bg-pink-800 px-4 py-2 rounded-full text-white shadow hover:scale-105 transition-transform">
          <input
            type="checkbox"
            checked={wildMode}
            onChange={(e) => setWildMode(e.target.checked)}
          />
          Wild Mode
        </label>

        {modeButtons.map(({ key, icon }) => (
          <button
            key={key}
            onClick={() => setMusic(key)}
            className={`px-4 py-2 rounded-full font-semibold text-white shadow transition-transform hover:scale-105 ${music === key ? "bg-red-600" : "bg-pink-600"}`}
          >
            {icon} {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}

        <button
          onClick={() => {
            if (musicRef.current) {
              if (musicPlaying) {
                musicRef.current.pause();
              } else {
                musicRef.current.play();
              }
              setMusicPlaying(!musicPlaying);
            }
          }}
          className="bg-pink-700 text-white rounded-full p-3 shadow hover:scale-105 transition-transform"
          aria-label="Toggle Music"
        >
          {musicPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-5.197-3.027A1 1 0 008 9.027v5.946a1 1 0 001.555.832l5.197-3.027a1 1 0 000-1.66z" />
            </svg>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        <Card label="Action" value={action} rolling={rolling}/>
        <Card label="Body Part" value={bodyPart} rolling={rolling}/>
        <Card label="Bonus Challenge" value={bonus} rolling={rolling}/>
      </div>

      <div className="flex gap-6 mt-10">
        {diceValues.map((value, index) => (
          <div key={index} className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-xl bg-pink-700 transform transition-transform duration-500 ${rolling ? "animate-spin-slow" : ""}`}>
            {value}
          </div>
        ))}
      </div>

      <button
        onClick={rollDice}
        className="mt-10 px-8 py-4 bg-gradient-to-r from-pink-600 to-red-500 hover:from-pink-700 hover:to-red-600 text-white rounded-2xl text-xl font-bold shadow-xl hover:scale-105 transition-transform duration-300 animate-pulse"
        disabled={rolling}
      >
        Roll the Dice 🎲
      </button>
    </div>
  );
}
function Card({ label, value, rolling }) {
  return (
    <div className="backdrop-blur bg-white/20 rounded-2xl p-4 shadow-md text-center hover:scale-105 transition-transform duration-300">
      <h2 className="text-xl font-semibold mb-2">{label}</h2>
      <p className={`text-2xl font-bold italic transition-opacity duration-500 ${rolling ? "opacity-0" : "opacity-100"}`}>
        {value}
      </p>
    </div>
  );
}

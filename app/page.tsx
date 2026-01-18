"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  async function sendMessage() {
  if (!input.trim()) return;

  setResponse("Thinking…");

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input }),
  });

  const data = await res.json();
  setResponse(data.reply);
  setInput("");
}

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-3xl font-semibold mb-2">Amma</h1>
        <p className="text-white/60 mb-8">
          I am listening.
        </p>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Speak from your heart…"
          className="w-full h-32 bg-zinc-900 border border-white/10 rounded-xl p-4 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/20"
        />

        <button
          onClick={sendMessage}
          className="mt-4 w-full bg-white text-black py-3 rounded-xl font-medium hover:bg-white/90 transition"
        >
          Send
        </button>

        {response && (
          <div className="mt-6 text-white/80 leading-relaxed">
            {response}
          </div>
        )}
      </div>
    </main>
  );
}

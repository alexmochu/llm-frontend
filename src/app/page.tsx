"use client";

import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setAnswer(data.answer);
    } catch (error) {
      setAnswer("Error: Could not reach the backend. Make sure the FastAPI server is running on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Alex Mochu – Career Knowledge Base
        </h1>
        <p className="text-gray-500 mb-6 text-sm">
          Powered by local RAG (Ollama + Chroma + FastAPI)
        </p>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && askQuestion()}
            placeholder="Ask about Alex's experience, skills, roles..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={askQuestion}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition"
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </div>

        {answer && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <h2 className="font-semibold text-gray-700 mb-2">Answer</h2>
            <p className="text-gray-800 whitespace-pre-wrap">{answer}</p>
          </div>
        )}
      </div>
    </main>
  );
}

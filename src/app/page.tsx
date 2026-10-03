"use client";

import { useState } from "react";

interface ToolCall {
  tool: string;
  args: Record<string, any>;
}

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [toolCalls, setToolCalls] = useState<ToolCall[]>([]);
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");
    setToolCalls([]);

    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setAnswer(data.answer);
      setToolCalls(data.tool_calls || []);
    } catch (error) {
      setAnswer("Error: Could not reach the backend. Is the FastAPI server running on port 8000?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 mt-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Alex Mochu – Career Knowledge Base
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Agentic RAG • Local (Ollama + LangGraph + Chroma)
          </p>
        </div>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && askQuestion()}
            placeholder="Ask about experience, skills, roles..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={askQuestion}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-blue-400 transition font-medium"
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </div>

        {toolCalls.length > 0 && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm">
            <span className="font-medium text-amber-800">Agent used tools: </span>
            {toolCalls.map((tc, i) => (
              <span key={i} className="inline-block bg-amber-100 text-amber-900 px-2 py-0.5 rounded mr-2">
                {tc.tool}
              </span>
            ))}
          </div>
        )}

        {answer && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
            <h2 className="font-semibold text-blue-900 mb-2">Answer</h2>
            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{answer}</p>
          </div>
        )}
      </div>
    </main>
  );
}

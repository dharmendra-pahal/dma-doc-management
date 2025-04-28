"use client";
import React, { useState } from "react";
import { qaService } from "../../lib/api";

const QAInterfacePage = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [excerpt, setExcerpt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await qaService.askQuestion(question);
      setAnswer(response.answer);
      setExcerpt(response.documentExcerpt);
    } catch (err) {
      setError("Failed to fetch the answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Q&A Interface</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <button
          onClick={handleAskQuestion}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Ask
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {answer && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Answer</h2>
          <p>{answer}</p>
        </div>
      )}

      {excerpt && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Relevant Document Excerpt</h2>
          <p>{excerpt}</p>
        </div>
      )}
    </div>
  );
};

export default QAInterfacePage;
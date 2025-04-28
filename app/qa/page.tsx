"use client";
import React, { useState, useEffect } from "react";
import { qaService } from "../../lib/api";

const QAInterfacePage = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [excerpt, setExcerpt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const getQuestions = async () => {
    const response = await qaService.fetchQuestions()
    setSuggestions(response);
    }
    getQuestions();
  }, []);

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
          onFocus={() => {
            setShowSuggestions(true);
            
        }}
          className="border p-2 mb-2 w-full"
        />
        {showSuggestions && question.length > 0 && suggestions.length > 0 && (
          <ul className="border p-2 mb-2 w-full bg-white shadow">
            {suggestions.filter((item)=> item.includes(question)).map((suggestion, index) => (
              <li
                key={index}
                onClick={() => {
                  setQuestion(suggestion);
                  setShowSuggestions(false);
                }}
                className="cursor-pointer hover:bg-gray-100 p-1"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
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
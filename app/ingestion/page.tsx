"use client";
import React, { useEffect, useState } from "react";
import { ingestionService } from "../../lib/api";
import { Ingestion } from "@/lib/types";
import { Button } from "@/components/common/Button";

const IngestionManagementPage = () => {
  const [ingestionStatuses, setIngestionStatuses] = useState<Ingestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newIngestionName, setNewIngestionName] = useState("");

  useEffect(() => {
    const fetchIngestionStatuses = async () => {
      setLoading(true);
      setError(null);
      try {
        const statuses = await ingestionService.fetchIngestionStatus();
        setIngestionStatuses(statuses);
      } catch (err) {
        setError("Failed to fetch ingestion statuses.");
      } finally {
        setLoading(false);
      }
    };

    fetchIngestionStatuses();
  }, []);

  const handleTriggerIngestion = async () => {
    if (!newIngestionName.trim()) {
      setError("Please provide a name for the ingestion.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await ingestionService.triggerIngestion(newIngestionName);
      if (response.success) {
        setIngestionStatuses(response.mockIngestionStatus);
        setNewIngestionName("");
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Failed to trigger ingestion.");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async (ingestionId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response =await ingestionService.updateIngestionStatus(ingestionId)
      setIngestionStatuses(response.mockIngestionStatus);
    } catch (err) {
      setError("Failed to mark ingestion as complete.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ingestion Management</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter ingestion name"
          value={newIngestionName}
          onChange={(e) => setNewIngestionName(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <button
          onClick={handleTriggerIngestion}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Trigger Ingestion
        </button>
      </div>

      <h2 className="text-lg mb-4 font-semibold">Ingestion Statuses</h2>
      <ul className="list-disc pl-5">
        {ingestionStatuses.map((status) => (
          <li key={status.id} className="mb-2">
            <span className="font-semibold">{status.name}</span> - {status.status} - {new Date(status.timestamp).toLocaleString()}
            {!status.done && (
              <button
                onClick={() => handleMarkComplete(status.id)}
                className="ml-4 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
              >
                Mark Complete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngestionManagementPage;
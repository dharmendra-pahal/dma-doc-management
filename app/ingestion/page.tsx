"use client";
import React, { useEffect, useState } from "react";
import { ingestionService } from "../../lib/api";
import { Ingestion } from "@/lib/types";

const IngestionManagementPage = () => {
  const [ingestionStatuses, setIngestionStatuses] = useState<Ingestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    setLoading(true);
    setError(null);
    try {
      const response = await ingestionService.triggerIngestion();
      if (response.success) {
        setIngestionStatuses(response.mockIngestionStatus);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Failed to trigger ingestion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ingestion Management</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleTriggerIngestion}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Trigger Ingestion
      </button>

      <h2 className="text-lg font-semibold">Ingestion Statuses</h2>
      <ul className="list-disc pl-5">
        {ingestionStatuses.map((status) => (
          <li key={status.id} className="mb-2">
            <span className="font-semibold">{status.status}</span> - {new Date(status.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngestionManagementPage;
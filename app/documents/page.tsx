"use client";
import React, { useEffect, useState } from "react";
import { documentService } from "../../lib/api";
import { DocumentData } from "@/lib/types";
import { useAuthContext } from "@/contexts/AuthContext";

const DocumentManagementPage = () => {
  const {user} = useAuthContext();
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newDocument, setNewDocument] = useState({ name: "", content: "", uploadedBy:"" });

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedDocuments = await documentService.fetchDocuments();
        setDocuments(fetchedDocuments);
      } catch (err) {
        setError("Failed to fetch documents.");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const handleUpload = async () => {
    if (!newDocument.name || !newDocument.content) {
      setError("Document name and content are required.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await documentService.uploadDocument(
        newDocument.name,
        newDocument.content,
        user ? user?.email : ''
      );
      if (response.success) {
        setDocuments(response.mockDocuments);
        setNewDocument({ name: "", content: "", uploadedBy:"" });
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Failed to upload document.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (documentId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await documentService.deleteDocument(documentId);
      if (response.success) {
        setDocuments((prev) => prev.filter((doc) => doc.id !== documentId));
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Failed to delete document.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Document Management</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Upload New Document</h2>
        <input
          type="text"
          placeholder="Document Name"
          value={newDocument.name}
          onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <textarea
          placeholder="Document Content"
          value={newDocument.content}
          onChange={(e) => setNewDocument({ ...newDocument, content: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">
          Upload
        </button>
      </div>

      <h2 className="text-lg font-semibold">Uploaded Documents</h2>
      <ul className="list-disc pl-5">
        {documents.map((doc) => (
          <li key={doc.id} className="mb-2">
            <span className="font-semibold">{doc.name}</span>: {doc.content}
            <button
              onClick={() => handleDelete(doc.id)}
              className="ml-4 text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentManagementPage;
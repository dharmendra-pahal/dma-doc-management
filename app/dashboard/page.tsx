"use client";
import React from "react";
import Link from "next/link";
import { useAuthContext } from "../../contexts/AuthContext";

const DashboardPage = () => {
  const { user } = useAuthContext();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {user?.role === "admin" && (
          <Link href="/admin/users">
            <div className="p-4 border rounded-lg shadow hover:bg-gray-100 cursor-pointer">
              <h2 className="text-lg font-semibold">User Management</h2>
              <p>Manage users and assign roles.</p>
            </div>
          </Link>
        )}
        <Link href="/documents">
          <div className="p-4 border rounded-lg shadow hover:bg-gray-100 cursor-pointer">
            <h2 className="text-lg font-semibold">Document Management</h2>
            <p>Upload and manage documents.</p>
          </div>
        </Link>
        <Link href="/ingestion">
          <div className="p-4 border rounded-lg shadow hover:bg-gray-100 cursor-pointer">
            <h2 className="text-lg font-semibold">Ingestion Management</h2>
            <p>Trigger and monitor ingestion processes.</p>
          </div>
        </Link>
        <Link href="/qa">
          <div className="p-4 border rounded-lg shadow hover:bg-gray-100 cursor-pointer">
            <h2 className="text-lg font-semibold">Q&A Interface</h2>
            <p>Ask questions and get answers with document excerpts.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
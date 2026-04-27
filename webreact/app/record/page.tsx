"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/auth";
import { getRecordList } from "@/services/api";
import type { Record } from "@/types";

export default function RecordPage() {
  const [records, setRecords] = useState<Record[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (user) {
      loadRecords();
    }
  }, [user]);

  const loadRecords = async () => {
    if (user) {
      try {
        setIsLoading(true);
        const recordList = await getRecordList(user.id);
        setRecords(recordList);
      } catch (error) {
        console.error("Failed to load records:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleViewRecord = (recordId: number) => {
    router.push(`/record/${recordId}`);
  };

  const handleShareRecord = (recordId: number) => {
    // Generate shareable link
    const shareLink = `${window.location.origin}/record/${recordId}`;
    // Copy to clipboard
    navigator.clipboard.writeText(shareLink);
    alert("Share link copied to clipboard!");
  };

  if (authLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Game Records
      </h1>

      {isLoading ? (
        <div className="text-center py-4">Loading records...</div>
      ) : records.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No game records yet. Play some games!
        </div>
      ) : (
        <div className="space-y-4">
          {records.map((record) => (
            <div
              key={record.id}
              className="p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Game #{record.id}</h3>
                <span className="text-sm text-gray-600">
                  {new Date(record.create_time).toLocaleString()}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-gray-100 rounded">
                  <p className="font-medium">{record.a_name}</p>
                  <p className="text-gray-600">Rating: {record.a_rating}</p>
                </div>
                <div className="p-3 bg-gray-100 rounded">
                  <p className="font-medium">{record.b_name}</p>
                  <p className="text-gray-600">Rating: {record.b_rating}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleViewRecord(record.id)}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  View Record
                </button>
                <button
                  onClick={() => handleShareRecord(record.id)}
                  className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

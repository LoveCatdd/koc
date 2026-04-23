"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/utils/auth";
import { getRankList } from "@/services/api";
import type { User } from "@/types";

export default function RankListPage() {
  const [rankList, setRankList] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isLoading: authLoading } = useAuth();

  useEffect(() => {
    loadRankList();
  }, []);

  const loadRankList = async () => {
    try {
      setIsLoading(true);
      const list = await getRankList();
      setRankList(list);
    } catch (error) {
      console.error("Failed to load rank list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Rankings
      </h1>

      {isLoading ? (
        <div className="text-center py-4">Loading rankings...</div>
      ) : rankList.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No rankings available
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Rank
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Username
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody>
              {rankList.map((user, index) => (
                <tr
                  key={user.id}
                  className={user.id === (user?.id || 0) ? "bg-blue-50" : ""}
                >
                  <td className="border border-gray-200 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        {user.photo ? (
                          <img
                            src={user.photo}
                            alt={user.username}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-500">
                            {user.username.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <span>{user.username}</span>
                    </div>
                  </td>
                  <td className="border border-gray-200 px-4 py-2 font-medium">
                    {user.rating}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

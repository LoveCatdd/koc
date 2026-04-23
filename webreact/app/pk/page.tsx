"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/auth";
import { websocketService } from "@/services/websocket";
import type { Game } from "@/types";

export default function PkPage() {
  const [isMatching, setIsMatching] = useState(false);
  const [matchStatus, setMatchStatus] = useState("");
  const [game, setGame] = useState<Game | null>(null);
  const [opponent, setOpponent] = useState<{
    username: string;
    photo: string;
  } | null>(null);
  const router = useRouter();
  const { user, token, isLoading } = useAuth();

  useEffect(() => {
    if (token) {
      // Connect to WebSocket when token is available
      websocketService.connect(token).catch((err) => {
        console.error("WebSocket connection error:", err);
      });

      // Listen for matching events
      websocketService.on("start-matching", (data) => {
        setMatchStatus("Found opponent!");
        setOpponent({ username: data.username, photo: data.photo });
        setGame(data.game);
        setIsMatching(false);
        // Redirect to game page
        // router.push(`/pk/game/${data.game.a_id}-${data.game.b_id}`);
      });

      return () => {
        // Clean up WebSocket connection
        websocketService.disconnect();
      };
    }
  }, [token]);

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  const handleStartMatching = () => {
    setIsMatching(true);
    setMatchStatus("Looking for opponent...");
    websocketService.startMatching();
  };

  const handleStopMatching = () => {
    setIsMatching(false);
    setMatchStatus("");
    websocketService.stopMatching();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Play Chess
      </h1>
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">Your Info</h2>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
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
          <div>
            <p className="font-medium">{user.username}</p>
            <p className="text-gray-600">Rating: {user.rating}</p>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">Match Status</h2>
        <div className="p-4 bg-gray-100 rounded-md">
          <p className="text-center">{matchStatus || "Ready to match"}</p>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleStartMatching}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isMatching}
        >
          {isMatching ? "Matching..." : "Start Matching"}
        </button>
        <button
          onClick={handleStopMatching}
          className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isMatching}
        >
          Stop Matching
        </button>
      </div>
    </div>
  );
}

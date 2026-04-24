"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/auth";
import { websocketService } from "@/services/websocket";
import type { Game } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ClientLayout } from "../components/ClientLayout";

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
        toast.error("Failed to connect to game server");
      });

      // Listen for matching events
      const handleMatchFound = (data: any) => {
        setMatchStatus("Found opponent!");
        setOpponent({ username: data.username, photo: data.photo });
        setGame(data.game);
        setIsMatching(false);
        // Redirect to game page
        if (data.game) {
          const gameId = `${data.game.a_id}-${data.game.b_id}`;
          router.push(`/pk/game/${gameId}`);
        }
      };

      const handleMatchError = (data: any) => {
        setMatchStatus("Matching failed");
        setIsMatching(false);
        toast.error(data.message || "Failed to find opponent");
      };

      websocketService.on("start-matching", handleMatchFound);
      websocketService.on("match-error", handleMatchError);

      return () => {
        // Clean up WebSocket connection
        websocketService.off("start-matching", handleMatchFound);
        websocketService.off("match-error", handleMatchError);
        websocketService.disconnect();
      };
    }
  }, [token, router]);

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
    <ClientLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Play Chess
            </CardTitle>
            <CardDescription className="text-center">
              Find an opponent and start playing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">Your Info</h2>
              <div className="flex items-center gap-4 p-3 border rounded-md">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  {user.photo ? (
                    <img
                      src={user.photo}
                      alt={user.username}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 text-xl font-medium">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-medium">{user.username}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-600">Rating: {user.rating}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">Match Status</h2>
              <div className="p-4 bg-gray-100 rounded-md">
                <p className="text-center font-medium">
                  {isMatching ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      {matchStatus || "Looking for opponent..."}
                    </span>
                  ) : (
                    matchStatus || "Ready to match"
                  )}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleStartMatching}
                disabled={isMatching}
                className="flex-1"
              >
                {isMatching ? "Matching..." : "Start Matching"}
              </Button>
              <Button
                onClick={handleStopMatching}
                disabled={!isMatching}
                variant="secondary"
                className="flex-1"
              >
                Stop Matching
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  );
}

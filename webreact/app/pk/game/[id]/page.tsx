"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/utils/auth";
import { websocketService } from "@/services/websocket";
import { Chat } from "@/components/Chat";
import type { Game, Piece } from "@/types";

interface GameParams {
  id: string;
  [key: string]: string | string[];
}

export default function GamePage() {
  const { id } = useParams<GameParams>();
  const [game, setGame] = useState<Game | null>(null);
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);
  const router = useRouter();
  const { user, token, isLoading } = useAuth();

  useEffect(() => {
    if (token) {
      // Connect to WebSocket if not already connected
      websocketService.connect(token).catch((err) => {
        console.error("WebSocket connection error:", err);
      });

      // Listen for game updates
      websocketService.on("start-matching", (data) => {
        setGame(data.game);
        setPieces(data.game.pieces_list);
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

  const handlePieceClick = (piece: Piece) => {
    // Check if it's the current player's turn
    // For simplicity, we'll just select the piece for now
    setSelectedPiece(piece);
  };

  const handleSquareClick = (x: number, y: number) => {
    if (selectedPiece) {
      // Send move to server
      const nextStep = `${selectedPiece.x},${selectedPiece.y},${x},${y}`;
      websocketService.sendMove(nextStep);
      setSelectedPiece(null);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Chess Game
        </h1>
        <div className="bg-gray-200 w-80 h-80 mx-auto grid grid-cols-8 grid-rows-8">
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 8 }).map((_, col) => {
              const x = col;
              const y = row;
              const isLight = (row + col) % 2 === 0;
              const piece = pieces.find((p) => p.x === x && p.y === y);

              return (
                <div
                  key={`${row}-${col}`}
                  className={`w-10 h-10 flex items-center justify-center ${isLight ? "bg-white" : "bg-gray-400"}`}
                  onClick={() => handleSquareClick(x, y)}
                >
                  {piece && (
                    <div
                      className={`cursor-pointer ${selectedPiece?.id === piece.id ? "ring-2 ring-blue-500" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePieceClick(piece);
                      }}
                    >
                      {/* Render piece image or placeholder */}
                      <span className="text-2xl">
                        {piece.color === "white" ? "♙" : "♟"}
                      </span>
                    </div>
                  )}
                </div>
              );
            }),
          )}
        </div>
      </div>
      <div className="lg:col-span-1">
        <Chat gameId={id || ""} />
      </div>
    </div>
  );
}

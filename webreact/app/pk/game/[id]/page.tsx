"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/utils/auth";
import { websocketService } from "@/services/websocket";
import { Chat } from "@/components/Chat";
import type { Game, Piece } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ClientLayout } from "../../../components/ClientLayout";

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
        toast.error("Failed to connect to game server");
      });

      // Listen for game updates
      const handleGameStart = (data: any) => {
        setGame(data.game);
        setPieces(data.game.pieces_list || []);
        toast.success("Game started!");
      };

      const handleGameUpdate = (data: any) => {
        setGame(data.game);
        setPieces(data.game.pieces_list || []);
      };

      const handleMoveError = (data: any) => {
        toast.error(data.message || "Invalid move");
        setSelectedPiece(null);
      };

      const handleGameEnd = (data: any) => {
        setGame(data.game);
        if (data.game.winner_id === user?.id) {
          toast.success("You won the game!");
        } else if (data.game.winner_id) {
          toast.error("You lost the game.");
        } else {
          toast.info("Game ended in a draw.");
        }
      };

      websocketService.on("game-start", handleGameStart);
      websocketService.on("game-update", handleGameUpdate);
      websocketService.on("move-error", handleMoveError);
      websocketService.on("game-end", handleGameEnd);

      return () => {
        // Clean up WebSocket connection
        websocketService.off("game-start", handleGameStart);
        websocketService.off("game-update", handleGameUpdate);
        websocketService.off("move-error", handleMoveError);
        websocketService.off("game-end", handleGameEnd);
        websocketService.disconnect();
      };
    }
  }, [token, user?.id]);

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

  const getPieceSymbol = (type: string, color: string) => {
    const symbols: Record<string, string> = {
      pawn: color === "white" ? "♙" : "♟",
      rook: color === "white" ? "♖" : "♜",
      knight: color === "white" ? "♘" : "♞",
      bishop: color === "white" ? "♗" : "♝",
      queen: color === "white" ? "♕" : "♛",
      king: color === "white" ? "♔" : "♚",
    };
    return symbols[type] || (color === "white" ? "♙" : "♟");
  };

  const isCurrentPlayerTurn = () => {
    if (!game || !user) return false;
    return game.current_player_id === user.id;
  };

  return (
    <ClientLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center">
                    Chess Game
                  </CardTitle>
                  <div className="flex justify-center gap-4 mt-2">
                    {game && (
                      <>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              isCurrentPlayerTurn() ? "default" : "secondary"
                            }
                          >
                            {isCurrentPlayerTurn()
                              ? "Your Turn"
                              : "Opponent's Turn"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Game ID: {id}</Badge>
                        </div>
                      </>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-200 w-[400px] h-[400px] mx-auto grid grid-cols-8 grid-rows-8 shadow-md">
                    {Array.from({ length: 8 }).map((_, row) =>
                      Array.from({ length: 8 }).map((_, col) => {
                        const x = col;
                        const y = row;
                        const isLight = (row + col) % 2 === 0;
                        const piece = pieces.find(
                          (p) => p.x === x && p.y === y,
                        );
                        const isSelected =
                          selectedPiece?.x === x && selectedPiece?.y === y;

                        return (
                          <div
                            key={`${row}-${col}`}
                            className={`w-full h-full flex items-center justify-center ${isLight ? "bg-white" : "bg-gray-400"} ${isSelected ? "ring-2 ring-blue-500" : ""}`}
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
                                <span className="text-3xl">
                                  {getPieceSymbol(piece.type, piece.color)}
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      }),
                    )}
                  </div>

                  <div className="flex justify-center gap-4 mt-6">
                    <Button
                      variant="secondary"
                      onClick={() => router.push("/pk")}
                    >
                      Exit Game
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-1">
              <Chat gameId={id || ""} />
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}

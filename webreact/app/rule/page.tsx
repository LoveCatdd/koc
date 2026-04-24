"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ClientLayout } from "../components/ClientLayout";

export default function Rule() {
  return (
    <ClientLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">Chess Rules</h1>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Basic Rules</CardTitle>
              <CardDescription>Learn the fundamentals of chess</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Objective</h3>
                  <p>
                    The goal of chess is to checkmate your opponent's king.
                    Checkmate occurs when the king is in a position to be
                    captured (in check) and cannot escape from capture.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Setup</h3>
                  <p>
                    Chess is played on an 8x8 grid. Each player starts with 16
                    pieces: 1 king, 1 queen, 2 rooks, 2 bishops, 2 knights, and
                    8 pawns.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Movement</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <strong>King:</strong> Moves one square in any direction
                    </li>
                    <li>
                      <strong>Queen:</strong> Moves any number of squares in any
                      direction
                    </li>
                    <li>
                      <strong>Rook:</strong> Moves any number of squares
                      horizontally or vertically
                    </li>
                    <li>
                      <strong>Bishop:</strong> Moves any number of squares
                      diagonally
                    </li>
                    <li>
                      <strong>Knight:</strong> Moves in an L-shape (2 squares in
                      one direction, then 1 square perpendicular)
                    </li>
                    <li>
                      <strong>Pawn:</strong> Moves forward one square, or two
                      squares on its first move. Captures diagonally.
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Special Moves</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Castling</h3>
                    <p>
                      A special move that allows the king to move two squares
                      towards a rook, and the rook to move to the square the
                      king crossed.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">En Passant</h3>
                    <p>
                      A special pawn capture that can occur when a pawn moves
                      two squares from its starting position and lands next to
                      an opponent's pawn.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Pawn Promotion
                    </h3>
                    <p>
                      When a pawn reaches the opposite end of the board, it can
                      be promoted to any other piece (usually a queen).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Game End</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Checkmate</h3>
                    <p>
                      The game ends when a player's king is in check and cannot
                      escape. The player who checkmates wins.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Stalemate</h3>
                    <p>
                      A draw occurs when a player has no legal moves but their
                      king is not in check.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Draw</h3>
                    <p>
                      Games can also end in a draw by agreement, insufficient
                      material, or threefold repetition.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Strategy Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Opening</h3>
                  <p>
                    Control the center of the board with your pawns and develop
                    your pieces.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Middle Game</h3>
                  <p>
                    Look for tactical opportunities and plan your attacks.
                    Protect your king by castling early.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Endgame</h3>
                  <p>
                    Coordinate your pieces to checkmate the opponent's king. Use
                    pawn promotion to your advantage.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ClientLayout>
  );
}

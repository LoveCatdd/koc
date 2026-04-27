"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/utils/auth";
import type { Record, Piece } from "@/types";

interface RecordParams {
  id: string;
  [key: string]: string | string[];
}

// Mock function to get record details
const getRecordDetails = async (recordId: number): Promise<Record> => {
  // In a real app, this would be an API call
  return {
    id: recordId,
    a_id: 1,
    b_id: 2,
    a_name: "Player 1",
    b_name: "Player 2",
    a_rating: 1200,
    b_rating: 1100,
    status: "completed",
    create_time: new Date().toISOString(),
    steps: "0,1,1,3;1,0,2,2;0,6,0,4;1,7,1,5;0,2,3,5",
  };
};

export default function RecordDetailPage() {
  const { id } = useParams<RecordParams>();
  const [record, setRecord] = useState<Record | null>(null);
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { isLoading: authLoading } = useAuth();

  useEffect(() => {
    loadRecordDetails();
  }, [id]);

  const loadRecordDetails = async () => {
    if (id) {
      try {
        setIsLoading(true);
        const recordDetails = await getRecordDetails(parseInt(id));
        setRecord(recordDetails);
        // Parse steps
        const parsedSteps = recordDetails.steps.split(";");
        setSteps(parsedSteps);
        // Initialize pieces
        initializePieces();
      } catch (error) {
        console.error("Failed to load record details:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const initializePieces = () => {
    // Initialize chess board with starting positions
    const initialPieces: Piece[] = [
      // White pieces
      { id: 1, type: "rook", color: "white", x: 0, y: 0, direction: 1 },
      { id: 2, type: "knight", color: "white", x: 1, y: 0, direction: 1 },
      { id: 3, type: "bishop", color: "white", x: 2, y: 0, direction: 1 },
      { id: 4, type: "queen", color: "white", x: 3, y: 0, direction: 1 },
      { id: 5, type: "king", color: "white", x: 4, y: 0, direction: 1 },
      { id: 6, type: "bishop", color: "white", x: 5, y: 0, direction: 1 },
      { id: 7, type: "knight", color: "white", x: 6, y: 0, direction: 1 },
      { id: 8, type: "rook", color: "white", x: 7, y: 0, direction: 1 },
      { id: 9, type: "pawn", color: "white", x: 0, y: 1, direction: 1 },
      { id: 10, type: "pawn", color: "white", x: 1, y: 1, direction: 1 },
      { id: 11, type: "pawn", color: "white", x: 2, y: 1, direction: 1 },
      { id: 12, type: "pawn", color: "white", x: 3, y: 1, direction: 1 },
      { id: 13, type: "pawn", color: "white", x: 4, y: 1, direction: 1 },
      { id: 14, type: "pawn", color: "white", x: 5, y: 1, direction: 1 },
      { id: 15, type: "pawn", color: "white", x: 6, y: 1, direction: 1 },
      { id: 16, type: "pawn", color: "white", x: 7, y: 1, direction: 1 },
      // Black pieces
      { id: 17, type: "rook", color: "black", x: 0, y: 7, direction: -1 },
      { id: 18, type: "knight", color: "black", x: 1, y: 7, direction: -1 },
      { id: 19, type: "bishop", color: "black", x: 2, y: 7, direction: -1 },
      { id: 20, type: "queen", color: "black", x: 3, y: 7, direction: -1 },
      { id: 21, type: "king", color: "black", x: 4, y: 7, direction: -1 },
      { id: 22, type: "bishop", color: "black", x: 5, y: 7, direction: -1 },
      { id: 23, type: "knight", color: "black", x: 6, y: 7, direction: -1 },
      { id: 24, type: "rook", color: "black", x: 7, y: 7, direction: -1 },
      { id: 25, type: "pawn", color: "black", x: 0, y: 6, direction: -1 },
      { id: 26, type: "pawn", color: "black", x: 1, y: 6, direction: -1 },
      { id: 27, type: "pawn", color: "black", x: 2, y: 6, direction: -1 },
      { id: 28, type: "pawn", color: "black", x: 3, y: 6, direction: -1 },
      { id: 29, type: "pawn", color: "black", x: 4, y: 6, direction: -1 },
      { id: 30, type: "pawn", color: "black", x: 5, y: 6, direction: -1 },
      { id: 31, type: "pawn", color: "black", x: 6, y: 6, direction: -1 },
      { id: 32, type: "pawn", color: "black", x: 7, y: 6, direction: -1 },
    ];
    setPieces(initialPieces);
  };

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      const step = steps[currentStep];
      const [fromX, fromY, toX, toY] = step.split(",").map(Number);

      // Update pieces
      const updatedPieces = pieces.map((piece) => {
        if (piece.x === fromX && piece.y === fromY) {
          return { ...piece, x: toX, y: toY };
        }
        return piece;
      });

      setPieces(updatedPieces);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      // Reset to initial state and replay steps up to currentStep - 1
      initializePieces();
      setCurrentStep(0);

      // Replay steps
      setTimeout(() => {
        for (let i = 0; i < currentStep - 1; i++) {
          const step = steps[i];
          const [fromX, fromY, toX, toY] = step.split(",").map(Number);

          const updatedPieces = pieces.map((piece) => {
            if (piece.x === fromX && piece.y === fromY) {
              return { ...piece, x: toX, y: toY };
            }
            return piece;
          });

          setPieces(updatedPieces);
        }
        setCurrentStep(currentStep - 1);
      }, 100);
    }
  };

  if (authLoading || isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!record) {
    return <div className="text-center py-8">Record not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Game Record #{record.id}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Game Info */}
        <div>
          <h2 className="text-lg font-medium mb-4">Game Info</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-100 rounded">
                <p className="font-medium">{record.a_name}</p>
                <p className="text-gray-600">Rating: {record.a_rating}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded">
                <p className="font-medium">{record.b_name}</p>
                <p className="text-gray-600">Rating: {record.b_rating}</p>
              </div>
            </div>
            <div className="p-3 bg-gray-100 rounded">
              <p className="font-medium">Date</p>
              <p className="text-gray-600">
                {new Date(record.create_time).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-gray-100 rounded">
              <p className="font-medium">Status</p>
              <p className="text-gray-600">{record.status}</p>
            </div>
          </div>
        </div>

        {/* Chess Board */}
        <div>
          <h2 className="text-lg font-medium mb-4">Replay</h2>
          <div className="bg-gray-200 w-64 h-64 mx-auto grid grid-cols-8 grid-rows-8">
            {Array.from({ length: 8 }).map((_, row) =>
              Array.from({ length: 8 }).map((_, col) => {
                const x = col;
                const y = row;
                const isLight = (row + col) % 2 === 0;
                const piece = pieces.find((p) => p.x === x && p.y === y);

                return (
                  <div
                    key={`${row}-${col}`}
                    className={`w-8 h-8 flex items-center justify-center ${isLight ? "bg-white" : "bg-gray-400"}`}
                  >
                    {piece && (
                      <span
                        className={`text-xl ${piece.color === "white" ? "text-white" : "text-black"}`}
                      >
                        {piece.type === "pawn" &&
                          (piece.color === "white" ? "♙" : "♟")}
                        {piece.type === "rook" &&
                          (piece.color === "white" ? "♖" : "♜")}
                        {piece.type === "knight" &&
                          (piece.color === "white" ? "♘" : "♞")}
                        {piece.type === "bishop" &&
                          (piece.color === "white" ? "♗" : "♝")}
                        {piece.type === "queen" &&
                          (piece.color === "white" ? "♕" : "♛")}
                        {piece.type === "king" &&
                          (piece.color === "white" ? "♔" : "♚")}
                      </span>
                    )}
                  </div>
                );
              }),
            )}
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={handlePreviousStep}
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentStep === 0}
            >
              Previous
            </button>
            <button
              onClick={handleNextStep}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentStep >= steps.length}
            >
              Next
            </button>
          </div>
          <p className="text-center mt-2 text-gray-600">
            Step {currentStep} of {steps.length}
          </p>
        </div>
      </div>
    </div>
  );
}

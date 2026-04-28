"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChessPiece, Step, parseSteps, getInitialPieces, idxToXY } from "@/types";

interface ChessBoardProps {
  pieces: ChessPiece[];
  lastMove?: Step | null;
  size?: number;
}

export function ChessBoard({ pieces, lastMove, size = 400 }: ChessBoardProps) {
  const cellSize = size / 8;

  const getPieceSymbol = (piece: ChessPiece): string => {
    const symbols: Record<string, Record<string, string>> = {
      pawn: { white: "♙", black: "♟" },
      rook: { white: "♖", black: "♜" },
      knight: { white: "♘", black: "♞" },
      bishop: { white: "♗", black: "♝" },
      queen: { white: "♕", black: "♛" },
      king: { white: "♔", black: "♚" },
    };
    return symbols[piece.type]?.[piece.color] || "♙";
  };

  const isLastMoveCell = (x: number, y: number): boolean => {
    if (!lastMove) return false;
    return (
      (lastMove.fromX === x && lastMove.fromY === y) ||
      (lastMove.toX === x && lastMove.toY === y)
    );
  };

  return (
    <div
      className="grid grid-cols-8 grid-rows-8 shadow-md mx-auto"
      style={{ width: size, height: size }}
    >
      {Array.from({ length: 64 }).map((_, idx) => {
        const x = idx % 8;
        const y = Math.floor(idx / 8);
        const isLight = (x + y) % 2 === 0;
        const piece = pieces.find((p) => p.x === x && p.y === y);
        const isHighlighted = isLastMoveCell(x, y);

        return (
          <div
            key={idx}
            className={`flex items-center justify-center relative ${
              isLight ? "bg-[#EEEED2]" : "bg-[#769656]"
            } ${isHighlighted ? "ring-2 ring-yellow-400 ring-inset" : ""}`}
            style={{ width: cellSize, height: cellSize }}
          >
            {piece && (
              <span
                className={`text-2xl sm:text-3xl md:text-4xl ${
                  piece.color === "white"
                    ? "text-white drop-shadow-[0_0_1px_rgba(0,0,0,1)]"
                    : "text-black"
                }`}
              >
                {getPieceSymbol(piece)}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

interface ChessBoardWithControlsProps {
  steps: Step[];
  initialPieces?: ChessPiece[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function ChessBoardWithControls({
  steps,
  initialPieces,
  autoPlay = false,
  autoPlayInterval = 1000,
}: ChessBoardWithControlsProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [pieces, setPieces] = useState<ChessPiece[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastMove, setLastMove] = useState<Step | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const stepsRef = useRef(steps);
  const initialPiecesRef = useRef(initialPieces);

  useEffect(() => {
    stepsRef.current = steps;
  }, [steps]);

  useEffect(() => {
    initialPiecesRef.current = initialPieces;
  }, [initialPieces]);

  const getInitial = useCallback(() => {
    return initialPiecesRef.current || getInitialPieces();
  }, []);

  useEffect(() => {
    setPieces(getInitial());
  }, [getInitial]);

  useEffect(() => {
    if (autoPlay) {
      setIsPlaying(true);
    }
  }, [autoPlay]);

  useEffect(() => {
    if (isPlaying && currentStep < stepsRef.current.length) {
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= stepsRef.current.length) {
            setIsPlaying(false);
            return prev;
          }

          const step = stepsRef.current[prev];
          const currentPieces = getInitial().map((piece) => {
            for (let i = 0; i <= prev; i++) {
              const s = stepsRef.current[i];
              if (piece.x === s.fromX && piece.y === s.fromY) {
                return { ...piece, x: s.toX, y: s.toY };
              }
              if (piece.x === s.toX && piece.y === s.toY && piece.id !== 0) {
                const fromPiece = getInitial().find(
                  (p) => p.x === s.fromX && p.y === s.fromY
                );
                if (fromPiece && fromPiece.id === piece.id) {
                  return piece;
                }
                return { ...piece, id: 0, type: "pawn", x: -1, y: -1 } as ChessPiece;
              }
            }
            return piece;
          });

          setPieces(currentPieces.filter((p) => p.id !== 0));
          setLastMove(step);

          return prev + 1;
        });
      }, autoPlayInterval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    } else if (currentStep >= stepsRef.current.length) {
      setIsPlaying(false);
    }
  }, [isPlaying, autoPlayInterval, getInitial]);

  const handleStep = useCallback(
    (step: number) => {
      if (step < 0 || step > stepsRef.current.length) return;

      const newPieces = getInitial().map((piece) => {
        for (let i = 0; i < step; i++) {
          const s = stepsRef.current[i];
          if (piece.x === s.fromX && piece.y === s.fromY) {
            return { ...piece, x: s.toX, y: s.toY };
          }
        }
        return piece;
      });

      setPieces(newPieces);
      setCurrentStep(step);
      setLastMove(step > 0 ? stepsRef.current[step - 1] : null);
    },
    [getInitial]
  );

  const handlePrevious = useCallback(() => {
    handleStep(currentStep - 1);
  }, [currentStep, handleStep]);

  const handleNext = useCallback(() => {
    handleStep(currentStep + 1);
  }, [currentStep, handleStep]);

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (currentStep >= stepsRef.current.length) {
        handleStep(0);
      }
      setIsPlaying(true);
    }
  }, [isPlaying, currentStep, handleStep]);

  const handleReset = useCallback(() => {
    setIsPlaying(false);
    handleStep(0);
  }, [handleStep]);

  const getStepDescription = (step: Step): string => {
    const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const from = `${cols[step.fromX]}${8 - step.fromY}`;
    const to = `${cols[step.toX]}${8 - step.toY}`;
    return `${from} → ${to}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">棋谱回放</CardTitle>
        <div className="flex justify-center gap-2 flex-wrap">
          <Badge variant="secondary">
            第 {currentStep} / {steps.length} 步
          </Badge>
          {lastMove && (
            <Badge variant="outline">{getStepDescription(lastMove)}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ChessBoard pieces={pieces} lastMove={lastMove} />

        <div className="flex justify-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={handleReset}>
            重置
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrevious} disabled={currentStep === 0}>
            上一步
          </Button>
          <Button
            variant={isPlaying ? "secondary" : "default"}
            size="sm"
            onClick={handlePlayPause}
            disabled={currentStep >= steps.length && !isPlaying}
          >
            {isPlaying ? "暂停" : "播放"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentStep >= steps.length}
          >
            下一步
          </Button>
        </div>

        {steps.length > 0 && (
          <div className="max-h-48 overflow-y-auto border rounded p-2">
            <div className="grid grid-cols-2 gap-1 text-xs">
              {steps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => handleStep(idx + 1)}
                  className={`text-left px-2 py-1 rounded hover:bg-gray-100 ${
                    idx === currentStep - 1
                      ? "bg-blue-100 text-blue-800"
                      : "text-gray-600"
                  }`}
                >
                  {idx + 1}. {getStepDescription(step)}
                </button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface GameRecordInfoProps {
  record: {
    id: number;
    a_name: string;
    b_name: string;
    a_rating: number;
    b_rating: number;
    status: string;
    create_time: string;
  };
  currentStep: number;
  totalSteps: number;
}

export function GameRecordInfo({
  record,
  currentStep,
  totalSteps,
}: GameRecordInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">对局信息</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="font-medium text-blue-900">{record.a_name}</p>
            <p className="text-sm text-blue-600">评分: {record.a_rating}</p>
            <Badge className="mt-1 bg-blue-200 text-blue-800">白方</Badge>
          </div>
          <div className="p-3 bg-gray-100 rounded-lg border border-gray-200">
            <p className="font-medium">{record.b_name}</p>
            <p className="text-sm text-gray-600">评分: {record.b_rating}</p>
            <Badge className="mt-1 bg-gray-300 text-gray-800">黑方</Badge>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">对局ID</span>
            <span className="font-medium">#{record.id}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">状态</span>
            <Badge
              variant={record.status === "completed" ? "default" : "secondary"}
            >
              {record.status === "completed" ? "已完成" : record.status}
            </Badge>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">日期</span>
            <span className="text-gray-800">
              {new Date(record.create_time).toLocaleString("zh-CN")}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

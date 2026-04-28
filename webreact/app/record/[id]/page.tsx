"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/utils/auth";
import { getRecordDetail } from "@/services/api";
import { Record, Step, parseSteps, getInitialPieces, ChessPiece } from "@/types";
import { ChessBoardWithControls, GameRecordInfo } from "@/components/ChessBoard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface RecordParams {
  id: string;
  [key: string]: string | string[];
}

export default function RecordDetailPage() {
  const { id } = useParams<RecordParams>();
  const [record, setRecord] = useState<Record | null>(null);
  const [steps, setSteps] = useState<Step[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const { isLoading: authLoading } = useAuth();

  useEffect(() => {
    loadRecordDetails();
  }, [id]);

  const loadRecordDetails = async () => {
    if (id) {
      try {
        setIsLoading(true);
        const recordDetails = await getRecordDetail(parseInt(id));
        setRecord(recordDetails);

        const parsedSteps = parseSteps(recordDetails.steps);
        setSteps(parsedSteps);
      } catch (error) {
        console.error("Failed to load record details:", error);
        toast.error("加载棋谱详情失败");
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-gray-600 mb-4">未找到该棋谱记录</p>
            <Button onClick={() => router.push("/record")}>返回棋谱列表</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const initialPieces = getInitialPieces();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => router.push("/record")}>
            ← 返回棋谱列表
          </Button>
          <Badge variant="outline" className="text-lg px-4 py-1">
            棋谱 #{record.id}
          </Badge>
          <div className="w-[100px]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChessBoardWithControls
              steps={steps}
              initialPieces={initialPieces}
            />
          </div>

          <div className="space-y-6">
            <GameRecordInfo
              record={record}
              currentStep={currentStep}
              totalSteps={steps.length}
            />

            {steps.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">走棋记录</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
                    {steps.map((step, idx) => (
                      <div
                        key={idx}
                        className={`text-sm p-2 rounded ${
                          idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        <span className="text-gray-500">{idx + 1}.</span>{" "}
                        {String.fromCharCode(97 + step.fromX)}
                        {8 - step.fromY} → {String.fromCharCode(97 + step.toX)}
                        {8 - step.toY}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

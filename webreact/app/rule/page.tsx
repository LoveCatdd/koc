"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Rule() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">国际象棋规则</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>基本规则</CardTitle>
            <CardDescription>学习国际象棋的基础知识</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">目标</h3>
                <p>
                  国际象棋的目标是将死对方的国王。当国王处于被攻击的位置（将军）且无法逃脱时，即被将死。
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">设置</h3>
                <p>
                  国际象棋在8x8的棋盘上进行。每位玩家开始时有16个棋子：1个国王、1个皇后、2个车、2个象、2个马和8个兵。
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">移动规则</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>国王：</strong>可以向任意方向移动一格
                  </li>
                  <li>
                    <strong>皇后：</strong>可以向任意方向移动任意格数
                  </li>
                  <li>
                    <strong>车：</strong>可以横向或纵向移动任意格数
                  </li>
                  <li>
                    <strong>象：</strong>可以斜向移动任意格数
                  </li>
                  <li>
                    <strong>马：</strong>走L形（先向一个方向走2格，再垂直走1格）
                  </li>
                  <li>
                    <strong>兵：</strong>
                    向前移动一格，首次移动可以走两格。吃子时斜向前进。
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>特殊走法</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">王车易位</h3>
                  <p>
                    一种特殊走法，允许国王向车的方向移动两格，车则移动到国王跳过的格子上。
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">吃过路兵</h3>
                  <p>
                    当一个兵从初始位置走两格，并且落在对方兵的旁边时，对方可以选择斜向吃掉这个兵。
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">兵升变</h3>
                  <p>
                    当兵到达棋盘的另一端时，可以升变为任何其他棋子（通常升变为皇后）。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>游戏结束</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">将死</h3>
                  <p>
                    当一方的国王被将军且无法逃脱时，游戏结束。将死对方的玩家获胜。
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">无子可动</h3>
                  <p>当一方没有合法的走法但国王并未被将军时，游戏为平局。</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">平局</h3>
                  <p>
                    游戏也可以通过双方协议、无子可动、重复局面三次等方式平局。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>策略提示</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">开局</h3>
                <p>用兵控制棋盘中心，发展你的棋子。</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">中局</h3>
                <p>寻找战术机会，规划进攻。尽早进行王车易位保护你的国王。</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">残局</h3>
                <p>协调你的棋子将死对方的国王。利用兵升变来获得优势。</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

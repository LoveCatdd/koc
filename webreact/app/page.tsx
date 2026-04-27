"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/utils/auth";
import { getRecordList } from "@/services/api";

export default function Home() {
  const { user, isLoading: authLoading } = useAuth();
  const [recentGames, setRecentGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadRecentGames();
    } else {
      setLoading(false);
    }
  }, [user, authLoading]);

  const loadRecentGames = async () => {
    try {
      if (user) {
        const games = await getRecordList(user.id);
        setRecentGames(games || []);
      }
    } catch (error) {
      console.error("Failed to load recent games:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              欢迎来到国际象棋
            </CardTitle>
            <CardDescription className="text-center">
              请登录以继续
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Button
                className="w-full"
                onClick={() => (window.location.href = "/login")}
              >
                登录
              </Button>
              <Button
                className="w-full"
                variant="secondary"
                onClick={() => (window.location.href = "/register")}
              >
                注册
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto p-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            欢迎回来, {user?.username}!
          </h1>
          <p className="text-gray-600">
            您的评分: <Badge variant="secondary">{user?.rating || 1500}</Badge>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>开始游戏</CardTitle>
              <CardDescription>开始新对局</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">挑战其他玩家并提升您的评分。</p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => (window.location.href = "/pk")}
                className="w-full"
              >
                寻找对手
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>查看排行榜</CardTitle>
              <CardDescription>查看顶尖玩家</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">查看排行榜，看看您的排名。</p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => (window.location.href = "/ranklist")}
                className="w-full"
              >
                排行榜
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>我的好友</CardTitle>
              <CardDescription>管理好友</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">添加好友并邀请他们对战。</p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => (window.location.href = "/friends")}
                className="w-full"
              >
                好友列表
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">最近对局</h2>
          {recentGames.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {recentGames.map((game) => (
                <Card key={game.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">对局 #{game.id}</CardTitle>
                      <Badge
                        variant={
                          game.winner === user?.id ? "default" : "destructive"
                        }
                      >
                        {game.winner === user?.id ? "胜利" : "失败"}
                      </Badge>
                    </div>
                    <CardDescription>
                      {new Date(game.created_at).toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">
                          对手: {game.opponent_username}
                        </p>
                        <p className="text-sm text-gray-600">
                          评分: {game.opponent_rating}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() =>
                          (window.location.href = `/record/${game.id}`)
                        }
                      >
                        查看回放
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-600">暂无最近对局。</p>
                <Button
                  className="mt-4"
                  onClick={() => (window.location.href = "/pk")}
                >
                  开始对战
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>游戏规则</CardTitle>
              <CardDescription>学习如何下棋</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                复习国际象棋规则，提升您的棋艺。
              </p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => (window.location.href = "/rule")}
                className="w-full"
              >
                查看规则
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>用户资料</CardTitle>
              <CardDescription>您的账户信息</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">查看和编辑您的个人资料设置。</p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => (window.location.href = "/user-info")}
                className="w-full"
              >
                个人资料
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

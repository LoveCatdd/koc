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
import { ClientLayout } from "./components/ClientLayout";

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
      <ClientLayout>
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Welcome to Chess Game
              </CardTitle>
              <CardDescription className="text-center">
                Please log in to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Button
                  className="w-full"
                  onClick={() => (window.location.href = "/login")}
                >
                  Login
                </Button>
                <Button
                  className="w-full"
                  variant="secondary"
                  onClick={() => (window.location.href = "/register")}
                >
                  Register
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </ClientLayout>
    );
  }

  if (loading) {
    return (
      <ClientLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p>Loading...</p>
          </div>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto p-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Welcome, {user?.username}!
            </h1>
            <p className="text-gray-600">
              Your rating:{" "}
              <Badge variant="secondary">{user?.rating || 1500}</Badge>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Play Game</CardTitle>
                <CardDescription>Start a new match</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Challenge other players and improve your rating.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => (window.location.href = "/pk")}
                  className="w-full"
                >
                  Find Match
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>View Rankings</CardTitle>
                <CardDescription>See top players</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Check the leaderboard and see how you rank.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => (window.location.href = "/ranklist")}
                  className="w-full"
                >
                  Rank List
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Friends</CardTitle>
                <CardDescription>Manage your friends</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Add friends and challenge them to games.</p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => (window.location.href = "/friends")}
                  className="w-full"
                >
                  Friends List
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Recent Games</h2>
            {recentGames.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {recentGames.map((game) => (
                  <Card key={game.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">
                          Game #{game.id}
                        </CardTitle>
                        <Badge
                          variant={
                            game.winner === user?.id ? "default" : "destructive"
                          }
                        >
                          {game.winner === user?.id ? "Won" : "Lost"}
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
                            Opponent: {game.opponent_username}
                          </p>
                          <p className="text-sm text-gray-600">
                            Rating: {game.opponent_rating}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() =>
                            (window.location.href = `/record/${game.id}`)
                          }
                        >
                          View Replay
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-600">No recent games found.</p>
                  <Button
                    className="mt-4"
                    onClick={() => (window.location.href = "/pk")}
                  >
                    Play Now
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Game Rules</CardTitle>
                <CardDescription>Learn how to play</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Brush up on the rules of chess and improve your game.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => (window.location.href = "/rule")}
                  className="w-full"
                >
                  View Rules
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Profile</CardTitle>
                <CardDescription>Your account information</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">View and edit your profile settings.</p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => (window.location.href = "/user-info")}
                  className="w-full"
                >
                  Profile
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}

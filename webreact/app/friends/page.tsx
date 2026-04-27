"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/auth";
import { getFriends, addFriend, deleteFriend } from "@/services/api";
import type { Friend } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function FriendsPage() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [searchId, setSearchId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (user) {
      loadFriends();
    }
  }, [user]);

  const loadFriends = async () => {
    if (user) {
      try {
        setIsLoading(true);
        const friendsList = await getFriends(user.id);
        setFriends(friendsList);
      } catch (error) {
        console.error("Failed to load friends:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAddFriend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setIsLoading(true);
      const friendId = parseInt(searchId);
      await addFriend(user.id, friendId);
      toast.success("Friend added successfully!");
      setSearchId("");
      loadFriends();
    } catch (error) {
      toast.error("Failed to add friend. Please check the user ID.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteFriend = async (friendId: number) => {
    if (!user) return;

    try {
      setIsLoading(true);
      await deleteFriend(user.id, friendId);
      toast.success("Friend removed successfully!");
      loadFriends();
    } catch (error) {
      console.error("Failed to delete friend:", error);
      toast.error("Failed to remove friend");
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Friends</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add Friend</CardTitle>
            <CardDescription>
              Enter user ID to send a friend request
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddFriend} className="flex gap-2">
              <Input
                type="number"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter User ID"
                className="flex-1"
                required
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Adding..." : "Add Friend"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Friends</CardTitle>
            <CardDescription>Manage your friends list</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-4">Loading friends...</div>
            ) : friends.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No friends yet. Add some!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {friends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center justify-between p-3 border rounded-md"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        {friend.friend_photo ? (
                          <img
                            src={friend.friend_photo}
                            alt={friend.friend_name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-500">
                            {friend.friend_name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{friend.friend_name}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-gray-600">
                            Rating: {friend.friend_rating}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteFriend(friend.friend_id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

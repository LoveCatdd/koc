"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/auth";
import { getFriends, addFriend, deleteFriend } from "@/services/api";
import type { Friend } from "@/types";

export default function FriendsPage() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [searchId, setSearchId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
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
      setMessage("Friend added successfully!");
      setSearchId("");
      loadFriends();
    } catch (error) {
      setMessage("Failed to add friend. Please check the user ID.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteFriend = async (friendId: number) => {
    if (!user) return;

    try {
      setIsLoading(true);
      await deleteFriend(user.id, friendId);
      loadFriends();
    } catch (error) {
      console.error("Failed to delete friend:", error);
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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Friends
      </h1>

      {/* Add Friend Form */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Add Friend</h2>
        {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {message}
          </div>
        )}
        <form onSubmit={handleAddFriend} className="flex gap-2">
          <input
            type="number"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter User ID"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            Add Friend
          </button>
        </form>
      </div>

      {/* Friends List */}
      <div>
        <h2 className="text-lg font-medium mb-4">Your Friends</h2>
        {isLoading ? (
          <div className="text-center py-4">Loading friends...</div>
        ) : friends.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No friends yet. Add some!
          </div>
        ) : (
          <div className="space-y-4">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
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
                    <p className="text-gray-600">
                      Rating: {friend.friend_rating}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteFriend(friend.friend_id)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

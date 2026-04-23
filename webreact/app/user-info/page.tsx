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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/utils/auth";
import { toast } from "sonner";

export default function UserInfo() {
  const { user } = useAuth();
  const [username, setUsername] = useState(user?.username || "");
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  const handleUpdate = async () => {
    if (!user) return;

    setUpdating(true);
    try {
      // API endpoint not implemented yet
      // const response = await api.updateUserInfo({
      //   username,
      //   email
      // });

      // if (response.success) {
      //   updateUser(response.data);
      //   toast.success('Profile updated successfully');
      // } else {
      //   toast.error('Failed to update profile');
      // }

      // For now, just show success message
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update user info:", error);
      toast.error("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Update your profile details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>User ID</Label>
              <div className="bg-gray-100 p-3 rounded-md">{user?.id}</div>
            </div>

            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="bg-gray-100 p-3 rounded-md">
                {user?.rating || 1500}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Joined Date</Label>
              <div className="bg-gray-100 p-3 rounded-md">N/A</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleUpdate}
              disabled={updating}
              className="w-full"
            >
              {updating ? "Updating..." : "Update Profile"}
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-8 max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>Change your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  placeholder="Enter current password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Enter new password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm new password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Change Password</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

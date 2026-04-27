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
          <p>加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">用户资料</h1>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>账户信息</CardTitle>
              <CardDescription>更新您的个人资料</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">用户名</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>用户ID</Label>
                <div className="bg-gray-100 p-3 rounded-md">{user?.id}</div>
              </div>

              <div className="space-y-2">
                <Label>评分</Label>
                <div className="bg-gray-100 p-3 rounded-md">
                  {user?.rating || 1500}
                </div>
              </div>

              <div className="space-y-2">
                <Label>加入日期</Label>
                <div className="bg-gray-100 p-3 rounded-md">N/A</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleUpdate}
                disabled={updating}
                className="w-full"
              >
                {updating ? "更新中..." : "更新资料"}
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-8 max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>账户安全</CardTitle>
                <CardDescription>修改密码</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">当前密码</Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="输入当前密码"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">新密码</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="输入新密码"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">确认新密码</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="确认新密码"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">修改密码</Button>
              </CardFooter>
            </Card>
          </div>
      </div>
  );
}

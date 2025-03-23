import type React from "react";

import { useEffect, useState } from "react";
import { useAuth } from "~/lib/auth-context";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router";
import { Spinner } from "~/layouts/spinner";

export default function SignInMain() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!authLoading) {
      if (user) {
        if (user.role === "admin") {
          if (location.pathname === "/answers") {
            navigate("/answers");
          } else {
            navigate("/questions");
          }
        } else {
          navigate("/answers");
        }
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        toast.success("Login successful", {
          description: "You have been logged in successfully.",
        });
        setUsername("");
        setPassword("");
      } else {
        toast.error("Login failed", {
          description: "Invalid username or password.",
        });
      }
    } catch (error) {
      toast.error("Login Error", {
        description: "An error occurred during login.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || user)
    return (
      <div className="min-h-[calc(100vh-40px)] flex items-center justify-center">
        <span className="animate-spin">
          <Spinner />
        </span>
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-40px)] bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <img width="100%" src="/images/quiz-app-logo.png" alt="Logo" />
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to access the quiz app
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* Demo credentials*/}
            <div className="text-sm text-gray-500">
              <p>Demo credentials:</p>
              <p>Admin: username: admin, password: admin123</p>
              <p>User: username: user, password: user123</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full mt-6 cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

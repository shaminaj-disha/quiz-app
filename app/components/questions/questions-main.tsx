import { useEffect } from "react";
import { useAuth } from "~/lib/auth-context";
import { DataProvider } from "~/lib/data-context";
import { useNavigate } from "react-router";
import { QuestionsContent } from "./questions-content";

export default function QuestionsMain() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not logged in or not an admin
    if (!user) {
      navigate("/");
    } else if (user.role !== "admin") {
      navigate("/answers");
    }
  }, [user, navigate]);

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <DataProvider>
      <div className="min-h-[calc(100vh-120px)] bg-gray-50">
        <QuestionsContent />
      </div>
    </DataProvider>
  );
}

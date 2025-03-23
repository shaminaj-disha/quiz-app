import { useEffect } from "react";
import { useAuth } from "~/lib/auth-context";
import { DataProvider } from "~/lib/data-context";
import { useNavigate } from "react-router";
import { QuestionsContent } from "./questions-content";
import { Spinner } from "~/layouts/spinner";

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
    return (
      <div className="min-h-[calc(100vh-40px)] flex items-center justify-center">
        <span className="animate-spin">
          <Spinner />
        </span>
      </div>
    );
  }

  return (
    <DataProvider>
      <div className="min-h-[calc(100vh-120px)] bg-gray-50">
        <QuestionsContent />
      </div>
    </DataProvider>
  );
}

import { useEffect } from "react";
import { useAuth } from "~/lib/auth-context";
import { DataProvider } from "~/lib/data-context";
import { useNavigate } from "react-router";
import { AnswersContent } from "./answers-content";

export default function AnswersPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <DataProvider>
      <div className="min-h-[calc(100vh-120px)] bg-gray-50">
        <AnswersContent />
      </div>
    </DataProvider>
  );
}

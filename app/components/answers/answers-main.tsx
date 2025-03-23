import { useEffect } from "react";
import { useAuth } from "~/lib/auth-context";
import { DataProvider } from "~/lib/data-context";
import { useNavigate } from "react-router";
import { AnswersContent } from "./answers-content";
import { Spinner } from "~/layouts/spinner";

export default function AnswersMain() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) {
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
        <AnswersContent />
      </div>
    </DataProvider>
  );
}

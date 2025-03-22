import { useAuth } from "~/lib/auth-context";
import { useData } from "~/lib/data-context";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { toast } from "sonner";
import { QuestionItem } from "./question-item";

export function AnswersContent() {
  const { user } = useAuth();
  const { questions, answers, addAnswer, getUserAnswers } = useData();
  const isAdmin = user?.role === "admin";
  const userAnswers = user ? getUserAnswers(user.id) : [];

  const handleAnswerSubmit = (questionId: string, text: string) => {
    if (user) {
      addAnswer(questionId, user.id, text);
      toast.success("Answer submitted");
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>
            {isAdmin ? "View All Answers" : "Answer Questions"}
          </CardTitle>
          <CardDescription>
            {isAdmin
              ? "Review all user answers to questions"
              : "Answer the questions below or edit your existing answers"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isAdmin ? (
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger className="cursor-pointer" value="all">
                  All Questions
                </TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="answered">
                  With Answers
                </TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="unanswered">
                  Without Answers
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                {questions.map((question) => (
                  <QuestionItem
                    key={question.id}
                    question={question}
                    userAnswers={userAnswers}
                    isAdmin={isAdmin}
                    onAnswerSubmit={handleAnswerSubmit}
                  />
                ))}
              </TabsContent>
              <TabsContent value="answered">
                {questions
                  .filter((q) => answers.some((a) => a.questionId === q.id))
                  .map((question) => (
                    <QuestionItem
                      key={question.id}
                      question={question}
                      userAnswers={userAnswers}
                      isAdmin={isAdmin}
                      onAnswerSubmit={handleAnswerSubmit}
                    />
                  ))}
              </TabsContent>
              <TabsContent value="unanswered">
                {questions
                  .filter((q) => !answers.some((a) => a.questionId === q.id))
                  .map((question) => (
                    <QuestionItem
                      key={question.id}
                      question={question}
                      userAnswers={userAnswers}
                      isAdmin={isAdmin}
                      onAnswerSubmit={handleAnswerSubmit}
                    />
                  ))}
              </TabsContent>
            </Tabs>
          ) : (
            <div>
              {questions.length === 0 ? (
                <p className="text-center text-gray-500 py-4">
                  No questions available.
                </p>
              ) : (
                questions.map((question) => (
                  <QuestionItem
                    key={question.id}
                    question={question}
                    userAnswers={userAnswers}
                    isAdmin={isAdmin}
                    onAnswerSubmit={handleAnswerSubmit}
                  />
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

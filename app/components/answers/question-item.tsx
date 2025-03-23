import { useState, useEffect } from "react";
import { useData, type Question, type Answer } from "~/lib/data-context";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import { Pencil } from "lucide-react";
import { AnswerHistory } from "./answer-history";

export function QuestionItem({
  question,
  userAnswers,
  isAdmin,
  onAnswerSubmit,
}: {
  question: Question;
  userAnswers: Answer[];
  isAdmin: boolean;
  onAnswerSubmit: (questionId: string, text: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [answerText, setAnswerText] = useState("");
  const { getQuestionAnswers } = useData();
  const allAnswers = getQuestionAnswers(question.id);
  const userAnswer = userAnswers.find((ans) => ans.questionId === question.id);

  useEffect(() => {
    if (userAnswer) {
      setAnswerText(userAnswer.text);
    }
  }, [userAnswer]);

  const handleSubmit = () => {
    if (answerText.trim()) {
      onAnswerSubmit(question.id, answerText.trim());
      setIsEditing(false);
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{question.text}</CardTitle>
        <CardDescription>
          Created: {new Date(question.createdAt).toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isAdmin ? (
          // Admin view - see all answers
          <div className="space-y-4">
            <h3 className="font-medium">All Answers:</h3>
            {allAnswers.length === 0 ? (
              <p className="text-gray-500">No answers yet.</p>
            ) : (
              allAnswers.map((answer) => (
                <div key={answer.id} className="border rounded-md p-3">
                  <div className="flex gap-3 flex-wrap justify-between items-start mb-2">
                    <p className="text-sm font-medium">
                      User ID: {answer.userId}
                    </p>
                    <AnswerHistory answer={answer} />
                  </div>
                  <p>{answer.text}</p>
                </div>
              ))
            )}
          </div>
        ) : (
          // User view - answer the question
          <div>
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-3">
                <Textarea
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  placeholder="Type your answer here..."
                  rows={4}
                  required
                />
                <div className="flex justify-end gap-2">
                  <Button
                    className="cursor-pointer"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="cursor-pointer">
                    {userAnswer ? "Update Answer" : "Submit Answer"}
                  </Button>
                </div>
              </form>
            ) : (
              <div>
                {userAnswer ? (
                  <div className="space-y-3">
                    <div className="flex justify-between items-start flex-wrap-reverse gap-4">
                      <p className="font-medium">Your Answer:</p>
                      <div className="flex gap-2">
                        <AnswerHistory answer={userAnswer} />
                        <Button
                          className="cursor-pointer"
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditing(true)}
                        >
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>
                    <p>{userAnswer.text}</p>
                  </div>
                ) : (
                  <Button
                    className="cursor-pointer"
                    onClick={() => setIsEditing(true)}
                  >
                    Answer This Question
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

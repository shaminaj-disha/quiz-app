import type React from "react";
import { useState } from "react";
import { useData } from "~/lib/data-context";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

export function QuestionsContent() {
  const { questions, addQuestion, updateQuestion, deleteQuestion } = useData();
  const [newQuestion, setNewQuestion] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      addQuestion(newQuestion.trim());
      setNewQuestion("");
      toast.success("Question added");
    }
  };

  const handleEditStart = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleEditSave = (id: string) => {
    if (editText.trim()) {
      updateQuestion(id, editText.trim());
      setEditingId(null);
      toast.success("Question updated");
    }
  };

  const handleDelete = (id: string) => {
    if (
      confirm(
        "Are you sure you want to delete this question? All associated answers will also be deleted."
      )
    ) {
      deleteQuestion(id);
      toast.success("Question deleted");
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Manage Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleAddQuestion}
            className="flex flex-col gap-3 sm:flex-row sm:gap-2 mb-6"
          >
            <Input
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Enter a new question"
              className="flex-1 min-h-9"
            />
            <Button type="submit" className="cursor-pointer">
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </form>

          <div className="space-y-4">
            {questions.length === 0 ? (
              <p className="text-center text-gray-500 py-4">
                No questions yet. Add your first question above.
              </p>
            ) : (
              questions.map((question) => (
                <Card key={question.id} className="p-4">
                  {editingId === question.id ? (
                    <div className="flex gap-2 flex-col sm:flex-row">
                      <Input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-1"
                      />
                      <div className="flex gap-2">
                        <Button
                          className="cursor-pointer"
                          onClick={() => handleEditSave(question.id)}
                        >
                          Save
                        </Button>
                        <Button
                          className="cursor-pointer"
                          variant="outline"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <p className="font-medium">{question.text}</p>
                        <p className="text-xs text-gray-500">
                          Created:{" "}
                          {new Date(question.createdAt).toLocaleString()}
                          {question.updatedAt !== question.createdAt &&
                            ` • Updated: ${new Date(
                              question.updatedAt
                            ).toLocaleString()}`}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          className="cursor-pointer"
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleEditStart(question.id, question.text)
                          }
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          className="cursor-pointer"
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(question.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

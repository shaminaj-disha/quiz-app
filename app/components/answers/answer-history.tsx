import { type Answer } from "~/lib/data-context";
import { Button } from "~/components/ui/button";
import { History } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export function AnswerHistory({ answer }: { answer: Answer }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" variant="outline" size="sm">
          <History className="h-4 w-4 mr-2" />
          View History
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Answer History</DialogTitle>
          <DialogDescription>
            Previous versions of this answer
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {answer.history.map((item, index) => (
            <div key={index} className="border rounded-md p-3">
              <p className="text-sm text-gray-500 mb-1">
                {new Date(item.timestamp).toLocaleString()}
              </p>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

import type { Route } from "./+types/answers";
import AnswersMain from "~/components/answers/answers-main";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Quiz App | Answers" },
    { name: "description", content: "Welcome to Qiz App!" },
  ];
}

export default function Answers() {
  return <AnswersMain />;
}

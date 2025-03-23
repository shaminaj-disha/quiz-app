import type { Route } from "./+types/questions";
import QuestionsMain from "~/components/questions/questions-main";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Quiz App | Questions" },
    { name: "description", content: "Welcome to Qiz App!" },
  ];
}

export default function Questions() {
  return <QuestionsMain />;
}

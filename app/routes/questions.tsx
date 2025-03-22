import QuestionsPage from "~/components/pages/questions/questions-main";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Questions" },
    { name: "description", content: "Welcome to Qiz App!" },
  ];
}

export default function Questions() {
  return <QuestionsPage />;
}

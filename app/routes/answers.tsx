import type { Route } from "./+types/home";
import AnswersPage from "~/components/pages/answers/answers-main";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Answers" },
    { name: "description", content: "Welcome to Qiz App!" },
  ];
}

export default function Answers() {
  return <AnswersPage />;
}

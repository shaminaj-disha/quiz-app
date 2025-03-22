import type { Route } from "./+types/home";
import SignInPage from "~/components/pages/signin/signin-main";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Quiz App" },
    { name: "description", content: "Welcome to Qiz App!" },
  ];
}

export default function Home() {
  return <SignInPage />;
}

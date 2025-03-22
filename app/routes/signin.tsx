import type { Route } from "./+types/home";
import SignInPage from "~/components/signin/signin-main";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Quiz App" },
    { name: "description", content: "Welcome to Qiz App!" },
  ];
}

export default function SignIn() {
  return <SignInPage />;
}

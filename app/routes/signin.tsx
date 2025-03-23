import type { Route } from "./+types/signin";
import SignInMain from "~/components/signin/sign-in-main";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Quiz App" },
    { name: "description", content: "Welcome to Qiz App!" },
  ];
}

export default function SignIn() {
  return <SignInMain />;
}

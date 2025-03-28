import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/signin.tsx"),
  route("questions", "routes/questions.tsx"),
  route("answers", "routes/answers.tsx"),
] satisfies RouteConfig;

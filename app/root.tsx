import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from "react-router";
import type { Route } from "./+types/root";
import "./app.css";
import { AuthProvider, useAuth } from "./lib/auth-context";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { Navbar } from "./layouts/navbar";
import { Footer } from "./layouts/footer";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/questions");
      } else {
        navigate("/answers");
      }
    } else {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <>
      {user ? <Navbar /> : null}
      <Outlet />
      <Footer />
    </>
  );
}

// Requested page not found
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="p-4 container mx-auto flex justify-center items-center flex-col gap-2 min-h-screen">
      <h1 className="text-4xl">{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

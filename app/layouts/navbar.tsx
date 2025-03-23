import { useAuth } from "~/lib/auth-context";
import { Button } from "~/components/ui/button";
import { NavLink, useNavigate } from "react-router";
import { CircleUser, EllipsisVertical } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { useEffect, useState } from "react";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSheetOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <nav className="bg-white border-b px-4 py-2 flex items-center justify-between z-50 sticky top-0 left-0 w-full min-h-[80px]">
      {/* Small Screens: Left Section - Logo */}
      <div className="lg:hidden flex items-center">
        <img width={150} src="/images/quiz-app-logo.png" alt="Logo" />
      </div>

      {/* Large Screens: Show Full Navbar */}
      <div className="hidden lg:flex items-center justify-between w-full">
        <div className="flex items-center space-x-4">
          <img width={150} src="/images/quiz-app-logo.png" alt="Logo" />
          <div className="flex space-x-2">
            {user.role === "admin" && (
              <NavLink to="/questions">
                {({ isActive }) => (
                  <Button
                    className="cursor-pointer"
                    variant={isActive ? "default" : "ghost"}
                  >
                    Questions
                  </Button>
                )}
              </NavLink>
            )}
            <NavLink to="/answers">
              {({ isActive }) => (
                <Button
                  className="cursor-pointer"
                  variant={isActive ? "default" : "ghost"}
                >
                  Answers
                </Button>
              )}
            </NavLink>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 flex items-center gap-1">
            <CircleUser className="h-6 w-6 mr-1" />
            {/* Logged in as*/}
            <span className="font-medium capitalize">{user.username}</span>{" "}
            <span className="capitalize">({user.role})</span>
          </span>
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Small Screens: Menu Button */}
      <div className="lg:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <EllipsisVertical className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <img width={150} src="/images/quiz-app-logo.png" alt="Logo" />
              </SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 py-4 px-4">
              <span className="text-md sm:text-lg text-gray-600 flex items-center gap-1 py-2 flex-wrap">
                <CircleUser className="h-6 w-6 mr-1" />
                {/* Logged in as */}
                <span className="font-medium capitalize">
                  {user.username}
                </span>{" "}
                <span className="capitalize">({user.role})</span>
              </span>
              {user.role === "admin" && (
                <NavLink to="/questions">
                  {({ isActive }) => (
                    <p
                      className={`${
                        isActive ? "bg-accent" : ""
                      } cursor-pointer w-full p-2 rounded-md`}
                    >
                      Questions
                    </p>
                  )}
                </NavLink>
              )}
              <NavLink to="/answers">
                {({ isActive }) => (
                  <p
                    className={`${
                      isActive ? "bg-accent" : ""
                    } cursor-pointer w-full p-2 rounded-md`}
                  >
                    Answers
                  </p>
                )}
              </NavLink>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button className="cursor-pointer" onClick={handleLogout}>
                  Logout
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

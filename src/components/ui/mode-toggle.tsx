import { Sun } from "lucide-react";
import { Moon } from "lucide-react";

import { Button } from "@/pages/SignUp/components/ui/button";

import { useTheme } from "@/components/ui/theme-provider";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <Button variant="ghost" size="icon" className=" hover:bg-transparent">
      <Sun
        onClick={() => setTheme("dark")}
        strokeWidth={1}
        className="h-[2rem] w-[2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        onClick={() => setTheme("light")}
        strokeWidth={1}
        className="absolute h-[2rem] w-[2rem] rotate-90 scale-0 transition-all-ease dark:rotate-0 dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full border border-primary hover:bg-green-500 hover:bg-opacity-20 hidden lg:flex"
        onClick={toggleTheme}
      >
        {theme === "dark" ? (
          <Sun className="transition-all text-primary" />
        ) : (
          <Moon className="transition-all text-primary" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>

      <div className="flex items-center space-x-2 lg:hidden">
        <Switch
          id="themeToggle"
          checked={theme === "dark"}
          onClick={toggleTheme}
        />
        <Label htmlFor="themeToggle">
          {theme === "dark" ? (
            <Sun className="h-[20px] w-[20px]" />
          ) : (
            <Moon className="h-[20px] w-[20px]" />
          )}
        </Label>
      </div>
    </>
  );
}

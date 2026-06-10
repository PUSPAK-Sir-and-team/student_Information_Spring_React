import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PersonForm } from "./components/CardComp";
import { SidebarComp } from "./components/SidebarComp";
import { SchoolBoard } from "./components/AdminList";
import { Button } from "./components/ui/button";
import { HiMenuAlt3 } from "react-icons/hi";

const getInitialTheme = () => {
  try {
    const savedTheme = localStorage.getItem("student-project-theme");

    if (savedTheme) {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
};

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;

    try {
      localStorage.setItem("student-project-theme", theme);
    } catch {
      // Ignore storage failures and keep the current session theme active.
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  const toggleSidebar = () => {
    if (window.innerWidth >= 1024) {
      setSidebarCollapsed((current) => !current);
      return;
    }

    setSidebarOpen((current) => !current);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50 lg:flex">
        {sidebarOpen && (
          <button
            type="button"
            aria-label="Close sidebar"
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <SidebarComp
          theme={theme}
          onToggleTheme={toggleTheme}
          isCollapsed={sidebarCollapsed}
          isOpen={sidebarOpen}
          onToggleCollapse={toggleSidebar}
          onCloseMobile={() => setSidebarOpen(false)}
        />

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-zinc-200/80 bg-slate-50/90 px-4 py-3 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90 sm:px-6 lg:hidden">
            <div className="flex items-center justify-between gap-3">
              <div className="h-10 w-10">
                {!sidebarOpen && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <HiMenuAlt3 className="h-5 w-5" />
                  </Button>
                )}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-teal-700">
                  School board
                </p>
                <p className="text-sm font-bold text-zinc-950 dark:text-white">
                  EduBoard
                </p>
              </div>
              <div className="h-10 w-10" />
            </div>
          </header>

          <main className="px-4 py-5 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Navigate to="/list" replace />} />
              <Route path="/create" element={<PersonForm />} />
              <Route path="/list" element={<SchoolBoard />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

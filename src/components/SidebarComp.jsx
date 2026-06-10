import {
  HiAcademicCap,
  HiCollection,
  HiChevronLeft,
  HiChevronRight,
  HiX,
  HiMoon,
  HiOutlinePlus,
  HiSparkles,
  HiSun,
  HiUserGroup,
  HiViewGrid,
  HiViewList,
} from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { cn } from "../lib/utils";

const navItems = [
  { to: "/list", label: "School board", icon: HiViewList },
  { to: "/create", label: "Add student/teacher", icon: HiOutlinePlus },
];

const quickItems = [
  { label: "Students", icon: HiUserGroup, value: "248" },
  { label: "Courses", icon: HiCollection, value: "18" },
  { label: "Teams", icon: HiViewGrid, value: "06" },
];

export function SidebarComp({
  theme,
  onToggleTheme,
  isCollapsed = false,
  isOpen = false,
  onToggleCollapse,
  onCloseMobile,
}) {
  const isDark = theme === "dark";
  const showLabels = !isCollapsed;

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-72 -translate-x-full flex-col border-r border-zinc-200/80 bg-white/95 px-4 py-4 backdrop-blur transition-transform duration-300 dark:border-zinc-800 dark:bg-zinc-950/95 lg:sticky lg:top-0 lg:translate-x-0 lg:px-5",
        isOpen ? "translate-x-0" : "",
        isCollapsed ? "lg:w-24" : "lg:w-72",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-zinc-950 text-white shadow-soft dark:bg-teal-500 dark:text-zinc-950">
            <HiAcademicCap className="h-5 w-5" />
          </div>
          {showLabels && (
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-700">
                School
              </p>
              <h1 className="truncate text-xl font-black text-zinc-950 dark:text-white">
                EduBoard
              </h1>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCloseMobile}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 lg:hidden"
            aria-label="Close sidebar"
          >
            <HiX className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden h-10 w-10 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 lg:inline-flex"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <HiChevronRight className="h-5 w-5" />
            ) : (
              <HiChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={onToggleTheme}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white px-3 text-sm font-bold text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 lg:justify-start"
          aria-label="Toggle theme"
        >
          {isDark ? <HiSun className="h-5 w-5" /> : <HiMoon className="h-5 w-5" />}
          {showLabels ? (isDark ? "Light" : "Dark") : null}
        </button>
      </div>

      <nav className="mt-5 grid grid-cols-1 gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "group flex items-center gap-3 rounded-md px-3 py-3 text-sm font-bold transition lg:justify-start",
                  isActive
                    ? "bg-zinc-950 text-white shadow-soft dark:bg-teal-500 dark:text-zinc-950"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white",
                )
              }
              onClick={onCloseMobile}
              title={showLabels ? undefined : item.label}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {showLabels && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {showLabels && (
        <div className="mt-6 hidden space-y-2 lg:block">
          {quickItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-md border border-zinc-200 bg-white px-3 py-3 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-teal-700" />
                  <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                    {item.label}
                  </span>
                </div>
                <span className="text-sm font-black text-zinc-950 dark:text-white">
                  {item.value}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {showLabels && (
        <div className="mt-auto hidden rounded-md bg-zinc-950 p-4 text-white dark:bg-zinc-900 dark:text-white lg:block">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-md bg-white/10 dark:bg-white/10">
              <HiSparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold">School management</p>
              <p className="text-xs text-zinc-300 dark:text-zinc-300">
                Students and teachers
              </p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

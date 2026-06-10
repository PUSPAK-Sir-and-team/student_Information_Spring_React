import { cn } from "../../lib/utils";

const variants = {
  default:
    "bg-zinc-950 text-white shadow-sm hover:bg-zinc-800 focus-visible:ring-zinc-950 dark:bg-teal-500 dark:text-zinc-950 dark:hover:bg-teal-400",
  secondary:
    "bg-white text-zinc-950 ring-1 ring-inset ring-zinc-200 hover:bg-zinc-50 focus-visible:ring-zinc-500 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700 dark:hover:bg-zinc-800",
  ghost:
    "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 focus-visible:ring-zinc-500 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white",
};

const sizes = {
  default: "h-11 px-5",
  sm: "h-9 px-3 text-sm",
  icon: "h-10 w-10",
};

export function Button({
  className,
  variant = "default",
  size = "default",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

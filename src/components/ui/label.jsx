import { cn } from "../../lib/utils";

export function Label({ className, ...props }) {
  return (
    <label
      className={cn(
        "text-sm font-semibold leading-none text-zinc-800 dark:text-zinc-200",
        className,
      )}
      {...props}
    />
  );
}

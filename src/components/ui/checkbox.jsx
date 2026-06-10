import { cn } from "../../lib/utils";

export function Checkbox({ className, ...props }) {
  return (
    <input
      type="checkbox"
      className={cn(
        "h-4 w-4 rounded border-zinc-300 text-zinc-950 accent-zinc-950 focus:ring-2 focus:ring-zinc-950/20",
        className,
      )}
      {...props}
    />
  );
}


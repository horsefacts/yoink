import { intervalToDuration, formatDuration } from "date-fns";

export function formatHuman(seconds: string | null) {
  const secs = seconds ? parseInt(seconds, 10) : 0;
  if (secs == 0) return "0 seconds";
  return formatDuration(intervalToDuration({ start: 0, end: secs * 1000 }));
}

export function formatCompact(seconds: number) {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });

  const days = (duration?.days ?? 0).toString().padStart(2, "0");
  const hours = (duration?.hours ?? 0).toString().padStart(2, "0");
  const minutes = (duration?.minutes ?? 0).toString().padStart(2, "0");
  const secondsFormatted = (duration?.seconds ?? 0).toString().padStart(2, "0");

  return `${days}:${hours}:${minutes}:${secondsFormatted}`;
}

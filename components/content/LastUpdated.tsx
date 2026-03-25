interface LastUpdatedProps {
  /** ISO date string, e.g. "2025-03-01" */
  date: string;
}

/**
 * Displays a "Last updated" line at the bottom of content pages.
 * Formats the date in a readable way — no library needed.
 */
export default function LastUpdated({ date }: LastUpdatedProps) {
  const formatted = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <p className="text-xs text-gray-400 mt-8 pt-6 border-t border-gray-100">
      Last updated: {formatted}
    </p>
  );
}

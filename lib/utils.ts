/**
 * Formats a file size in bytes into a human-readable string.
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Returns the file extension from a filename.
 */
export function getExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

/**
 * Builds a suggested output filename based on the original name and target format.
 */
export function buildOutputFilename(originalName: string, outputFormat: string): string {
  const base = originalName.replace(/\.[^.]+$/, '');
  return `${base}.${outputFormat}`;
}

/**
 * Clamps a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Simple class name joiner utility.
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Formats seconds into M:SS.d display format (e.g. 90.5 → "1:30.5").
 */
export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  const d = Math.floor((seconds % 1) * 10);
  return `${m}:${s.toString().padStart(2, '0')}.${d}`;
}

/**
 * Parses a time string (M:SS, M:SS.d, or raw seconds) into a number.
 * Returns NaN if unparseable.
 */
export function parseTimeInput(value: string): number {
  const v = value.trim();
  const parts = v.split(':');
  if (parts.length === 2) {
    const m = parseFloat(parts[0]);
    const s = parseFloat(parts[1]);
    if (!isNaN(m) && !isNaN(s)) return m * 60 + s;
  } else if (parts.length === 1) {
    const n = parseFloat(parts[0]);
    if (!isNaN(n)) return n;
  }
  return NaN;
}

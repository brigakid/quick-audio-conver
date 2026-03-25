interface QuickAnswerProps {
  children: React.ReactNode;
}

/**
 * TL;DR / quick-answer box at the top of guide pages.
 * Gives the answer immediately — readers don't have to scroll to find it.
 */
export default function QuickAnswer({ children }: QuickAnswerProps) {
  return (
    <div className="my-6 p-4 sm:p-5 rounded-xl bg-brand/5 border border-brand/15">
      <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-1.5">
        Quick answer
      </p>
      <div className="text-sm text-gray-800 leading-relaxed">{children}</div>
    </div>
  );
}

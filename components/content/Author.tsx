interface AuthorProps {
  name?: string;
}

export default function Author({ name = 'JustTet' }: AuthorProps) {
  return (
    <p className="text-xs text-gray-400 mb-6">
      By <span className="text-gray-500 font-medium">{name}</span>
    </p>
  );
}

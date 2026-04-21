/**
 * JsonLd — single or multi schema injector.
 *
 * Renders one or more JSON-LD blocks as <script type="application/ld+json"> tags.
 * Schemas passed as an array are emitted as separate <script> tags (easier to
 * debug in DevTools and per Google's current guidance).
 */
interface JsonLdProps {
  data: unknown | unknown[];
}

export default function JsonLd({ data }: JsonLdProps) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}

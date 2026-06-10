/**
 * Slim numbered chapter rule that threads the retained sections into
 * the album narrative: 03 — Try, 04 — Proof, and so on.
 */
export function ChapterMark({ no, title }: { no: string; title: string }) {
  return (
    <div className="container-x pt-14 md:pt-20">
      <div className="aw-mark">
        <span className="aw-mark-no">{no}</span>
        <span className="aw-mark-rule" />
        <span className="aw-mark-title">{title}</span>
      </div>
    </div>
  );
}

/**
 * Convert an Astro 5 content collection ID (e.g. "snap.md") to a clean URL slug ("snap").
 * Collection IDs include the file extension; URLs must not.
 */
export function idToSlug(id: string): string {
  return id.replace(/\.(md|mdx)$/, '');
}

/**
 * Prefix a local asset path (image, file) with the deployment base path.
 *
 * `next/image` with `unoptimized` and raw <img>/<link> do NOT automatically
 * apply Next's `basePath`, so image URLs must be prefixed manually. On a root
 * domain BASE_PATH is "" and this is a no-op. next/link handles its own paths.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (!path) return path;
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  return `${BASE_PATH}${path.startsWith("/") ? "" : "/"}${path}`;
}

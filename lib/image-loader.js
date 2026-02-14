// Custom image loader for static export
export default function imageLoader({ src, width, quality }) {
  // For static export, return the image as-is
  return `${src}?w=${width}&q=${quality || 75}`;
}
// Static export: works on GitHub Pages, Vercel and Netlify.
// For a GitHub Pages project site set NEXT_PUBLIC_BASE_PATH="/your-repo-name" (the workflow does this).
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
export default { output: "export", images: { unoptimized: true }, basePath: base, assetPrefix: base || undefined, trailingSlash: true };

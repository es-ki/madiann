import { fetchAllContentIds, fetchArticle, fetchCategory } from '$lib/functions/microcms';
import { PUBLIC_SITE_URL } from '$env/static/public';

export async function GET() {
	const siteUrl = PUBLIC_SITE_URL || '';
	const [categoryIds, articleIds] = await Promise.all([
		fetchAllContentIds('category'),
		fetchAllContentIds('article')
	]);
	const categoryPaths = await Promise.all(
		categoryIds.map(async (path) => {
			const category = await fetchCategory(path);
			return { path, lastMod: category?.publishedAt || new Date().toDateString() };
		})
	);
	const articlePaths = await Promise.all(
		articleIds.map(async (path) => {
			const article = await fetchArticle(path);
			return {
				path: `${article?.category.id}/${path}`,
				lastMod: article?.updatedAt || new Date().toDateString()
			};
		})
	);

	const defaultLastMod = '2023-09-01T00:00:00.000Z';
	const paths = [
		{ path: siteUrl, lastMod: defaultLastMod },
		...categoryPaths,
		...articlePaths,
		{ path: 'about', lastMod: defaultLastMod },
		{ path: 'privacy-policy', lastMod: defaultLastMod }
	];

	return new Response(
		`
      <?xml version="1.0" encoding="UTF-8" ?>
      <urlset
        xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="https://www.w3.org/1999/xhtml"
        xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
      >
      ${paths.map(
				({ path, lastMod }) => `
        <url>
          <loc>${siteUrl === path ? siteUrl : `${siteUrl}/${path}`}</loc>
          <lastmod>${lastMod}</lastmod>
        </url>
      `
			)}
      </urlset>`.trim(),
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
}

import { fetchAllContentIds, fetchArticles } from '$lib/functions/microcms';
import { PUBLIC_PER_PAGE } from '$env/static/public';

export async function load() {
	const limit = isNaN(Number(PUBLIC_PER_PAGE)) ? 10 : Number(PUBLIC_PER_PAGE);
	const [{ contents }, articleIds] = await Promise.all([
		fetchArticles({ limit, orders: '-published' }),
		fetchAllContentIds('article')
	]);
	return { articles: contents, totalCount: articleIds.length || 0 };
}

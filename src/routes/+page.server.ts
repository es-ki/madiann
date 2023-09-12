import { fetchArticles } from '$lib/functions/microcms';
import { PUBLIC_PER_PAGE } from '$env/static/public';

export async function load() {
	const articles = await fetchArticles({
		limit: Number(PUBLIC_PER_PAGE) || 10
	});
	return { articles };
}

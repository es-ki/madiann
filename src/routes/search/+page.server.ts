import { fetchArticles } from '$lib/functions/microcms';

export async function load({ url }) {
	const q = url.searchParams.get('q') || '';
	const { contents } = await fetchArticles({ limit: 100, orders: '-publishedAt', q });
	return { articles: q ? contents : [], query: q };
}

export const prerender = false;

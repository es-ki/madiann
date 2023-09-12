import { fetchArticles } from '$lib/functions/microcms';

export async function load({ url }) {
	const query = url.searchParams.get('q') || '';
	const { contents } = await fetchArticles({ limit: 999, orders: '-publishedAt', q: query });
	return { articles: query ? contents : [], query };
}

export const prerender = false;

import { error, redirect } from '@sveltejs/kit';
import { fetchAllContentIds, fetchArticles, fetchCategory } from '$lib/functions/microcms';
import { PUBLIC_PER_PAGE } from '$env/static/public';

export async function load({ params }) {
	const offset = params.offset;
	const current = isNaN(Number(offset)) ? 0 : Number(offset);
	if (current < 2) throw redirect(301, '/');

	const categoryId = params.category;
	const limit = isNaN(Number(PUBLIC_PER_PAGE)) ? 10 : Number(PUBLIC_PER_PAGE);
	const filters = `category[equals]${categoryId}`;
	const [category, articleIds, { contents }] = await Promise.all([
		fetchCategory(categoryId),
		fetchAllContentIds('article', filters),
		fetchArticles({ limit, orders: '-published', filters, offset: (current - 1) * limit })
	]);
	if (contents.length < 1) throw error(404, { message: 'Not found' });

	return { category, totalCount: articleIds.length || 0, articles: contents, offset };
}

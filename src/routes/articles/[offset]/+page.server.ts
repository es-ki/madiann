import { error, redirect } from '@sveltejs/kit';
import { fetchAllContentIds, fetchArticles } from '$lib/functions/microcms';
import { PUBLIC_PER_PAGE } from '$env/static/public';
import { getPageNationArray } from '$lib/functions/utils';

export async function entries() {
	const totalCount = (await fetchAllContentIds('article')).length || 0;
	const pageNationArray = getPageNationArray(totalCount);
	return pageNationArray.flatMap((i) => (i === 1 ? [] : { offset: i.toString() }));
}

export async function load({ params }) {
	const offset = params.offset;
	const current = isNaN(Number(offset)) ? 0 : Number(offset);
	if (current < 2) throw redirect(301, '/');

	const limit = isNaN(Number(PUBLIC_PER_PAGE)) ? 10 : Number(PUBLIC_PER_PAGE);
	const [{ contents }, articleIds] = await Promise.all([
		fetchArticles({ limit, orders: '-published', offset: (current - 1) * limit }),
		fetchAllContentIds('article')
	]);
	if (contents.length < 1) throw error(404, { message: 'Not found' });

	return { articles: contents, totalCount: articleIds.length || 0, offset };
}

import { redirect } from '@sveltejs/kit';
import { fetchArticles } from '$lib/functions/microcms';
import { PUBLIC_PER_PAGE } from '$env/static/public';
import { getPageNationArray } from '$lib/functions/utils';

export async function entries() {
	const { totalCount } = await fetchArticles({ limit: 999 });
	const pageNationArray = getPageNationArray(totalCount);
	return pageNationArray.flatMap((i) => (i === 1 ? [] : { offset: i.toString() }));
}

export async function load({ params }) {
	const offset = params.offset;
	const current = isNaN(Number(offset)) ? 0 : Number(offset);
	if (current < 2) throw redirect(301, '/');

	const articles = await fetchArticles({
		limit: Number(PUBLIC_PER_PAGE || 10),
		orders: '-published',
		offset: (current - 1) * Number(PUBLIC_PER_PAGE || 10)
	});

	return { articles, offset };
}

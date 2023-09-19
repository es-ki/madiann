import { fetchArticle } from '$lib/functions/microcms';
import { getParseHtml } from '$lib/functions/utils';
import { error } from '@sveltejs/kit';

export async function load({ url: { searchParams } }) {
	const id = searchParams.get('id') || '';
	const key = searchParams.get('key') || '';
	if (!id || !key) throw error(404, { message: 'Not found' });

	const article = await fetchArticle(id, { draftKey: key });
	if (!article) throw error(404, { message: 'Not found' });
	const { body, toc } = getParseHtml(article?.body);

	return { article: { ...article, body }, toc };
}

export const prerender = false;

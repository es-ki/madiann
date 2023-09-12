import { fetchArticle } from '$lib/functions/microcms';
import { getParseHtml } from '$lib/functions/utils';

export async function load({ url: { searchParams } }) {
	const id = searchParams.get('id') || '';
	const key = searchParams.get('key') || '';
	if (!id || !key) return { article: null };

	const article = await fetchArticle(id, { draftKey: key });
	if (!article) return { article: null };
	const { body, toc } = getParseHtml(article?.body);

	return { article: { ...article, body }, toc };
}

export const prerender = false;

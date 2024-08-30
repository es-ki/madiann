import { fetchAllContentIds, fetchArticle, fetchArticles } from '$lib/functions/microcms';
import { getParseHtml } from '$lib/functions/utils';
import { schema } from '$lib/schema';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

export async function entries() {
	const articleIds = await fetchAllContentIds('article');
	const paths = (await Promise.all(
		articleIds.flatMap(async (id) => {
			const article = await fetchArticle(id);
			return article ? { category: article.category.id, article: id } : [];
		})
	)) as { category: string; article: string }[];
	return paths;
}

export async function load({ params }) {
	const articleId = params.article;
	const article = await fetchArticle(articleId);
	if (!article) throw error(404, { message: 'Not found' });

	const { contents } = await fetchArticles({
		filters: `category[equals]${article.category.id}[and]id[not_equals]${articleId}`,
		limit: 10,
		orders: '-publishedAt'
	});
	const { body, toc } = getParseHtml(article.body);

	const form = await superValidate(schema);

	return { article: { ...article, body }, relatedArticles: contents, toc, form };
}

export const prerender = true;

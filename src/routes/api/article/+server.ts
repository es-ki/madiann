import { IS_LOCAL } from '$env/static/private';
import { PUBLIC_SITE_URL } from '$env/static/public';
import { fetchArticle, fetchArticles } from '$lib/functions/microcms';
import { error } from '@sveltejs/kit';

export async function GET({ url }) {
	try {
		const articleId = url.searchParams.get('id');
		if (!articleId) throw new Error('記事IDの取得に失敗しました。');

		const article = await fetchArticle(articleId);
		if (!article) throw new Error('記事がありませんでした。');

		const { contents } = await fetchArticles({
			filters: `category[equals]${article.category.id}[and]id[not_equals]${articleId}`,
			limit: 10,
			orders: '-publishedAt'
		});
		return new Response(JSON.stringify({ article, articles: contents }), {
			headers: {
				'Access-Control-Allow-Origin': IS_LOCAL === 'true' ? '*' : PUBLIC_SITE_URL
			}
		});
	} catch (err) {
		console.log(err);
		const message = err instanceof Error ? err.message : '予期せぬエラーが発生しました。';
		throw error(500, message);
	}
}

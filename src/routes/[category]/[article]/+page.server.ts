import { error, fail } from '@sveltejs/kit';
import { fetchAllContentIds, fetchArticle, fetchArticles } from '$lib/functions/microcms';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { getParseHtml } from '$lib/functions/utils';

const schema = z.object({
	name: z.string().min(1).max(50).default('ゲスト'),
	body: z.string().min(1).max(200)
});

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

	const [{ contents }, form] = await Promise.all([
		fetchArticles({
			filters: `category[equals]${article.category.id}[and]id[not_equals]${articleId}`,
			limit: 10,
			orders: '-publishedAt'
		}),
		superValidate(schema)
	]);

	const { body, toc } = getParseHtml(article.body);

	return {
		article: { ...article, body },
		relatedArticles: contents,
		toc,
		form
	};
}

export const actions = {
	default: async ({ request, platform, params }) => {
		const form = await superValidate(request, schema);

		try {
			if (!form.valid) throw new Error('入力に不備があります。');
			const { name, body } = form.data;
			const res = await platform?.env.DB.prepare(
				`insert into comments (articleId, date, name, body) values (?, datetime('now', '+9 hours'), ?, ?)`
			)
				.bind(params.article, name, body)
				.run();
			if (!res?.success) throw new Error('コメントの投稿に失敗しました。');

			return { form, message: 'success' };
		} catch (err) {
			console.log(err);
			const message = err instanceof Error ? err.message : '予期せぬエラーが発生しました。';
			return fail(400, { form, message });
		}
	}
};

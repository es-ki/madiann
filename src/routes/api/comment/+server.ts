import { IS_LOCAL } from '$env/static/private';
import { PUBLIC_SITE_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';

export async function GET({ url, platform }) {
	try {
		const articleId = url.searchParams.get('id');
		if (!articleId) throw new Error('記事IDの取得に失敗しました。');

		const res = await platform?.env.DB.prepare(
			`SELECT * FROM comments WHERE articleId = '${articleId}'`
		).all();
		if (!res?.success) throw new Error('コメントの取得に失敗しました。');

		return new Response(JSON.stringify(res?.results), {
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

export async function POST({ request, platform }) {
	try {
		const { articleId, name, body } = await request.json();
		if (!articleId) throw new Error('記事IDがありません。');
		if (!name || !body) throw new Error('入力に不備があります。');

		const res = await platform?.env.DB.prepare(
			`insert into comments (articleId, date, name, body) values (?, datetime('now', '+9 hours'), ?, ?)`
		)
			.bind(articleId, name, body)
			.run();
		if (!res?.success) throw new Error('コメントの投稿に失敗しました。');

		return new Response(JSON.stringify({ message: 'success' }), {
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

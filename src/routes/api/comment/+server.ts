import { error } from '@sveltejs/kit';
import { IS_LOCAL } from '$env/static/private';
import { PUBLIC_SITE_URL } from '$env/static/public';

/** @type {import('@sveltejs/kit').RequestHandler} */
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

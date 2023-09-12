import { fetchArticles, fetchCategories, fetchCategory } from '$lib/functions/microcms';

export async function entries() {
	const { contents } = await fetchCategories({ limit: 999 });
	return contents.map(({ id }) => ({ category: id }));
}

export async function load({ params }) {
	const categoryId = params.category;
	const [{ contents }, category] = await Promise.all([
		fetchArticles({
			filters: `category[equals]${categoryId}`,
			limit: 999
		}),
		fetchCategory(categoryId)
	]);
	return { articles: contents, category };
}

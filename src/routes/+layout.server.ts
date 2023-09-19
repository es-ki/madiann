import { fetchCategories } from '$lib/functions/microcms';

export async function load() {
	const { contents } = await fetchCategories({ limit: 5 });
	return { categories: contents };
}

import { createClient, type MicroCMSQueries } from 'microcms-js-sdk';
import { MICROCMS_SERVICE_DOMAIN, MICROCMS_API_KEY } from '$env/static/private';
import type { Article, Category } from '$lib/types';

const client = createClient({
	serviceDomain: MICROCMS_SERVICE_DOMAIN,
	apiKey: MICROCMS_API_KEY
});
type MicroCmsContentType = 'article' | 'category';
type MicroCmsContent<T extends MicroCmsContentType> = T extends 'article'
	? Article
	: T extends 'category'
	? Category
	: never;
type MicroCmsContents<T extends MicroCmsContentType> = {
	totalCount: number;
	offset: number;
	limit: number;
	contents: MicroCmsContent<T>[];
};
const fetchList = async <T extends MicroCmsContentType>(endpoint: T, queries?: MicroCMSQueries) => {
	try {
		const res = await client.get<MicroCmsContents<T>>({ endpoint, queries });
		return res;
	} catch (err) {
		console.log(err);
		return { totalCount: 0, offset: 0, limit: 0, contents: [] };
	}
};
const fetchDetail = async <T extends MicroCmsContentType>(
	endpoint: T,
	contentId = '',
	queries?: MicroCMSQueries
) => {
	try {
		if (!contentId) throw new Error('contentIdがありません。');

		const res = await client.getListDetail<MicroCmsContent<T>>({
			endpoint,
			contentId,
			queries
		});
		return res;
	} catch (err) {
		console.log(err);
		return null;
	}
};

export const fetchArticles = async (queries?: MicroCMSQueries) =>
	await fetchList('article', queries);
export const fetchArticle = async (contentId: string, queries?: MicroCMSQueries) =>
	await fetchDetail('article', contentId, queries);

export const fetchCategories = async (queries?: MicroCMSQueries) =>
	await fetchList('category', queries);
export const fetchCategory = async (contentId: string, queries?: MicroCMSQueries) =>
	await fetchDetail('category', contentId, queries);

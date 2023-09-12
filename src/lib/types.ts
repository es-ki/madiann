import type { MicroCMSImage } from 'microcms-js-sdk';

type MicroCmsBaseContent = {
	id: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	revisedAt: string;
};

export type Category = {
	name: string;
} & MicroCmsBaseContent;

export type Article = {
	title: string;
	headTitle?: string;
	headDescription?: string;
	eyeCatch: MicroCMSImage;
	body?: string;
	category: Category;
} & MicroCmsBaseContent;

export type Comment = {
	id: number;
	articleId: string;
	date: string;
	name: string;
	body: string;
};

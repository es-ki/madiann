import { PUBLIC_PER_PAGE, PUBLIC_SITE_URL } from '$env/static/public';
import cheerio from 'cheerio';
import hljs from 'highlight.js';

export const getParseHtml = (htmlStr = '') => {
	const $ = cheerio.load(htmlStr || '');
	$('pre code').each((_, element) => {
		const result = hljs.highlightAuto($(element).text());
		$(element).html(result.value);
		$(element).addClass('hljs');
	});
	$('table').each((_, element) => {
		$(element).wrap("<div class='table'></div>");
	});

	const headings = $('h2, h3').toArray();
	const toc = headings.map((data) => {
		const childrenNode = data.children[0];
		return {
			id: data.attribs.id,
			type: data.name,
			text: childrenNode.type === 'text' ? childrenNode.data : ''
		};
	});

	return { body: $.html(), toc };
};

export const formatDate = (str = '') => {
	if (!str) return;
	const dateObj = new Date(str);
	const year = dateObj.getUTCFullYear();
	const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
	const day = String(dateObj.getUTCDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
};

export const getPageNationArray = (totalCount: number | null) =>
	totalCount && totalCount > 0
		? [...Array(Math.ceil(totalCount / (Number(PUBLIC_PER_PAGE) || 10)) - 1 + 1)].map(
				(_, i) => 1 + i
		  )
		: [];

export const getCanonical = (path = '') => `${PUBLIC_SITE_URL}${path ? `/${path}` : ''}`;

<script>
	import Articles from '$lib/components/articles.svelte';
	import { getCanonical } from '$lib/functions/utils';

	export let data;
</script>

<svelte:head>
	<title>{data.offset}ページ目</title>
	<meta name="description" content={`${data.offset}ページ目`} />
	<link rel="canonical" href={getCanonical(`articles/${data.offset}`)} />
</svelte:head>

<article>
	<h1>記事一覧</h1>

	{#if data.articles.contents.length > 0}
		<Articles
			articles={data.articles.contents}
			totalCount={data.articles.totalCount}
			current={Number(data.offset)}
		/>
	{/if}
</article>

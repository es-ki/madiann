<script>
	import Article from '$lib/components/article.svelte';

	export let data;
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
	<title>{data.article?.title || '記事のプレビュー'}</title>
</svelte:head>

<article>
	{#if data.article}
		<Article article={data.article} toc={data.toc} />
	{:else}
		<p>記事データの取得に失敗しました。</p>
	{/if}
</article>

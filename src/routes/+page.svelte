<script>
	import { PUBLIC_SITE_NAME } from '$env/static/public';
	import Articles from '$lib/components/articles.svelte';
	import { PUBLIC_SITE_URL } from '$env/static/public';

	export let data;
</script>

<svelte:head>
	<title>{PUBLIC_SITE_NAME}</title>
	<meta name="description" content="トップページ" />
	<link rel="canonical" href={PUBLIC_SITE_URL || ''} />
</svelte:head>

<article>
	<h1>記事一覧</h1>

	{#if data.articles.contents.length > 0}
		<Articles articles={data.articles.contents} totalCount={data.articles.totalCount} current={1} />
	{/if}
</article>

<style lang="scss">
	article {
	}
</style>

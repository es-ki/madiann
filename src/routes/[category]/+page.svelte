<script>
	import Articles from '$lib/components/articles.svelte';
	import { getCanonical } from '$lib/functions/utils';

	export let data;
</script>

<svelte:head>
	<title>{data.category?.name}に関する記事一覧</title>
	<meta
		name="description"
		content={data.category?.name ? `${data.category?.name}に関する記事の一覧` : ''}
	/>
	<link rel="canonical" href={getCanonical(data.category?.id)} />
</svelte:head>

<article>
	<h1>{data.category?.name}に関する記事一覧</h1>

	{#if data.articles.length > 0}
		<Articles
			articles={data.articles}
			categoryId={data.category?.id}
			totalCount={data.totalCount}
			current={1}
		/>
	{:else}
		<p class="err">{data.category?.name}に関する記事はありません。</p>
	{/if}
</article>

<style lang="scss">
	.err {
		padding: 1rem;
	}
</style>

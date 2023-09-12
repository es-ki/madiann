<script>
	import Articles from '$lib/components/articles.svelte';
	import SearchForm from '$lib/components/searchForm.svelte';
	import { getCanonical } from '$lib/functions/utils';

	export let data;
</script>

<svelte:head>
	<title>{data.query ? `${data.query}に関する記事の一覧` : 'サイト内検索'}</title>
	<meta name="description" content="サイト内検索" />
	<link rel="canonical" href={getCanonical('search')} />
</svelte:head>

<article>
	<div class="top">
		<h1>{data.query ? `${data.query}に関する記事の一覧` : 'サイト内検索'}</h1>

		<SearchForm />
	</div>

	{#if data.articles.length > 0}
		<Articles articles={data.articles} />
	{:else}
		<p class="empty">{data.query ? `${data.query}に関する記事はありません。` : ''}</p>
	{/if}
</article>

<style lang="scss">
	.top {
		padding-inline: 1rem;
		@include mq(lg) {
			padding-inline: 0;
		}

		:global(form) {
			margin-bottom: 2rem;
			@include mq(lg) {
				display: none;
			}
		}
	}

	.empty {
		padding-inline: 1rem;
	}
</style>

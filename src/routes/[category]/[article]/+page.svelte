<script>
	import Articles from '$lib/components/articles.svelte';
	import Article from '$lib/components/article.svelte';
	import Comments from './comments.svelte';
	import { PUBLIC_IS_USE_COMMENT } from '$env/static/public';
	import { getCanonical } from '$lib/functions/utils';

	export let data;
</script>

<svelte:head>
	<title>{data.article?.headTitle || data.article?.title || 'エラー'}</title>
	<meta name="description" content={data.article?.headDescription || ''} />
	<meta property="og:image" content={data.article?.eyeCatch?.url || ''} />
	<link rel="canonical" href={getCanonical(`${data.article?.category.id}/${data.article?.id}`)} />
</svelte:head>

<article>
	{#if data.article}
		<Article article={data.article} toc={data.toc} />
	{:else}
		<p class="err">記事データの取得に失敗しました。</p>
	{/if}
</article>

{#if data.relatedArticles.length > 0}
	<section class="related">
		<h2>関連記事</h2>
		<Articles articles={data.relatedArticles} />
	</section>
{/if}

{#if PUBLIC_IS_USE_COMMENT === 'true' && data.article}
	<Comments dataForm={data.form} articleId={data.article.id} />
{/if}

<style lang="scss">
	article {
		margin-bottom: 2rem;
	}

	.err {
		padding: 1rem;
	}

	.related {
		padding: 2rem 1rem;
		@include mq(lg) {
			padding-inline: 0;
		}

		h2 {
			margin-bottom: 1rem;
		}
	}
</style>

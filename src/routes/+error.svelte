<script>
	import { page } from '$app/stores';
	console.log($page?.error?.message);
</script>

<svelte:head>
	<title>404 ページが見つかりませんでした</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<article>
	<h1>ページが見つかりませんでした</h1>

	<a href="/">トップページにもどる</a>
</article>

<style lang="scss">
	article {
		padding-inline: 1rem;
	}

	h1,
	a {
		display: table;
		margin-inline: auto;
	}

	a {
		text-decoration: underline;
	}
</style>

<script>
	import { PUBLIC_SITE_NAME } from '$env/static/public';
	import { getCanonical } from '$lib/functions/utils';

	const links = [
		{ name: 'SvelteKit', purpose: 'フロントエンドの構築', href: 'https://kit.svelte.dev/' },
		{ name: 'Cloudflare Pages', purpose: 'ホスティング', href: 'https://pages.cloudflare.com/' },
		{
			name: 'Cloudflare D1',
			purpose: 'コメントのデータベース',
			href: 'https://developers.cloudflare.com/d1/'
		},
		{ name: 'Superforms', purpose: 'コメントのフォーム', href: 'https://superforms.rocks/' }
	];
</script>

<svelte:head>
	<title>{PUBLIC_SITE_NAME}について</title>
	<meta name="description" content={`${PUBLIC_SITE_NAME}について`} />
	<link rel="canonical" href={getCanonical('about')} />
</svelte:head>

<article>
	<h1>{PUBLIC_SITE_NAME}について</h1>

	<p>このページはmicroCMSで管理していません。</p>
	<p>変更の際は`src/route/about`を編集してください。</p>
</article>

<style lang="scss">
	article {
		padding-inline: 1rem;
		@include mq(lg) {
			padding-inline: 0;
		}
	}

	section:not(:last-of-type) {
		margin-bottom: 2rem;
	}

	p,
	a {
		margin-bottom: 0.25rem;
		line-height: 1.8;
	}

	a {
		display: inline-block;
		color: #0074d3;
		text-decoration: underline;
	}

	ul {
		list-style: disc;
		padding-left: 1.5rem;
		margin-bottom: 1rem;
		line-height: 1.6;
	}
</style>

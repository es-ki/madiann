<script>
	import { getCanonical } from '$lib/functions/utils';
</script>

<svelte:head>
	<title>プライバシーポリシー</title>
	<meta name="description" content="プライバシーポリシー" />
	<link rel="canonical" href={getCanonical('privacy-policy')} />
</svelte:head>

<article>
	<h1>プライバシーポリシー</h1>

	<section>
		<h2>見出し</h2>
		<p>このページはmicroCMSで管理していません。</p>
		<p>変更の際は`src/route/privacy-policy`を編集してください。</p>
	</section>
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

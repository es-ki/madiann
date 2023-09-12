<script>
	import Author from '$lib/components/author.svelte';
	import Footer from '$lib/components/footer.svelte';

	import 'the-new-css-reset/css/reset.css';
	import './styles.scss';

	export let data;
</script>

<svelte:head>
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="app">
	<main>
		<slot />
	</main>

	<Author />
	<Footer categories={data.categories} />
</div>

<style lang="scss">
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		padding-bottom: 4rem;
		@include mq(lg) {
			display: grid;
			grid-template-columns: repeat(12, 1fr);
			gap: 2rem;
			align-items: start;
			width: 100%;
			max-width: 1024px;
			margin-inline: auto;
			padding: 2rem;
		}
		@include mq(xl) {
			max-width: 1280px;
		}
	}

	main {
		flex: 1;
		padding: 2rem 0;
		@include mq(lg) {
			grid-area: 1/3 / auto/span 8;
			padding: 0;
		}
	}
</style>

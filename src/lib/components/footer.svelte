<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { PUBLIC_SITE_NAME } from '$env/static/public';
	import type { Category } from '$lib/types';
	import SearchForm from './searchForm.svelte';

	export let categories: Category[];

	$: isMenu = false;
	const toggleMenu = () => (isMenu = !isMenu);
	afterNavigate(() => {
		if (isMenu) toggleMenu();
	});
</script>

<a href="/" class="home" aria-label="トップページに遷移するリンク">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="icon icon-tabler icon-tabler-home-2"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		stroke-width="2"
		stroke="currentColor"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
		<path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
		<path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
		<path d="M10 12h4v4h-4z"></path>
	</svg>
</a>

<button on:click={toggleMenu} class="toggle" type="button" aria-label="メニューを開くボタン">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		stroke-width="2"
		stroke="currentColor"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M4 4h6v6h-6z" />
		<path d="M14 4h6v6h-6z" />
		<path d="M4 14h6v6h-6z" />
		<path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
	</svg>
</button>

<aside class={`menu ${isMenu ? 'active' : ''}`}>
	<button on:click={toggleMenu}>mask</button>
	<ul>
		<li><SearchForm /></li>
		<li>
			<a href="/">ホーム</a>
		</li>
		{#each categories as { id, name }, i}
			<li class={i + 1 === categories.length ? 'last' : 'item'}>
				<a href={`/${id}`}>
					{name}
				</a>
			</li>
		{/each}
		<li class="small">
			<a href="/about">
				{PUBLIC_SITE_NAME}について
			</a>
		</li>
		<li class="small">
			<a href="/privacy-policy">プライバシーポリシー</a>
		</li>
	</ul>
</aside>

<style lang="scss">
	.home,
	.toggle {
		position: fixed;
		bottom: 0;
		width: 3rem;
		height: 3rem;
		z-index: 20;
		@include mq(lg) {
			display: none;
		}

		svg {
			width: 100%;
			height: 100%;
		}
	}

	.home {
		left: 0;
	}

	.toggle {
		right: 0;
	}

	.menu {
		pointer-events: none;
		@include mq(lg) {
			grid-area: 1/1 / auto/span 2;
			pointer-events: all;
			position: sticky;
			top: 2rem;
			font-size: $sm;
		}

		> button {
			position: fixed;
			inset: 0;
			background: rgba(0, 0, 0, 0.4);
			opacity: 0;
			backdrop-filter: blur(3px);
			transition: opacity 0.2s ease-out;
			color: transparent;
			cursor: default;
			@include mq(lg) {
				display: none;
			}
		}

		ul {
			position: fixed;
			top: 50%;
			left: 50%;
			translate: -50% -50%;
			background: $white;
			padding: 1.5rem 1rem 1rem;
			width: 90vw;
			border-radius: 0.75rem;
			scale: 0;
			transition: scale 0.2s ease-out;
			@include mq(md) {
				width: 490px;
			}
			@include mq(lg) {
				position: static;
				scale: 1;
				translate: 0 0;
				width: 100%;
				height: 100%;
				padding: 0;
				transition: none;
			}
		}

		li {
			&:nth-of-type(1) {
				margin-bottom: 1rem;
			}

			&.last {
				margin-bottom: 1rem;
			}

			&.small {
				font-size: $sm;
				opacity: 0.8;
				@include mq(lg) {
					font-size: $xs;
				}
			}

			a {
				display: block;
				padding-block: 0.25rem;
			}
		}

		&.active {
			pointer-events: all;

			> button {
				opacity: 1;
			}

			ul {
				scale: 1;
			}
		}
	}
</style>

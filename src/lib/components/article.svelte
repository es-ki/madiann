<script lang="ts">
	import { formatDate } from '$lib/functions/utils';
	import type { Article } from '$lib/types';
	import Image from '$lib/components/image.svelte';
	import 'highlight.js/styles/hybrid.css';

	export let article: Article, toc: { id: string; type: string; text: string }[];
</script>

<section class="top">
	<div>
		<h1>{article.title}</h1>
		<a href={`/${article.category.id}`}>{article.category.name}</a>
		{#if article.publishedAt}
			<p>
				<time datetime={formatDate(article.publishedAt)}>{formatDate(article.publishedAt)}</time>
			</p>
		{/if}
	</div>
	{#if article.eyeCatch}
		<Image
			props={{
				src: article.eyeCatch.url,
				alt: article.title,
				width: article.eyeCatch.width,
				height: article.eyeCatch.height
			}}
		/>
	{/if}
</section>

{#if toc.length > 0}
	<section class="toc">
		<h2>目次</h2>
		<ul>
			{#each toc as { id, type, text }}
				<li class={`item ${type === 'h3' ? 'h3' : ''}`}>
					<a href={`#${id}`}>{text}</a>
				</li>
			{/each}
		</ul>
	</section>
{/if}

<section class="body">
	{@html article.body}
</section>

<style lang="scss">
	.top {
		margin-bottom: 2rem;

		> div {
			padding: 0 1rem 1rem;
		}

		h1 {
			margin-bottom: 0.25rem;
		}

		a,
		p {
			text-align: center;
		}

		a {
			display: table;
			margin: 0 auto 0.5rem;
			padding: 0.25rem 0.75rem;
			line-height: 1;
			font-size: $sm;
			border: 1px solid $black;
			border-radius: 50vh;
		}

		:global(img) {
			@include mq(md) {
				width: auto;
				max-height: 480px;
				margin-inline: auto;
			}
		}
	}

	.eyecatch {
		margin-bottom: 2rem;
	}

	.toc {
		padding-inline: 1rem;
		margin-bottom: 2rem;
		@include mq(lg) {
			padding-inline: 0;
		}

		ul {
			padding-left: 1.5rem;
		}

		a {
			display: block;
			padding-block: 0.25rem;
			@include mq(md) {
				display: inline-block;
				font-size: $sm;
			}
		}

		li {
			list-style: disc;

			&.h3 {
				list-style: circle;
				margin-left: 1rem;
			}
		}
	}

	.body {
		padding-inline: 1rem;
		@include mq(lg) {
			padding-inline: 0;
		}

		:global(p) {
			margin-bottom: 0.25rem;
			line-height: 1.6;
		}

		:global(h2) {
			margin-block: 3rem 1rem;
		}

		:global(h3) {
			margin-block: 2rem 1rem;
		}

		:global(strong) {
			font-weight: bold;
			font-size: $md;
		}

		:global(em) {
			display: inline-block;
			margin-inline: 0.125rem;
			transform: skewX(-10deg);
		}

		:global(u) {
			text-decoration: underline;
		}

		:global(s) {
			text-decoration: line-through;
		}

		:global(code:not([class])) {
			background: #1d1f21;
			color: #c5c8c6;
			padding: 0.25rem 0.375rem;
			margin-inline: 0.125rem;
			font-size: 0.875rem;
		}

		:global(hr) {
			margin-block: 2rem;
			border-top: 1px solid $black;
		}

		:global(blockquote) {
			position: relative;
			background: $white-600;
			padding: 1rem 1rem 1rem 1.5rem;
			margin-bottom: 1rem;
		}

		:global(blockquote::before) {
			content: '>';
			position: absolute;
			top: 1rem;
			left: 0.75rem;
		}

		:global(blockquote p) {
			line-height: 1.4;
		}

		:global(blockquote p:last-of-type) {
			margin-bottom: 0;
		}

		:global(div pre) {
			font-size: 1rem;
			line-height: 1.4;
			overflow-x: auto;
		}

		:global(pre code) {
			font-size: 1rem;
			line-height: 1.4;
		}

		:global(div.table) {
			overflow-x: auto;
			margin-bottom: 1rem;
		}

		:global(table) {
			width: 100%;
			border: 1px solid $black;
		}

		:global(tr) {
			border-top: 1px solid $black;
		}

		:global(tr > *:not(:first-child)) {
			border-left: 1px solid $black;
		}

		:global(th) {
			background: $white-600;
			padding: 0.25rem 0.5rem;
			font-weight: bold;
			text-align: center;
			white-space: nowrap;
			vertical-align: middle;
		}

		:global(td) {
			padding: 0.25rem 0.5rem;
			vertical-align: middle;
		}

		:global(table p) {
			margin-bottom: 0;
		}

		:global(td p) {
			word-break: keep-all;
		}

		:global(:where(ul, ol)) {
			padding-left: 1.5rem;
			margin-bottom: 1rem;
			line-height: 1.4;
		}

		:global(ul) {
			list-style: disc;
		}

		:global(ol) {
			list-style: decimal;
		}

		:global(a) {
			color: #0074d3;
			text-decoration: underline;
		}

		:global(figure) {
			margin-bottom: 1rem;
			@include mq(md) {
				width: fit-content;
				width: -moz-fit-content;
			}
		}

		:global(img) {
			width: auto;
			max-height: 480px;
		}

		:global(figcaption) {
			display: table;
			margin: 0.5rem auto 0;
			font-size: $sm;
		}
	}
</style>

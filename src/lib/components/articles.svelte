<script lang="ts">
	import type { Article } from '$lib/types';
	import { PUBLIC_PER_PAGE } from '$env/static/public';
	import { formatDate, getPageNationArray } from '$lib/functions/utils';

	export let articles: Article[],
		totalCount: null | number = null,
		current: null | number = null;

	$: isVisiblePageNation = totalCount && current && totalCount > (Number(PUBLIC_PER_PAGE) || 10);
	$: pageNationArray = getPageNationArray(totalCount);
</script>

<ul class="articles">
	{#each articles as { id, title, eyeCatch, category, publishedAt }}
		<li>
			<a href={`/${category.id}/${id}`}>
				{#if eyeCatch}
					<img
						src={`${eyeCatch.url}?fm=webp&w=176`}
						alt={title}
						width={eyeCatch.width}
						height={eyeCatch.height}
					/>
				{/if}
				<dl>
					<dt>{title}</dt>
					<dd>
						<span>{category.name}</span>
						<time datetime={formatDate(publishedAt)}>{formatDate(publishedAt)}</time>
					</dd>
				</dl>
			</a>
		</li>
	{/each}
</ul>

{#if isVisiblePageNation}
	<nav class="pagination">
		<ul>
			{#each pageNationArray as i}
				<li>
					{#if current === i}
						{i}
					{:else}
						<a href={i === 1 ? '/' : `/articles/${i}`}>
							{i}
						</a>
					{/if}
				</li>
			{/each}
		</ul>
	</nav>
{/if}

<style lang="scss">
	.articles {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: 0.5rem;
		@include mq(md) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		a {
			display: block;
			position: relative;
			padding-left: calc(100% / 3);
			min-height: 5rem;

			img {
				position: absolute;
				top: 0;
				left: 0;
				width: calc(100% / 3);
				height: 100%;
				object-fit: cover;
			}

			dl {
				padding: 0.5rem;
			}

			dt {
				font-size: $md;
				font-weight: bold;
				line-height: 1.2;
				margin-bottom: 0.25rem;
			}

			dd {
				font-size: $sm;
			}

			span {
				@include link;
			}

			time {
				opacity: 0.8;
			}
		}
	}

	.pagination {
		display: table;
		margin-inline: auto;
		margin-top: 2rem;

		ul {
			display: flex;
			gap: 1rem;
		}

		li,
		a {
			display: grid;
			place-content: center;
		}

		a {
			width: 2rem;
			height: 2rem;
			font-weight: bold;
			text-decoration: underline;
			border: 1px solid $black;
			border-radius: 50%;
		}
	}
</style>

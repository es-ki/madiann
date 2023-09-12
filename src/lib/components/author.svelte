<script>
	const authorName = '執筆者の名前';
	const authorImg = '/logo.png';
	const snsList = [
		{ href: 'https://twitter.com', src: '/x.svg', name: 'X' },
		{ href: 'https://github.com', src: '/github.svg', name: 'github' }
	];
</script>

<aside>
	<figure>
		<img src={authorImg} alt={authorName} width={200} height={200} />
		<figcaption>
			<p>{authorName}</p>
			{#if snsList.length > 0}
				<ul>
					{#each snsList as { href, src, name }}
						<li>
							<a {href} target="_blank" rel="external nofollow noopener noreferrer">
								<img {src} alt={name} width={64} height={64} />
							</a>
						</li>
					{/each}
				</ul>
			{/if}
		</figcaption>
	</figure>

	<div>
		<p>このブログの執筆者のプロフィールです。</p>
		<p>プロフィールはmicroCMSで管理していません。</p>
		<p>プロフィールの変更は、src/lib/components/author.svelteを編集してください。</p>
	</div>
</aside>

<style lang="scss">
	aside {
		padding: 1rem;

		@include mq(lg) {
			grid-area: 1/11 / auto/span 2;
			position: sticky;
			top: 2rem;
			padding: 0;
		}
	}

	figure {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
		@include mq(lg) {
			flex-direction: column;
		}

		:global(> img) {
			width: 3rem;
			border-radius: 50%;
			@include mq(md) {
				width: 4rem;
			}
		}

		p {
			font-weight: bold;
			margin-bottom: 0.25rem;
			@include mq(lg) {
				display: table;
				margin-inline: auto;
				font-size: 1rem;
			}
		}

		ul {
			display: flex;
			align-items: center;
			gap: 1rem;
			@include mq(lg) {
				justify-content: center;
			}
		}

		a {
			display: block;
			width: 1.5rem;
		}
	}

	div {
		font-size: $sm;
		opacity: 0.8;
	}
</style>

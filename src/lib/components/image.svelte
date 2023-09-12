<script lang="ts">
	type Props = {
		src: string;
		alt: string;
	} & Partial<{
		width: string | number;
		height: string | number;
		loading: 'eager' | 'lazy';
		decoding: 'sync' | 'async' | 'auto';
		fetchpriority: 'high' | 'low' | 'auto';
	}>;
	export let props: Props;

	const sizes = [414, 768, 1024, 1280, 1536];
	const { src, alt, ...omitProps } = props;
</script>

{#if src && alt}
	<picture>
		{#each sizes as i}
			<source
				srcSet={`${props.src}?fm=webp&w=${i}`}
				media={`(max-width: ${i}px)`}
				type="image/webp"
			/>
		{/each}
		<img src={`${src}?fm=webp`} {alt} {...omitProps} />
	</picture>
{/if}

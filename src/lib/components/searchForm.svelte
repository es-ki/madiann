<script lang="ts">
	import { goto, afterNavigate } from '$app/navigation';

	$: searchValue = '';
	const changeSearchInput = ({ currentTarget: { value } }: { currentTarget: { value: string } }) =>
		(searchValue = value);
	const submitKeyword = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (searchValue) goto(`/search?q=${searchValue}`);
	};
	afterNavigate(() => (searchValue = ''));
</script>

<form on:submit={submitKeyword}>
	<input type="text" on:change={changeSearchInput} value={searchValue} placeholder="サイト内検索" />
	<button type="submit" disabled={!searchValue} aria-label="検索するキーワードを送信するボタン">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="icon icon-tabler icon-tabler-search"
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
			<path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
			<path d="M21 21l-6 -6" />
		</svg>
	</button>
</form>

<style lang="scss">
	form {
		display: flex;

		input {
			flex: 1;
			padding: 0.5rem 0.75rem;
			border: 1px solid $black;
			border-right: none;
			border-radius: 0.5rem 0 0 0.5rem;
			@include mq(lg) {
				padding-block: 0.25rem;
			}
		}

		button {
			display: grid;
			place-content: center;
			width: 2rem;
			padding-right: 0.125rem;
			border: 1px solid $black;
			border-radius: 0 0.5rem 0.5rem 0;

			svg {
				width: $lg;
				height: $lg;
				transition: opacity 0.2s ease-out;
			}

			&:disabled {
				opacity: 1;

				svg {
					opacity: 0.4;
				}
			}
		}
	}
</style>

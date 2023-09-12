<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms/client';
	import type { Comment } from '$lib/types';
	export let dataForm, articleId: string;

	let comments: Comment[] = [];
	$: comments = [];
	$: submitErr = '';
	const fetchComments = async () => {
		const res = await fetch(`/api/comment?id=${articleId}`);
		const json = await res.json();
		comments = json;
	};
	const { form, errors, constraints, enhance } = superForm(dataForm, {
		resetForm: true,
		onResult: async ({ result, cancel }) => {
			if (result.type === 'failure') {
				submitErr = result.data?.message || '予期せぬエラーが発生しました。';
				return cancel();
			}
			if (result.type === 'success') {
				await fetchComments();
				window.scrollTo(0, document.body.scrollHeight);
			}
		}
	});
	afterNavigate(async () => {
		await fetchComments();
	});
</script>

<section>
	<h2>コメント</h2>
	<form method="POST" id="form" use:enhance>
		<label for="name">お名前<span>{$form.name.length} / {$constraints.name?.maxlength}</span></label
		>
		<input type="text" id="name" name="name" bind:value={$form.name} {...$constraints.name} />
		{#if $errors.name}<p>{$errors.name}</p>{/if}

		<label for="body">本文<span>{$form.body.length} / {$constraints.body?.maxlength}</span></label>
		<textarea id="body" name="body" bind:value={$form.body} {...$constraints.body} />
		{#if $errors.body}<p>{$errors.body}</p>{/if}

		<button disabled={!$form.name || !$form.body}>送信</button>
		{#if submitErr}<p>{submitErr}</p>{/if}
	</form>

	{#if comments?.length > 0}
		<div class="comments">
			{#each comments as { name, date, body }, i}
				<dl id={comments.length === i + 1 ? 'last' : `c${i + 1}`}>
					<dt>
						<span>{i + 1}</span>
						<strong>{name}</strong>
						<time datetime={date}>{date}</time>
					</dt>
					<dd>{body}</dd>
				</dl>
			{/each}
		</div>
	{/if}
</section>

<style lang="scss">
	section {
		padding: 2rem 1rem;
		@include mq(lg) {
			padding-inline: 0;
		}

		h2 {
			margin-bottom: 1rem;
		}
	}

	input,
	textarea {
		width: 100%;
		padding: 0.5rem;
		margin-bottom: 1rem;
		border: 1px solid $black;
		border-radius: 0.5rem;
	}

	textarea {
		min-height: 10rem;
		resize: vertical;
	}

	button {
		display: block;
		background: $black;
		color: $white;
		padding: 0.5rem 1rem;
		margin-left: auto;
		border-radius: 0.25rem;
	}

	label {
		display: flex;
		justify-content: space-between;
	}

	form p {
		&:not(:last-of-type) {
			font-size: $sm;
			margin-bottom: 1rem;
		}

		&:last-of-type {
			display: table;
			margin: 1rem 0 0 auto;
		}
	}

	.comments {
		margin-top: 2rem;

		dl:not(:last-of-type) {
			margin-bottom: 1rem;
		}

		dt {
			margin-bottom: 0.5rem;
			font-size: $sm;

			> *:not(:first-child) {
				margin-left: 0.5rem;
			}
		}

		dd {
			white-space: pre-line;
		}
	}
</style>

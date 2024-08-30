<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import type { Comment } from '$lib/types';
	import { superForm } from 'sveltekit-superforms/client';
	export let dataForm, articleId: string;

	let comments: Comment[] = [];
	let submitErr = '';
	let isSubmitting = false;
	const fetchComments = async () => {
		const res = await fetch(`/api/comment?id=${articleId}`);
		const json = await res.json();
		comments = json;
	};
	const { form, errors, constraints, enhance } = superForm(dataForm, {
		resetForm: true,
		SPA: true,
		validators: false,
		onUpdate: async ({ form }) => {
			if (!form.valid) return;
			isSubmitting = true;
			try {
				await fetch('/api/comment', {
					method: 'POST',
					headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
					body: JSON.stringify({ ...form.data, articleId })
				});
				await fetchComments();
				window.scrollTo(0, document.body.scrollHeight);
			} catch (err) {
				console.log(err);
				submitErr = 'コメントの投稿に失敗しました。';
			} finally {
				isSubmitting = false;
			}
		}
	});
	afterNavigate(async () => {
		await fetchComments();
	});
</script>

<section>
	<h2>コメント</h2>
	<form id="form" method="POST" use:enhance>
		<label for="name">お名前<span>{$form.name.length} / {$constraints.name?.maxlength}</span></label
		>
		<input type="text" id="name" name="name" bind:value={$form.name} {...$constraints.name} />
		{#if $errors.name}<p>{$errors.name}</p>{/if}

		<label for="body">本文<span>{$form.body.length} / {$constraints.body?.maxlength}</span></label>
		<textarea id="body" name="body" bind:value={$form.body} {...$constraints.body} />
		{#if $errors.body}<p>{$errors.body}</p>{/if}

		<button disabled={!$form.name || !$form.body || isSubmitting}>送信</button>
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

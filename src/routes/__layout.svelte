<script lang="ts" context="module">
	import '../app.css';
	import { quizzes } from '$lib/quizzes';
	import type { Load } from './__types/__layout';
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/stores';

	export const load: Load = () => {
		const quizMap: { [key: string]: true } = {};
		quizzes.forEach((quiz) => {
			if (!quiz.slug.match(/^[a-z\-\d]+$/gm)) {
				throw Error(
					`Only lowercase alphanumeric characters and hyphens are allowed in slugs. Found: ${quiz.slug}.`
				);
			}

			if (quizMap[quiz.slug]) {
				throw Error(
					`Found slug ${quiz.slug} listed more than once in quizzes. Slugs must all be unique.`
				);
			}

			quizMap[quiz.slug] = true;
		});

		return {
			stuff: {
				title: 'Home',
				quizzes,
			},
		};
	};
</script>

<svelte:head>
	<title>{$page.stuff.title} | svelte-quiz</title>
</svelte:head>

<Header title={$page.stuff.title} />
<slot />

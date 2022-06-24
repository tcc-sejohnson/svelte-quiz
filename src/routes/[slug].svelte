<script lang="ts" context="module">
	import type { Load } from './__types/[slug]';

	export const load: Load = async ({ fetch, params }) => {
		const resp = await fetch(`${params.slug}/__data.json`);
		const { quiz } = (await resp.json()) as { quiz: TimelineQuiz };

		return {
			props: {
				quiz,
			},
			stuff: {
				title: quiz.title,
			},
		};
	};
</script>

<script lang="ts">
	import Quiz from '$lib/components/Quiz.svelte';
	import type { TimelineQuiz } from '$lib/quizzes';
	export let quiz: TimelineQuiz;
</script>

<Quiz {quiz} />

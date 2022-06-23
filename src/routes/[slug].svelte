<script lang="ts" context="module">
	import type { Load } from './__types/[slug]';

	export const load: Load = ({ params, stuff }) => {
		if (stuff.quizzes === undefined) {
			throw Error('Could not find quizzes.');
		}

		const quiz = stuff.quizzes.find((quiz) => params.slug === quiz.slug);

		if (quiz === undefined) {
			throw Error(`Could not find a quiz with the slug ${params.slug}`);
		}

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

<script lang="ts">
	import { goto } from '$app/navigation';
	import type { TimelineQuiz } from '$lib/quizzes';

	export let metadata: Array<Omit<TimelineQuiz, 'expect'>>;
</script>

<div
	class="
  flex flex-col items-center justify-center
  pt-6"
>
	<h1>Available Quizzes</h1>
	<ul class="mt-4 flex flex-col space-y-4">
		{#each metadata as quizMetadata (quizMetadata.slug)}
			<a
				href={quizMetadata.slug}
				sveltekit:prefetch
				class="
        flex flex-col items-center justify-center
        p-4 min-h-12 h-fit border border-gray-600
        cursor-pointer"
				on:click={() => goto(quizMetadata.slug)}
			>
				<li>{quizMetadata.title}</li>
			</a>
		{/each}
	</ul>
</div>

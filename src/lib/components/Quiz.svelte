<script lang="ts">
	import type { TimelineQuiz } from '$lib/quizzes';
	import { dndzone } from 'svelte-dnd-action';
	import QuestionCard from './QuestionCard.svelte';

	export let quiz: TimelineQuiz;

	let shouldReset = false;

	type dragItem = {
		id: number;
		title?: string;
		body: string;
		correct?: boolean;
	};

	let startItems: Array<dragItem> = [];
	let endItems: Array<dragItem> = [];

	const getStartingItems = (): Array<dragItem> => {
		return quiz.expect
			.map((timelineItem, id) => {
				return {
					value: {
						id,
						title: timelineItem.title,
						body: timelineItem.body,
					},
					sort: Math.random(),
				};
			})
			.sort((a, b) => a.sort - b.sort)
			.map(({ value }) => value);
	};

	const reset = () => {
		startItems = getStartingItems();
		endItems = [];
		shouldReset = false;
	};

	const flipDurationMs = 200;

	const handleStartChange = (e: CustomEvent<DndEvent>) => {
		startItems = e.detail.items as Array<dragItem>;
	};

	const handleEndChange = (e: CustomEvent<DndEvent>) => {
		endItems = e.detail.items as Array<dragItem>;
	};

	const check = () => {
		shouldReset = true;
		endItems = endItems.map((item, i) => {
			if (item.id === i) {
				item.correct = true;
			} else {
				shouldReset = false;
				item.correct = false;
			}
			return item;
		});
	};

	reset();
</script>

<div class="flex w-full justify-evenly space-x-6 p-6">
	<ul
		class="flex items-stretch flex-col space-y-4 basis-5/12"
		use:dndzone={{ items: startItems, flipDurationMs }}
		on:consider={handleStartChange}
		on:finalize={handleStartChange}
	>
		{#each startItems as item (item.id)}
			<QuestionCard title={item.title} body={item.body} correct={item.correct} />
		{/each}
	</ul>

	<ul
		class="flex items-stretch flex-col space-y-4 basis-5/12"
		use:dndzone={{ items: endItems, flipDurationMs }}
		on:consider={handleEndChange}
		on:finalize={handleEndChange}
	>
		{#each endItems as item (item.id)}
			<QuestionCard title={item.title} body={item.body} correct={item.correct} />
		{/each}
	</ul>
</div>
<div class="flex w-full justify-center p-6">
	<button
		class="dark:bg-gray-100 dark:text-gray-800 bg-gray-800 text-gray-100 p-4 hover:bg-opacity-50"
		on:click={!shouldReset ? check : reset}>{!shouldReset ? 'Check' : 'Reset'}</button
	>
</div>

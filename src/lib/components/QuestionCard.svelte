<script lang="ts">
	export let title: string | undefined;
	export let body: string;
	export let correct: boolean | undefined;

	const getContainerColorClasses = (correct: boolean | undefined): string => {
		if (correct === undefined) {
			return 'border-gray-600';
		} else if (correct) {
			return 'bg-submarine-500 border-submarine-600';
		} else {
			return 'bg-coral-500 border-coral-500';
		}
	};

	const getTitleColorClasses = (correct: boolean | undefined): string => {
		if (correct === undefined) {
			return 'text-saffron-700';
		} else if (correct) {
			return 'text-gray-50';
		} else {
			return 'text-gray-900';
		}
	};

	const getBodyColorClasses = (correct: boolean | undefined): string => {
		if (correct === undefined) {
			return '';
		} else if (correct) {
			return 'text-gray-50';
		} else {
			return 'text-gray-900';
		}
	};
</script>

<li
	class="
  flex flex-col items-center justify-center
  p-4 min-h-12 h-fit border {getContainerColorClasses(correct)}
  cursor-pointer"
>
	{#if title}
		<h2 class={getTitleColorClasses(correct)}>{title}</h2>
	{/if}
	<div class={getBodyColorClasses(correct)}>{body}</div>
</li>

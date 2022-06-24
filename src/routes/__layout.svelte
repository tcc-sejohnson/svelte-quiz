<script lang="ts" context="module">
	import '../app.css';
	import type { Load } from './__types/__layout';
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/stores';

	export const load: Load = () => {
		return {
			stuff: {
				title: 'Home',
			},
		};
	};
</script>

<svelte:head>
	<title>{$page.stuff.title} | svelte-quiz</title>
</svelte:head>

<Header title={$page.stuff.title} />
<slot />

<script lang="ts" context="module">
	import type { Load } from './__types/__error';
	export const load: Load = ({ error, status }) => {
		return {
			props: {
				error,
				status,
			},
		};
	};
</script>

<script lang="ts">
	export let error: Error;
	export let status: number;
</script>

<h1 class="text-4xl">{status}</h1>
<p>{error.message}</p>

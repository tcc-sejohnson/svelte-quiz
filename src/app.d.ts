/// <reference types="@sveltejs/kit" />

declare type DndEvent = import('svelte-dnd-action').DndEvent;
declare namespace svelte.JSX {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface HTMLAttributes<T> {
		onconsider?: (event: CustomEvent<DndEvent> & { target: EventTarget & T }) => void;
		onfinalize?: (event: CustomEvent<DndEvent> & { target: EventTarget & T }) => void;
	}
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	interface Stuff {
		quizzes: Array<import('$lib/quizzes').TimelineQuiz>;
		title: string;
	}
}

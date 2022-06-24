import { getQuiz, type TimelineQuiz } from '$lib/quizzes';
import type { RequestHandler } from './__types/[slug]';

export const get: RequestHandler = async ({ params }) => {
	const quiz: TimelineQuiz = await getQuiz(params.slug);

	return {
		body: {
			quiz,
		},
	};
};

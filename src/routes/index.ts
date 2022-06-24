import type { RequestHandler } from './__types';
import { getQuizzesMetadata } from '$lib/quizzes';

/**
 * Get all of the quizzes listed in the associated Google Sheet.
 */
export const get: RequestHandler = async () => {
	const metadata = await getQuizzesMetadata();

	return {
		body: {
			metadata,
		},
	};
};

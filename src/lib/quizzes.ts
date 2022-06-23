export type Event = {
	body: string;
	title?: string;
};

export type TimelineQuiz = {
	slug: string;
	title: string;
	expect: Readonly<Array<Event>>;
};

export const quizzes: Array<TimelineQuiz> = [
	{
		slug: 'test-quiz',
		title: 'Test Quiz',
		expect: [
			{
				body: 'First',
			},
			{
				body: 'Second',
			},
			{
				body: 'Third',
			},
			{
				body: 'Fourth',
			},
		],
	},
	{
		slug: 'test-quiz-2',
		title: 'Test Quiz 2',
		expect: [
			{
				body: 'First',
			},
			{
				body: 'Second',
			},
			{
				body: 'Third',
			},
			{
				body: 'Fourth',
			},
		],
	},
];

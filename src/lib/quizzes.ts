import { sheets, getValueAtRowIndex } from '$lib/google-sheets';
import type { sheets_v4 } from 'googleapis';

export type TimelineQuizEvent = {
	body: string;
	title?: string;
};

export type TimelineQuiz = {
	slug: string;
	title: string;
	readonly expect: Array<TimelineQuizEvent>;
};

const getSheetData = (sheet: sheets_v4.Schema$Sheet): Array<sheets_v4.Schema$RowData> => {
	const data = sheet?.data?.[0]?.rowData;
	const title = sheet?.properties?.title ?? '';
	if (!data || data.length === 0) {
		throw Error(`The sheet ${title} was empty.`);
	}
	return data;
};

const parseMetadata = (sheet: sheets_v4.Schema$Sheet): Omit<TimelineQuiz, 'expect'> => {
	const data = getSheetData(sheet);
	const slug = sheet?.properties?.title ?? '';
	const titleIndex = 0;

	const title = data?.[2]?.values?.[titleIndex]?.formattedValue;
	if (!title) {
		throw Error(`Could not find a title for sheet ${slug}`);
	}

	return {
		slug,
		title,
	};
};

const parseQuiz = (sheet: sheets_v4.Schema$Sheet): TimelineQuiz => {
	const data = getSheetData(sheet);
	const { slug, title } = parseMetadata(sheet);

	const eventIndexIndex = 1;
	const eventTitleIndex = 2;
	const eventBodyIndex = 3;

	const events: Array<TimelineQuizEvent> = data
		?.slice(2)
		.map((row, i) => {
			const eventIndex = getValueAtRowIndex(eventIndexIndex, row);
			const eventTitle = getValueAtRowIndex(eventTitleIndex, row) ?? undefined;
			const eventBody = getValueAtRowIndex(eventBodyIndex, row);

			if (!eventIndex) {
				throw Error(`Event index in sheet ${slug} on row ${i + 3} was missing.`);
			}

			if (!eventBody) {
				throw Error(`Event body in sheet ${slug} on row ${i + 3} was missing.`);
			}

			const intIndex = parseInt(eventIndex);

			if (isNaN(intIndex)) {
				throw Error(
					`Event index in sheet ${slug} on row ${
						i + 3
					} was not a valid number. Value: ${eventIndex}`
				);
			}

			return {
				index: intIndex,
				title: eventTitle,
				body: eventBody,
			};
		})
		.sort((a, b) => a.index - b.index)
		.map((e) => ({ title: e.title, body: e.body }));

	return {
		slug,
		title,
		expect: events,
	};
};

export const getQuizzesMetadata = async (): Promise<Array<Omit<TimelineQuiz, 'expect'>>> => {
	const spreadsheet = await sheets.spreadsheets.get({
		spreadsheetId: process.env['QUIZZES_SHEET_ID'],
		includeGridData: true,
	});

	const quizSheets = spreadsheet.data.sheets?.filter(
		(sheet) => sheet?.properties?.title !== 'Template'
	);

	if (!quizSheets || quizSheets.length === 0) {
		throw Error("Didn't find any non-template sheets in the Quizzes Google Sheet.");
	}

	const metadata: Array<Omit<TimelineQuiz, 'expect'>> = quizSheets.map((sheet) =>
		parseMetadata(sheet)
	);

	return metadata;
};

export const getQuiz = async (quizTitle: string): Promise<TimelineQuiz> => {
	const spreadsheet = await sheets.spreadsheets.get({
		spreadsheetId: process.env['QUIZZES_SHEET_ID'],
		includeGridData: true,
		ranges: [`'${quizTitle}'!A:D`],
	});

	const quizSheets = spreadsheet.data.sheets?.filter(
		(sheet) => sheet?.properties?.title !== 'Template'
	);

	if (quizSheets?.length !== 1) {
		throw Error(
			`Tried to retrieve quiz ${quizTitle}, but could not find a sheet matching that name.`
		);
	}

	const quiz = quizSheets[0];

	return parseQuiz(quiz);
};

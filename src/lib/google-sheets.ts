import { google, sheets_v4 } from 'googleapis';
import { browser } from '$app/env';

if (browser) {
	throw Error('Cannot access Google Sheets from the browser.');
}

const auth = new google.auth.JWT(
	process.env['GOOGLE_CLIENT_EMAIL'],
	undefined,
	process.env['GOOGLE_CLIENT_SECRET'],
	['https://www.googleapis.com/auth/spreadsheets'],
	undefined,
	process.env['GOOGLE_CLIENT_SECRET_ID']
);

export const sheets = google.sheets({
	version: 'v4',
	auth: auth,
});

export const getValueAtRowIndex = (index: number, row: sheets_v4.Schema$RowData): string | null => {
	return row?.values?.[index]?.formattedValue ?? null;
};

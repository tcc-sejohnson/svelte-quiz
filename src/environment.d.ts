declare global {
	namespace NodeJS {
		interface ProcessEnv {
			GOOGLE_CLIENT_EMAIL: string;
			GOOGLE_CLIENT_SECRET: string;
			GOOGLE_CLIENT_SECRET_ID: string;
			QUIZZES_SHEET_ID: string;
		}
	}
}

export {};

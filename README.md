# svelte-quiz

This is a timeline-based quiz app. For each quiz, a timeline of events appears on the left in randomized order, and can be dragged to the right. The goal is to drag all items to the right and place them in the correct order.

## Basics

This app is basically a shell rendering content pulled from a Google Sheet. The home page (located in `index.svelte`, with fetching logic located in `index.ts`) retrieves metadata from all of the quizzes and displays a list of them. Each of these tiles links to a quiz, which is handled by `[slug].svelte` with fetching logic in `[slug].ts`.

## Environment

The quiz data comes from a Google Sheet which this app queries using the Google Sheets SDK for Node. It needs four environment variables to work. See `src/environment.d.ts` for their names. For local development, place these environment variables in `.env.private` and run `pnpm dev`. For production, define these variables in Vercel's environment variable config.

## The Google Sheet

This app isn't as smart as it could be -- it's just looking at specific cells and ranges, not trying to parse which columns are located where -- so the order and placement of columns must be static. It also assumes that there is no content below the last quiz item. It implements no filtering for "empty" quiz items, simply iterating from the first quiz item to the bottom of the data returned from the Google Sheets SDK (i.e. it relies on the SDK's behavior of not returning more rows than are populated in a given sheet).

See below for a screenshot of the required sheet layout.

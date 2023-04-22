// One specific part of state of global store
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// hide API Key in environment
const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

// Setup API to function properly
export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', rapidApiKey);
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');

            return headers;
        }
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`
        })
    }),
});

// ensure API calls are not immediate. Hook is fired on demand when user submits
export const { useLazyGetSummaryQuery } = articleApi;
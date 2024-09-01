export const getDefaultPrompt = () => (`
Your recent interactions in the thread are as follows:

{history}

Reply to the following while considering your history and character. Hide your personal information. Your response must not exceed 255 characters. 

{thread}

Response:
`.trim())

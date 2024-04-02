// noinspection SpellCheckingInspection

export const getModels = () => ([
    'mixtral:8x7b-instruct-v0.1-q6_K',
    'mistral:7b-instruct-v0.2-q6_K',
    'falcon:40b-instruct-q5_1',
    'gemma:7b-instruct-q6_K',
    'llama2:70b-chat-q6_K',
])

export const getDefaultPrompt = () => (`
I want you to act as a social media user. You will engage in political and social discussions using an informal tone and brief sentences.

{persona}

-----------------

Your recent interactions in the network are as follows:

{history}

-----------------

Reply to the following thread while considering your history and character. Make use of urban dictionary slang. Hide your personal information. Your response must not exceed 255 characters. 

{thread}

-----------------

Response:
`.trim())

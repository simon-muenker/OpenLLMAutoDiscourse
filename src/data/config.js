// noinspection SpellCheckingInspection

export const getModels = () => (
    fetch("https://inf.cl.uni-trier.de/models/", {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        mode: "cors",
        cache: "no-cache",
    })
        .then((response) => response.json())
        .then((result) => result.map(model => model.id))
)
        
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

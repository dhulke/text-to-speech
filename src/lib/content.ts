const API_URL = "http://localhost:5174/content";

/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */
const fetchContent = async (url = API_URL): Promise<string> => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            return (await response.json()).content;
        }
    } catch(err) {
    }
    return "<speak><s>There was an error</s></speak>";
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string) => {
    if (!isContentValid(content)) {
        throw new Error("Not a valid ssml");
    }
    const sentences = [];
    const sentencesRe = /(<s>.+?<\/s>)+?/g;
    let groups;
    while ((groups = sentencesRe.exec(content)) !== null) {
        sentences.push(groups[0].replace("<s>", "").replace("</s>", ""));
    }
    return sentences;
};

const isContentValid = (content: string) => {
    console.log(content);
    const basicStructureRe = /^<speak>.+<\/speak>$/;
    return basicStructureRe.test(content);
}

export { fetchContent, parseContentIntoSentences };

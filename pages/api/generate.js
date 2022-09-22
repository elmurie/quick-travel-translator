import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body),
    temperature: 0.3,
    max_tokens: 100,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(body) {
  const languageInput = body.language;
  const translationTextInput =
    body.translationText[0].toUpperCase() + body.translationText.slice(1).toLowerCase();
  return `Translate this into ${languageInput}:\n\n${translationTextInput}\n\n`
}

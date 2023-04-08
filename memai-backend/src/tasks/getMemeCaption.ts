import { OpenAI } from "langchain/llms";
import { LLMChain } from "langchain/chains";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  PromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { ChatOpenAI } from "langchain/chat_models";

const getMemeCaption = async (imageDescription:string, context: string) => {
	const model = new OpenAI({ temperature: 1, modelName: "gpt-4" });
	const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      `You are a helpful assistant that creates captions for memes. You are given a description of an image and some context you must create a caption for it.  The caption should be funny and relevant to the image and context. The caption should be a short (max 5 words) and in spanish`
    ),
    HumanMessagePromptTemplate.fromTemplate(`
			context: {context}
			description: {imageDescription}
		`),
  ]);

	const chain = new LLMChain({
		llm: model,
		prompt: chatPrompt,
	});

	return await chain.call({
		context,
		imageDescription,
	})
};

export default getMemeCaption;
import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';

async function describeImage(imagePath: string, model: string): Promise<string> {
  try {
    // Read the image file
    const imageData = fs.readFileSync(imagePath);

    // Send the image to the Hugging Face model
    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY_HUGGINFACE}`,
      },
      method: 'POST',
      body: imageData,
    });

    // Get the response JSON and extract the generated text
    const result: any = await response.json();
    const generatedText = result[0]?.generated_text;

    return generatedText;
  } catch (error) {
    console.error('Error:', error);
    return '';
  }
}

export default describeImage;
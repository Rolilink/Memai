import sharp from 'sharp';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

async function createMeme(inputImagePath: string, caption: string, outputDir: string): Promise<string | null> {
  try {
    const image = sharp(inputImagePath);

    const { width, height } = await image.metadata();

    const fontSize = Math.round((width ?? 100) * 0.05);
    const textOffset = fontSize * 0.5;

    const svgCaption = `
      <svg width="${width}" height="${height}">
        <text x="50%" y="${(height ?? 0) - textOffset}" font-size="${fontSize}" font-family="Impact" fill="#fff" stroke="#000" stroke-width="1" text-anchor="middle" alignment-baseline="middle">
          ${caption}
        </text>
      </svg>
    `;

    const outputFileName = uuidv4() + '.jpg';
    const outputImagePath = path.join(outputDir, outputFileName);

    await image
      .composite([{ input: Buffer.from(svgCaption), blend: 'atop' }])
      .toFile(path.resolve(outputImagePath));

    console.log(`Meme created: ${outputImagePath}`);
    return outputImagePath;
  } catch (error) {
    console.error('Error creating meme:', error);
    return null;
  }
}

export default createMeme;
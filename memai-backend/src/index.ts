import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import describeImage from './tasks/describeImage.js';
import getMemeCaption from './tasks/getMemeCaption.js';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Memai Backend API',
      version: '1.0.0',
      description: 'API for the Memai Backend',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
  },
  apis: ['./src/index.ts'], // Update this path to match your route files location
};

dotenv.config();

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Configure file upload storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const app = express();
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/api-docs-json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocs);
});


/**
 * @swagger
 * /createMeme:
 *   post:
 *     summary: Create a meme
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: The created meme
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
app.post('/createMeme', upload.single('image'), async (req: Request, res: Response) => {
  const description = req.body.description;

  if (!req.file) {
    return res.status(400).json({ message: 'Image is required' });
  }

  if (!description) {
    return res.status(400).json({ message: 'Description is required' });
  }

	// Process the image and description with huggingface API and OpenAI API to generate a meme

	// We use describeImage to generate a description for the image using the Hugging Face API
	const generatedDescription = await describeImage(req.file.path, 'nlpconnect/vit-gpt2-image-captioning');

  // We use getMemeCaption to generate a caption for the image using the OpenAI API
  const generatedCaption = await getMemeCaption(generatedDescription, description);

  res.status(200).json({
    message: 'Meme created successfully',
    image: req.file.path,
    caption: generatedCaption,
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
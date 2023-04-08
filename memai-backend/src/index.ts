import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';

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

app.post('/createMeme', upload.single('image'), (req: Request, res: Response) => {
  const description = req.body.description;

  if (!req.file) {
    return res.status(400).json({ message: 'Image is required' });
  }

  if (!description) {
    return res.status(400).json({ message: 'Description is required' });
  }

	// Process the image and description with huggingface API and OpenAI API to generate a meme
	

  res.status(200).json({
    message: 'Meme created successfully',
    image: req.file.path,
    description: description,
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
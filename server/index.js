import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { Groq } from 'groq-sdk';

dotenv.config();

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.post('/api/analyze-image', upload.single('image'), async (req, res) => {
  try {
    const base64Image = req.file.buffer.toString('base64');
    
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this receipt image and extract all food items with their quantities. Format the response as a JSON array with objects containing 'name' (normalized product name), 'quantity', and 'unit'. Only include food items. If the image is not a food receipt, return an error message."
            },
            {
              type: "image",
              image: base64Image
            }
          ]
        }
      ],
      model: "mixtral-8x7b-32768",
    });

    res.json({ result: completion.choices[0]?.message?.content });
  } catch (error) {
    console.error('Error analyzing image:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import { getMarkdown } from './docConverter';
import multer from "multer";
import mammoth from 'mammoth'
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = 3001;
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function convertDocxToHtml(buffer: Buffer) {
    try {
      const result = await mammoth.convertToHtml({ buffer: buffer });
      const html = result.value; // HTML string with tables and paragraphs preserved
      return html;
    } catch (err) {
      console.error('Error converting docx:', err);
      throw err;
    }
}

app.post('/generate', upload.single('file'), async (req, res) => {
    console.log('request recieved')
    const examples = req.file;
    console.log(examples);

    let result;
    if (examples) {
        result = await mammoth.convertToHtml({
            buffer: examples.buffer,
          });
    }
    console.log('file converted');
    console.log(result);

    const {textbooks, chapters, duration, title} = req.body;

    const prompt = `Here are the ${textbooks} I want to make my lesson plans based on. The lesson plan should be in point form
                    and there should be practice problems provided taken from the textbook.
                    I want the lesson plan to be made for these ${chapters} from the textbook and the lesson plan should cover a ${duration} hour long class.
                    Here are example(s) of exactly what the structure the lesson plans should have. ${result}
                    Finally, the name/title of the lesson plan should be ${title}
                    `
    
    const gptResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            { 
                role:'system', 
                content: `You are a teaching assistant that generates detailed lesson plans from a given textbook. Only use information and problems found within the given textbook.
                        Always respond in valid Markdown with the following features:
                        - Use '#' for the lesson title
                        - Use '##' for main sections
                        - Use bullet points or numbered lists for sub-points
                        - Use bold for labels
                        - Use '---' for horizontal dividers
                        - Use Markdown tables when structuring timelines or resources
                        Do not collapse everything into a single numbered list.`
            },
            {
                role:'user',
                content:prompt
            },
        ],
    });

    console.log('gpt response');
    res.json({ response: gptResponse})
})

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
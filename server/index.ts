import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post('/generate', async (req, res) => {
    console.log("Request received!");
    const { textbooks, chapters, duration } = req.body;
    const prompt = `Here are the ${textbooks} I want to make my lesson plans based on. The lesson plan should be in point form and should be succint and not detailed
                    and there should be practice problems provided.
                    I want the lesson plan to be made for these ${chapters} and the lesson plan should cover a ${duration} hour long class
                    The response should be in a table format. Here are a few examples of what the lesson place should look like. 
                    Please format the math problems properly and not as I've done

                    |----------------------------------|----------------------------|
                    |Itinerary:                        |Problems
                    |   Review on functions            |    Lim x->0 y=sinx
                    |       What is it?                |    Lim x->0 y=1/x
                    |       Additive f(x+a)            |    
                    |       Quick straight line graph  |
                    |   Why calculus? (why derivatives)|
                    |       Y = mx + b meaning         |
                    |       Relate to derivatives      |
                    |        and why calculus          |
                    |   Limits                         |
                    |       Definition of limit        |
                    |       Limit from + and -         |
                    |       Calculating limits         |
                    |       Plugging in values         |
`
    
    const gptResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role:'user', content: prompt }],
    });

    res.json({ response: gptResponse})
})

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

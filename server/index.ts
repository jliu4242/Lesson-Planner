import express from 'express';
import cors from 'cors'; // ✅ required import

const app = express();
const PORT = 3001;

app.use(cors()); // ✅ must come after the import

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/v1/analysis/public', (req, res) => {
    
});

// 서버 구동
app.listen(PORT, () => {
    console.log(`🚀 Mock Server is running on http://localhost:${PORT}`);
});
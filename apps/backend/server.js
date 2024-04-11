const express = require('express');
const cors = require('cors');
const HOST = 'localhost' || process.env.HOST;
const PORT = 3000 || process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});

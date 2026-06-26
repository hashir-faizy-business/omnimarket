import express from 'express';
const app = express();
app.get('/', (req, res) => res.send('OK'));
app.listen(3007, '0.0.0.0', () => console.log('Simple server running'));

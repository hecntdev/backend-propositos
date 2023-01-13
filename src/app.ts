import express from 'express';
const app = express();
const port = 3002;

app.get('/', (req, res) => {
  res.send('Hello World 123!');
});

app.get('/hola', (req, res) => {
    res.send('hola');
  });

app.listen(port, () => {
  return console.log(`Express is listening ssa at http://localhost:${port}`);
});
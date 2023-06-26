import express from 'express'
import path from 'path';
const app = express();

const PORT = 3000;

// we need something to parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//request to router
app.use('/test', (req,res) => res.send('IT WORKS'));


// if running from production, serve bundled files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(path.resolve(), 'dist')));
  app.get('/*', function (req, res) {
    res.sendFile(path.join(path.resolve(), 'dist', 'index.html'));
  });
}

//catch-all route handler for any requests
app.use((req, res) => res.status(404).send('This page does not exist'));

//express error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// start server

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

export default server;

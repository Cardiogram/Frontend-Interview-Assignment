const express = require('express');
const insurers = require('../public/data/insurers/insurers.json');

const app = express();
const port = 3000;

app.get('/api/insurers', (req, res) => {
  console.log(req.query.search);
  res.json(insurers);
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));

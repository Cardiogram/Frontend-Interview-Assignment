const express = require('express');
const cors = require('cors');
const insurers = require('../public/data/insurers/insurers.json');

// Start up express server.
const app = express();
const port = 5000;

// Set up CORS since the client is on a different port.
app.use(cors());

// Initial API endpoint to get insurers.
app.get('/api/insurers', (req, res) => {
  console.log(req.query.search);
  res.json(insurers);
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));

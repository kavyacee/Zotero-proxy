const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/zotero', async (req, res) => {
  const { userID, apiKey, collectionKey, start = 0, limit = 100 } = req.query;
  const url = `https://api.zotero.org/users/${userID}/collections/${collectionKey}/items?format=json&key=${apiKey}&start=${start}&limit=${limit}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from Zotero');
  }
});

app.get('/', (req, res) => {
  res.send('Zotero Proxy Server is up.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
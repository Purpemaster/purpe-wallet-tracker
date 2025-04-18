const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  const totalUSD = 2414.59 + 898.66 + 544.97;
  const message = `Aktueller Spendenstand: $${totalUSD.toFixed(2)}`;

  const fbPageId = process.env.PAGE_ID;
  const fbToken = process.env.FB_ACCESS_TOKEN;

  try {
    const response = await fetch(`https://graph.facebook.com/v18.0/${fbPageId}/feed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: message,
        access_token: fbToken
      })
    });

    const data = await response.json();
    console.log('Facebook-Antwort:', data);

    if (data.error) {
      console.error('Facebook-Fehler:', data.error);
      res.status(500).send(`Fehler beim Posten: ${data.error.message}`);
    } else {
      res.send('Facebook-Post erfolgreich!');
    }
  } catch (err) {
    console.error('Fehler beim Posten:', err);
    res.status(500).send('Fehler beim Posten');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server läuft auf Port ${PORT}`);
});

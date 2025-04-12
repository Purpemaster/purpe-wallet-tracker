app.get('/', async (req, res) => {
  const totalUSD = 2414.59 + 898.66 + 544.97;
  const message = `Aktueller Spendenstand: $${totalUSD.toFixed(2)}`;

  const fbPageId = process.env.PAGE_ID;
  const fbToken = process.env.FB_ACCESS_TOKEN;

  try {
  const response = await fetch(`https://graph.facebook.com/${fbPageId}/feed`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: message,
      access_token: fbToken,
    }),
  });

  const text = await response.text();
  console.log('Facebook-Antwort als Text:', text);
  res.send('Facebook-Post erfolgreich!');
} catch (err) {
  console.error('Fehler beim Posten:', err);
  res.status(500).send('Fehler beim Posten');
}

    const data = await response.json();
    console.log('Facebook-Antwort:', data);
    res.send('Facebook-Post erfolgreich!');
  } catch (err) {
    console.error('Fehler beim Posten:', err);
    res.status(500).send('Fehler beim Posten');
  }
});

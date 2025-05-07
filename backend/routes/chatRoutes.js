const express = require('express');
const router = express.Router();
const sql = require('mssql');
const axios = require('axios');
const dbConfig = require('../db');

router.post('/chat', async (req, res) => {
  const { prompt } = req.body;

  try {
    const hfRes = await axios.post(
      'https://api-inference.huggingface.co/models/bigcode/sqlcoder',
      { inputs: prompt },
      { headers: { Authorization: `Bearer YOUR_HUGGINGFACE_TOKEN` } }
    );

    const generatedSQL = hfRes.data.generated_text || hfRes.data[0].generated_text;
    console.log('Generated SQL:', generatedSQL);

    await sql.connect(dbConfig);
    const result = await sql.query(generatedSQL);

    res.json({ result: JSON.stringify(result.recordset, null, 2) });
  } catch (err) {
    console.error('Chat Error:', err.message);
    res.status(500).json({ error: 'Chat processing failed.' });
  }
});

module.exports = router;

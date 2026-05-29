require('dotenv').config({ path: '../../.env' }); // up to c:\eduzet
const { GoogleGenerativeAI } = require('@google/generative-ai');

const initGemini = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }
  // No wait, listModels requires googleapis, or maybe there's a different way.
  // We can fetch from https://generativelanguage.googleapis.com/v1beta/models?key=API_KEY
  return apiKey;
};

const listModels = async () => {
  const key = initGemini();
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
  const data = await res.json();
  console.log(data.models.map(m => m.name));
};

listModels();

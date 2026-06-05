import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { GoogleGenAI, Modality } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini API Key from environment
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

  // API Routes
  app.post("/api/gemini/sentence", async (req, res) => {
    if (!ai) return res.status(500).json({ error: "Gemini API key not configured" });
    const { sentence } = req.body;
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a Tamil language teacher for Grade 4 students. 
        Analyze the following Tamil sentence: "${sentence}".
        
        Check for:
        1. Correct subject-object-verb order.
        2. Correct case endings (Vethrumai Urupu).
        3. Spelling mistakes.
        
        Provide a very short, encouraging feedback message in English, suitable for a 4th grader. 
        If it's good, say "Great job! [Correct English translation]". 
        If incorrect, kindly explain why in 1 sentence.`,
      });
      res.json({ text: response.text });
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "Failed to analyze sentence" });
    }
  });

  app.post("/api/gemini/form-sentence", async (req, res) => {
    if (!ai) return res.status(500).json({ error: "Gemini API key not configured" });
    const { words } = req.body;
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Task: Create a grammatically correct Tamil sentence combining these words/concepts: [${words.join(', ')}].
        
        Rules:
        1. Arrange them in the correct Subject-Object-Verb (SOV) order.
        2. Apply necessary Case Endings (Vethrumai Urupu) to nouns.
        3. Place adjectives before the nouns they modify.
        4. Conjugate the verb to match the Subject (Gender/Number).
        5. IMPORTANT: If a verb has a tense specified (e.g. "Go (future tense)"), you MUST use that tense.
        6. Output ONLY the final Tamil sentence. Do not add English or explanations.`,
      });
      res.json({ text: response.text });
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "Failed to form sentence" });
    }
  });

  app.get("/api/gemini/story-prompt", async (req, res) => {
    if (!ai) return res.status(500).json({ error: "Gemini API key not configured" });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Generate a short, fun writing prompt for a Grade 4 Tamil student involving 'Animals' or 'Family'. Provide the prompt in Tamil and English.",
      });
      res.json({ text: response.text });
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "Failed to generate prompt" });
    }
  });

  app.post("/api/gemini/simple-story", async (req, res) => {
    if (!ai) return res.status(500).json({ error: "Gemini API key not configured" });
    const { topic } = req.body;
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Write a very simple, 5-sentence story in Tamil for a Grade 4 student about: "${topic}". 
        Also provide the English translation.
        
        Output Format JSON:
        {
          "tamil": "Tamil text here...",
          "english": "English translation here..."
        }
        Do not use markdown code blocks. Just the JSON.`,
        config: { responseMimeType: "application/json" }
      });
      res.json(JSON.parse(response.text || "{}"));
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "Failed to generate story" });
    }
  });

  app.post("/api/gemini/tts", async (req, res) => {
    if (!ai) return res.status(500).json({ error: "Gemini API key not configured" });
    const { text } = req.body;
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: {
          parts: [{ text: `Pronounce clearly: ${text}` }]
        },
        config: {
          responseModalities: ["AUDIO" as Modality],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' } 
            }
          }
        }
      });
      
      const parts = response.candidates?.[0]?.content?.parts;
      let audioData = null;
      if (parts) {
          for (const part of parts) {
              if (part.inlineData && part.inlineData.data) {
                  audioData = part.inlineData.data;
                  break;
              }
          }
      }
      res.json({ audio: audioData });
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "Failed to generate speech" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);

    app.get('*all', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const fs = await import('fs');
        let template = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

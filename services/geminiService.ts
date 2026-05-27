export const checkSentenceWithGemini = async (sentence: string): Promise<string> => {
  try {
    const response = await fetch("/api/gemini/sentence", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sentence }),
    });
    const data = await response.json();
    return data.text || "Could not analyze sentence.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I couldn't connect to the teacher right now. Try again later!";
  }
};

export const formTamilSentence = async (words: string[]): Promise<string> => {
  try {
    const response = await fetch("/api/gemini/form-sentence", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ words }),
    });
    const data = await response.json();
    return data.text || "Could not form sentence.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error forming sentence. Please try again.";
  }
};

export const generateStoryPrompt = async (): Promise<string> => {
  try {
    const response = await fetch("/api/gemini/story-prompt");
    const data = await response.json();
    return data.text || "Write about your favorite animal.";
  } catch {
    return "Write about your favorite animal.";
  }
};

export const generateSimpleStory = async (topic: string): Promise<{ tamil: string; english: string }> => {
  try {
    const response = await fetch("/api/gemini/simple-story", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });
    return await response.json();
  } catch (error) {
    console.error("Story Gen Error", error);
    return { 
      tamil: "ஒரு காட்டில் ஒரு சிங்கம் இருந்தது. அது மிகவும் பசியாக இருந்தது.", 
      english: "There was a lion in a forest. It was very hungry." 
    };
  }
};

export const generateTamilSpeech = async (text: string): Promise<string | null> => {
  try {
    const response = await fetch("/api/gemini/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    return data.audio;
  } catch (error) {
    console.error("Gemini TTS Error:", error);
    return null;
  }
};
import type { Express } from "express";
import { createServer, type Server } from "http";
import OpenAI from "openai";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/chat", async (req, res) => {
    try {
      const apiKey = req.headers['x-api-key'] as string;

      if (!apiKey) {
        return res.status(401).json({ error: "Missing API Key" });
      }

      const { messages, model } = req.body;

      if (!messages || !model) {
        return res.status(400).json({ error: "Missing messages or model" });
      }

      // Initialize OpenAI client with the user's key
      const openai = new OpenAI({ apiKey });

      const response = await openai.chat.completions.create({
        model: model,
        messages: messages,
        stream: false, // For simplicity in calculating tokens accurately in this demo
      });

      const completion = response.choices[0]?.message?.content || "";
      const usage = response.usage;

      res.json({
        content: completion,
        usage: {
          prompt_tokens: usage?.prompt_tokens || 0,
          completion_tokens: usage?.completion_tokens || 0,
          total_tokens: usage?.total_tokens || 0
        }
      });
    } catch (error: any) {
      console.error('OpenAI API Error:', error);
      res.status(500).json({ error: error.message || "Failed to process chat request" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
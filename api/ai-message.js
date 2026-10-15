export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL;
  if (!apiKey || !model) return res.status(503).json({ error: "AI is not configured" });

  const { recipientName = "someone special", event = "special occasion", tone = "Warm", details = "" } = req.body || {};
  const instruction = `Write one polished personal message for a digital surprise website. Recipient: ${recipientName}. Occasion: ${event}. Tone: ${tone}. Extra context: ${details || "none"}. Keep it sincere, specific-sounding, tasteful, and between 90 and 150 words. Avoid clichés, headings, hashtags, and quotation marks. Return only the message.`;

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model, input: instruction, max_output_tokens: 260 }),
    });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data?.error?.message || "AI request failed" });

    const message = data.output_text || data.output?.flatMap(item => item.content || []).map(part => part.text || "").join("").trim();
    if (!message) return res.status(502).json({ error: "No AI response" });
    return res.status(200).json({ message });
  } catch {
    return res.status(500).json({ error: "AI request failed" });
  }
}

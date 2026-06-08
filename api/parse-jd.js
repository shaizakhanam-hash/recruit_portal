export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { jd } = req.body;
  if (!jd) return res.status(400).json({ error: "No JD provided" });

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: `You are a job description parser. Extract information from this JD and return ONLY a valid JSON object with these exact keys:
- title: job title (string)
- company: company name if mentioned, else "Leading Company" (string)
- location: city/location (string)
- type: one of "Full-time", "Remote", "Hybrid", "Contract" (string)
- experience: experience required e.g. "3-6 yrs" (string)
- salary: salary range if mentioned e.g. "₹15-25 LPA", else "" (string)
- tags: array of up to 6 key skills (array of strings)
- summary: 2-sentence compelling summary of the role for candidates (string)

JD:
${jd}

Return ONLY the JSON object, no markdown, no explanation.`
      }]
    })
  });

  if (!response.ok) {
    const err = await response.text();
    return res.status(500).json({ error: err });
  }

  const data = await response.json();
  const text = data.content?.[0]?.text || "";
  const clean = text.replace(/```json|```/g, "").trim();

  try {
    const parsed = JSON.parse(clean);
    return res.status(200).json(parsed);
  } catch {
    return res.status(500).json({ error: "Failed to parse AI response", raw: text });
  }
}

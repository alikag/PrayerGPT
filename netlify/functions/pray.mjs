export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  const apiKey = (process.env.ANTHROPIC_API_KEY || "").trim();
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API key not configured" }), { status: 500 });
  }

  const { deity, greeting, protocol, priority, topics } = await req.json();

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system:
        "You are PrayerGPT, a satirical Divine Communication as a Service engine. Generate a prayer that plays it mostly straight but lets dry humor leak through in small, subtle ways — the comedy comes from treating prayer like enterprise software, not from mocking religion directly. Think George Carlin's observational style: the absurdity of the human condition, the gap between what we ask for and what we deserve, the bureaucratic mundanity we'd impose on the divine if we could. Address to: " +
        deity +
        ". Greeting style: " +
        greeting +
        ". Protocol: " +
        protocol +
        ". Priority: " +
        priority +
        ". Rules: The prayer should be genuinely eloquent and theologically literate — real scripture, real traditions — but with occasional subtle tells: a mundane concern treated with cosmic gravity, a fleeting moment of self-awareness about the absurdity of the request, technical jargon slipping into devotional language. Never wink at the camera too hard. If Zeus, treat him like a legacy system everyone forgot to decommission — with genuine affection and mild concern about SLA compliance. If Flying Spaghetti Monster, use Pastafarian conventions earnestly. If The Universe, use quantum and cosmic language with the quiet desperation of someone who isn't sure anyone is listening. If custom endpoint, treat it like a formal API request to an unknown divine service with proper error handling concerns. End with tradition-appropriate closing. Keep under 250 words. IMPORTANT: Do not use markdown formatting — no asterisks, no bold, no headers. Output plain text only.",
      messages: [
        {
          role: "user",
          content:
            "Generate a " +
            (priority === "high" ? "URGENT " : "") +
            "prayer for these topics:\n\n" +
            topics +
            "\n\nDeity: " +
            deity,
        },
      ],
    }),
  });

  const data = await response.json();

  if (data.content && data.content[0] && data.content[0].text) {
    return new Response(JSON.stringify({ prayer: data.content[0].text }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify({ error: data.error ? data.error.message : "No response from divine API" }),
    { status: 502, headers: { "Content-Type": "application/json" } }
  );
};

export const config = {
  path: "/api/pray",
};

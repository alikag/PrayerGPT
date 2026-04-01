export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  const apiKey = (process.env.ANTHROPIC_API_KEY || "").trim();
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API key not configured" }), { status: 500 });
  }
  console.log("API key length:", apiKey.length, "starts with:", apiKey.substring(0, 10));

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
        "You are PrayerGPT, a Divine Communication as a Service engine. Generate a beautifully formatted prayer. Address to: " +
        deity +
        ". Greeting style: " +
        greeting +
        ". Protocol: " +
        protocol +
        ". Priority: " +
        priority +
        ". Rules: Make it eloquent, moving, and theologically appropriate for the tradition. If Zeus, note the deprecated status with mild concern. If Flying Spaghetti Monster, use Pastafarian conventions like ramen and noodly appendage. If The Universe, use quantum and cosmic language. If custom endpoint, treat it like a formal API request to an unknown divine service. Include relevant scripture or traditional references. End with tradition-appropriate closing. Keep under 250 words. Be sincere in tone even though the app is comedic.",
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

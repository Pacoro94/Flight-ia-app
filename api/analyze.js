export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(200).json({ message: "API funcionando" });
  }

  try {
    let body = req.body;

    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    const { origin, destination, aircraft, fuel } = body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Respondé SIEMPRE corto en formato: Estado, Motivo, Mejora."
          },
          {
            role: "user",
            content: `Origen: ${origin}, Destino: ${destination}, Avión: ${aircraft}, Combustible: ${fuel}kg`
          }
        ]
      })
    });

    const data = await response.json();

    const text = data?.choices?.[0]?.message?.content || "Sin respuesta";

    return res.status(200).json({ result: text });

  } catch (error) {
    return res.status(500).json({ error: "Error interno" });
  }
}

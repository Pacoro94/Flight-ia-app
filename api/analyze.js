export default async function handler(req, res) {
  try {
    const { origin, destination, fuel } = req.body;

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
            role: "user",
            content: `Analiza este vuelo:
Origen: ${origin}
Destino: ${destination}
Combustible: ${fuel} kg.
Decime si es eficiente y por qué.`
          }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json({
      result: data.choices?.[0]?.message?.content || "Error en respuesta IA"
    });

  } catch (error) {
    res.status(500).json({
      result: "Error en el servidor"
    });
  }
}

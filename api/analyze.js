export default async function handler(req, res) {
  try {
    let body;

    try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    } catch (e) {
    return res.status(400).json({ error: "Invalid JSON" });
    }

    const { origin, destination, aircraft, fuel } = body;
    // lógica simple por avión
    let efficiencyFactor = 1;

    if (aircraft?.toLowerCase().includes("737")) efficiencyFactor = 1;
    else if (aircraft?.toLowerCase().includes("a320")) efficiencyFactor = 0.95;
    else if (aircraft?.toLowerCase().includes("787")) efficiencyFactor = 0.8;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: `Respondé SOLO con 3 líneas.

Avión: ${aircraft}
Ruta: ${origin}-${destination}
Fuel: ${fuel}
Factor eficiencia: ${efficiencyFactor}

Formato:
Estado:
Motivo:
Mejora:`
      })
    });

    const data = await response.json();

    const result = data.output?.[0]?.content?.[0]?.text;

    res.status(200).json({
      result: result || "Error en respuesta IA"
    });

  } catch (error) {
    res.status(200).json({
      result: "❌ Error en servidor"
    });
  }
}

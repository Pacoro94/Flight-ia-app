export default async function handler(req, res) {
  try {
    const { origin, destination, fuel, aircraft } = req.body;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: `Respondé SOLO con 3 líneas, sin explicaciones extra.

      Formato obligatorio:

      Estado: (Eficiente o No eficiente)
      Motivo: (máximo 10 palabras)
      Mejora: (máximo 8 palabras)

     Datos:
     Avión: ${aircraft}
     Ruta: ${origin}-${destination}
     Fuel: ${fuel}`
      })
    });

    const data = await response.json();

    const result = data.output?.[0]?.content?.[0]?.text;

    if (!result) {
      return res.status(200).json({ result: "⚠️ No se pudo analizar" });
    }

    res.status(200).json({ result });

  } catch (error) {
    res.status(200).json({ result: "❌ Error en servidor" });
  }
}

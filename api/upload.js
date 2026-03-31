export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    // ⚠️ Por ahora solo confirmamos upload (mock)
    return res.status(200).json({
      message: "PDF recibido correctamente (mock)",
    });
  } catch (error) {
    return res.status(500).json({ error: "Upload error" });
  }
}

import "dotenv/config";
import app from "./app/app.js"

const PORT = process.env.PORT || 3000;


app.get("/", (req, res) => {
    res.json({ mensaje: "API funcionando" });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
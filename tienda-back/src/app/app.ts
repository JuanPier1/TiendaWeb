import express, {type Express} from "express";
import morgan from 'morgan';
import usuarios from "../routes/users.routes";
import productos from "../routes/products.routes";
import categorias from "../routes/categories.routes";
import tarjetas from "../routes/cards.routes";
import auth from "../routes/auth.routes";
import cors from "cors";

const app: Express = express();


app.use(express.json()); // para poder leer JSON del body en req.body
app.use(morgan("dev")); //para solicitudes HTTP
app.use(cors()); //para los puertos distintos entre front y back

app.use("/api", auth)
app.use('/api', usuarios)
app.use('/api', tarjetas)
app.use('/api', productos)
app.use('/api', categorias)

app.get("/", (req, res) => {
    res.send("App");
});

export default app

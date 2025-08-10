import express, {Request,Response} from "express";
import userRouter from "./router/user.Router";

const app = express();
const PORT =  3000;
app.use(express.json());

// ---------
// Example route to create a user
app.get('/', (req, res) => {
  res.send('Hello, World!');    
});


app.use(userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


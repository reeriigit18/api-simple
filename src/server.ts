import express, {Request,Response} from "express";
import userRouter from "./routes/user.routes";
import session from 'express-session';
import passport from './config/passport';
import authRoutes from './routes/auth.routes';
import dotenv from 'dotenv';

const app = express();
const PORT =  3000;
app.use(express.json());

// Middleware

app.use(session({
  secret: 'mysecret', // ควรเก็บใน .env จริงๆ
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// ---------
// Example route to create a user
app.get('/', (req, res) => {
  res.send('Hello, World!');    
});


app.use(userRouter);
app.use( authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


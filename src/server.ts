import express,{Request,Response} from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT =  3000;
app.use(express.json());

// ---------
// Example route to create a user
app.get('/', (req, res) => {
  res.send('Hello, World!');    
});

//inseting a user
app.post('/register', async (req: Request, res: Response) => {
  const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

  try{
    await prisma.user.create({
        data:{
            email : email,
            password
        }
    });
    return res.status(201).json({ message: "User created successfully" });

  }catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Failed to create user" });
  }

});


//selecting all users
app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Failed to fetch users" });
  }
});


//selecting a user by id
app.get('/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Failed to fetch user" });
  }
});


//deleting a user
app.put('/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;  
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  } 
  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { email, password },
    });
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Failed to update user" });
  }
});


//deleting a user
app.delete('/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: "Failed to delete user" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


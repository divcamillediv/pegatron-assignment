import { startServer } from "./server.ts";
import { connectDB } from "./database.ts";

connectDB()
startServer()

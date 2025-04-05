import dotenv from "dotenv";
import { app } from "./app.ts";

export const startServer = ():void=>{
  dotenv.config();
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
}


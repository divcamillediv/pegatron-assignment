import dotenv from "dotenv";
import { app } from "./app.ts";
import path from "path";
import express, { Request, Response } from "express";

export const startServer = ():void=>{
  dotenv.config();
  const PORT = process.env.PORT || 3000;

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
  }

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
}


import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import multer from "multer";
import router from "./routes/userRoutes.ts";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

export const app = express();
app.use(express.json());
app.use(cors()); 
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(router)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("API is running");
});

/**
 * Profile Picture management
 * 
 * This is the code to manage the profile pictures of the users.
 * It is used to upload the profile pictures to the local server.
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(__dirname, '../profilePics/'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage })

app.get('/upload', (req: Request, res: Response) => {
  res.render('profilePic')
})

app.get('/upload/undefined', (req: Request, res: Response) => {
  res.json({ path: '0default.jpg' });
})

//passing multer as middleware
app.post('/upload/',upload.single('profilePic'), function(req, res) {
  if (req.file) {
    const fileName = req.file.filename; 
    res.json({ path: fileName }); 
  } else {
    res.status(400).json({ message: 'File upload failed' });
  }
 });

app.use('/upload', express.static(path.join(__dirname, '../profilePics')));

// it is more optimal to separate by routes and controllers,
// if the project is more complex.
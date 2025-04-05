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
  res.render('profilePicture')
})

app.get('/upload/undefined', (req: Request, res: Response) => {
  res.json({ path: '0default.jpg' });
})

//passing multer as middleware
app.post('/upload/',upload.single('profilePic'), function(req, res) {
  if (req.file) {
    const fileName = req.file.filename; // Get the file name
    res.json({ path: fileName }); // Return the file name in the response
  } else {
    res.status(400).json({ message: 'File upload failed' });
  }
 });

app.get('/upload/:profilePic', (req: Request, res: Response) => {
  const profilePic = req.params.profilePic;
  const filePath = path.join(__dirname, '../profilePics', profilePic);
  res.sendFile(filePath);
});

app.use('/upload', express.static(path.join(__dirname, '../profilePics')));


import * as dotenv from 'dotenv'
import express from 'express'
import fileUpload from 'express-fileupload'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { getMd5ImageName } from './helpers/utils.js'

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config()

app.use(fileUpload({
  limits: {
      fileSize: 10000000, // Around 10MB
  },
  abortOnLimit: true,
}))
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World! Test');
});

app.post('/upload', (req, res) => {
  // Log the files to the console
  // console.log(req.files);

  // Get the file that was sent to our field named "image"
  if (req.files == null) {
    console.log('No file found in upload data');
    return res.sendStatus(400);
  }
  const { image } = req.files;

  // If no image submitted, exit
  if (!image) {
    console.log('No image found in upload data');
    return res.sendStatus(400);
  }

  // If does not have image mime type prevent from uploading
  if (!/^image/.test(image.mimetype)) {
    console.log('Mimetype problem');
    return res.sendStatus(400);
  }
  
  // console.log('md5ImageName of uploaded file is', getMd5ImageName(image));
  
  // Move the uploaded image to our upload folder
  image.mv(__dirname + '/uploads/' + getMd5ImageName(image));
  // All good
  res.sendStatus(200);
});

app.listen(process.env.PORT, () => {
    console.log(`File upload app listening on port ${process.env.PORT}`);
});

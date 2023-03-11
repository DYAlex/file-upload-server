import * as dotenv from 'dotenv'
import express from 'express'
import fileUpload from 'express-fileupload'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { getMd5ImageName } from './helpers/utils.js'
import { imageValidator } from './validators/imageValidator.js'

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

app.post('/upload', async (req, res) => {

  // Get the file that was sent to our field named "image"
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
  const md5ImageName = getMd5ImageName(image)
  try {
    // Move the uploaded image to our upload folder
    image.mv(__dirname + '/uploads/' + md5ImageName);
  } catch (error) {
    console.log('Could not upload image', error);
    res.sendStatus(500);
  }
  
  // All good
  // res.sendStatus(201);
  res.status(201).send(JSON.stringify(md5ImageName));
});

app.listen(process.env.PORT, () => {
    console.log(`File upload app listening on port ${process.env.PORT}`);
});
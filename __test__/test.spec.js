// __tests__/test.spec.js

jest.mock('dotenv', () => ({
  config: () => ({ parsed: true }),
}));

const request = require('supertest');
const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');

describe('Test Express App', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(fileUpload({
      limits: {
        fileSize: 10000000, // Around 10MB
      },
      abortOnLimit: true,
    }));
    app.use(express.static('public'));

    app.get('/', (req, res) => {
      res.send('Hello World! Test');
    });

    app.post('/upload', (req, res) => {
      if (req.files == null) {
        console.log('No file found in upload data');
        return res.sendStatus(400);
      }
      const { image } = req.files;

      if (!image) {
        console.log('No image found in upload data');
        return res.sendStatus(400);
      }

      if (!/^image/.test(image.mimetype)) {
        console.log('Mimetype problem');
        return res.sendStatus(400);
      }

      image.mv(path.join(__dirname, 'test_uploads/', image));
      res.sendStatus(200);
    });
  });

  afterAll(async () => {
    await fs.rm(path.join(__dirname, 'test_uploads'), { recursive: true, force: true }); // Очистить папку после завершения всех тестов
  });

  describe('GET /', () => {
    it('should respond with file upload page', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
      expect(response.text).toContain('<!DOCTYPE html>');
    });
  });

  describe('POST /upload', () => {

    it('should respond with status code 400 when no image is provided', async () => {
      const response = await request(app)
        .post('/upload');
        
      expect(response.statusCode).toBe(400);
    });

    it('should respond with status code 400 when an invalid file type is uploaded', async () => {
      const filePath = path.join(__dirname, 'fixtures', 'invalid-file.txt');
      const response = await request(app)
        .post('/upload')
        .attach('image', filePath);
      
      expect(response.statusCode).toBe(400);
    });
  });
});


# Basic server on [Expressjs](https://expressjs.com/)

This is the basic server on [Express](https://expressjs.com/) that accepts only image files smaller than 10mb and saves them into uploads folder.

## To use this server in local environment:

1. First run
```npm install```

2. Create ```.env``` file at project root and add ```PORT=[port-of-your-choice]``` in it. 

3. Run 
```npm start```

4. Go to ```http://localhost:[PORT]/``` in your browser.

## To use as docker image
1. Create ```.env``` file at project root and add ```PORT=[port-of-your-choice]``` in it.

2. Run ```sudo docker build -t [app-name] .``` at project root

3. Run ```sudo docker run -d -p [HOST_PORT]:[ENV_PORT] [app-name]```

4. After this you will be able to access the app at http://localhost:[PORT]

## Changelog

- [FIXED] If user uploads file with the name that already exists in uploads folder the file gets overwritten

- Added Dockerfile

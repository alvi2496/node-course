const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user_router');
const taskRouter = require('./routers/task_router');
const responseBuilder = require('./utils/response_builder');

const app = express();
const port = process.env.PORT || 3000;

const multer = require('multer');
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(doc|docx)$/)){
            return cb(new Error('Please upload a word document!'));
        }
        cb(undefined, true);

        // cb(new Error('File must be a PDF'));
        // cb(undefined, true)
        // cb(undefined, false)
    }
});

// const errorMiddleware = (req, res, next) => {
//     throw new Error('New error from middleware');
// }

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send();
// }, (error, req, res, next) => {
//     res.status(400).send();
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => { console.log('Listening on ' + port); });

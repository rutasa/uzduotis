const fs = require('fs');
const express = require('express');
const multer = require('multer');
const csv = require('fast-csv');

const csvRouter = express.Router();
const upload = multer({ dest: 'tmp/csv/' });

csvRouter.post('/', upload.single('file'), function (req, res) {
    const fileRows = [];

    try {
        csv.fromPath(req.file.path)
            .on("data", function (data) {
                fileRows.push(data);
            })
            .on("end", function () {
                fs.unlinkSync(req.file.path);
                res.status(201).send(fileRows);
            })
    } catch (e) {
        res.status(500).send('Request failed to complete')
    }

});

module.exports = csvRouter;

const express = require("express");
const Tax = require("../models/taxModel");
const taxesRouter = express.Router();

taxesRouter.route('/')
    .get((req,res) => {
        Tax.find({}, (err, taxes) => {
            if(err){
                res.status(500).send(err)
            } else {
                res.json(taxes)
            }
        })
    })
    .post((req, res) => {
        let tax = new Tax(req.body);
        tax.save();
        res.status(201).send(tax)
    });
taxesRouter.route('/:municipality/:date')
    .get((req, res) => {
        Tax.find({'municipality': req.params.municipality, 'dateStart': {$lte:new Date(req.params.date)}, 'dateEnd': {$gte:new Date(req.params.date)}}, (err, taxes) => {
            if(err){
                res.status(500).send(err)
            } else {
                res.json(taxes.reduce((acc, tax) => acc + tax.taxAmount, 0))
            }
        })
    });

module.exports = taxesRouter;

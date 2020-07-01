const { Page, validate } = require("../models/page");
const moment = require("moment");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const validateObjectId = require("../middleware/validateObjectId");


router.get("/", async (req, res) => {
  console.log('Get request');
  const pages = await Page.find()
    .select("-__v");
  res.send(pages);
  console.log(pages);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  let page = new Page({
    page: req.body.page,
    text: req.body.text
  });
  page = await page.save();

  res.send(page);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  
  if (error) return res.status(400).send(error.details[0].message);

  console.log('');
  const page = await Page.findByIdAndUpdate(
    req.params.id,
    {
      page: req.body.page,
      text: req.body.text
    },
    {
      new: true
    }
  );

  if (!page)
    return res.status(404).send("The pages with the given ID was not found.");

  res.send(page);
});

router.delete("/:id", async (req, res) => {
  const page = await Page.findByIdAndRemove(req.params.id);

  if (!page)
    return res.status(404).send("The pages with the given ID was not found.");

  res.send(page);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const page = await Page.findById(req.params.id).select("-__v");

  if (!page)
    return res.status(404).send("The pages with the given ID was not found.");

  res.send(page);
});

module.exports = router;

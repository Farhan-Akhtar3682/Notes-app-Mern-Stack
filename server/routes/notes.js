const express = require("express");
const mongoose = require("mongoose");
const Note = require("../models/Note");

const router = express.Router();

const validId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid note id" });
  }
  next();
};

// GET /api/notes?q=search
router.get("/", async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.q) {
      const rx = new RegExp(req.query.q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      filter.$or = [{ title: rx }, { content: rx }];
    }
    const notes = await Note.find(filter).sort({ pinned: -1, updatedAt: -1 });
    res.json(notes);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title, content, color, pinned } = req.body;
    const note = await Note.create({ title, content, color, pinned });
    res.status(201).json(note);
  } catch (e) {
    next(e);
  }
});

router.put("/:id", validId, async (req, res, next) => {
  try {
    const { title, content, color, pinned } = req.body;
    const update = {};
    if (title !== undefined) update.title = title;
    if (content !== undefined) update.content = content;
    if (color !== undefined) update.color = color;
    if (pinned !== undefined) update.pinned = pinned;
    const note = await Note.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", validId, async (req, res, next) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;

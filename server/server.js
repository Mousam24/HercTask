const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/flashcardDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

const flashcardSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  box: { type: Number, default: 1 },
  nextReviewDate:{ type: Date, default: Date.now }
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

app.post('/api/flashcards', async (req, res) => {
    try {
      const { question, answer } = req.body;
      const nextReviewDate = new Date();
      nextReviewDate.setDate(nextReviewDate.getDate() + 1);
      const newFlashcard = new Flashcard({ question, answer, nextReviewDate });
      await newFlashcard.save();
      res.status(201).json(newFlashcard);
    } catch (error) {
      res.status(500).json({ message: 'Error creating flashcard', error });
    }
  });

  app.get('/api/flashcards', async (req, res) => {
    try {
      const flashcards = await Flashcard.find({}).sort({ box: 1 }); // Sort by box number
      res.json(flashcards);
    } catch (err) {
      res.status(500).json({ message: "Error fetching flashcards", error: err });
    }
  });
  

app.put('/api/flashcards/:id', async (req, res) => {
  const { correct } = req.body;
  const flashcard = await Flashcard.findById(req.params.id);

  if (!flashcard) {
    return res.status(404).json({ message: 'Flashcard not found' });
  }

  if (correct) {
    flashcard.box++;
  } else {
    flashcard.box = 1;
  }

  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + [1, 3, 7, 15, 30][flashcard.box - 1]);
  flashcard.nextReviewDate = nextReviewDate;

  await flashcard.save();
  res.json(flashcard);
});

app.delete('/api/flashcards/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const flashcard = await Flashcard.findByIdAndDelete(id);
    if (!flashcard) return res.status(404).json({ message: "Flashcard not found" });

    res.json({ message: "Flashcard deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting flashcard", error });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

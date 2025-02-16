router.get('/', async (req, res) => {
    try {
      const today = new Date();
      console.log("Fetching flashcards due before:", today);
      const flashcards = await Flashcard.find({ nextReviewDate: { $lte: today } });
      console.log("Fetched flashcards:", flashcards);
      res.json(flashcards);
    } catch (err) {
      console.error("Error fetching flashcards:", err);
      res.status(500).json({ message: err.message });
    }
  });
  
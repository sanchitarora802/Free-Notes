const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const fetchUserId = require("../middlewares/fetchUserId");
const Note = require("../models/NotesSchema");

//Route 1 : Create new notes for user.
router.post(
  "/createNote",
  fetchUserId,
  [
    body("title", "Title should be greater than 3").isLength({ min: 3 }),
    body("description", "Description should be greater than 5").isLength({
      min: 5,
    }),
  ],
  async function (req, res) {
    try {
      const fetchedUserId = req.incommingUser.id;
      // console.log(fetchedUserId);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const incommingNote = new Note({
        userid: fetchedUserId,
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag || "General",
      });

      const savedNote = await incommingNote.save();

      res.json(savedNote);
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ errors: "Some error occured please try again later" });
    }
  }
);

//Route 2: Fetch all the notes according to the user.
router.get("/getNotes/:id", fetchUserId, async function (req, res) {
  try {
    const fetchedUserId = req.incommingUser.id;
    //Local Variable created to store the response from find function. Find Function is async and gives the response later to store that we have also used .clone method at the end to store the result and pass it as json.
    const notes = await Note.find({ userid: fetchedUserId }).clone();
    res.json(notes);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ errors: "Some error occured please try again later" });
  }
});

//Route 3: Update an existing note.
router.put("/updateNote/:id", fetchUserId, async function (req, res) {
  try {
    const fetchedUserId = req.incommingUser.id;

    //create a new note of the incomming values
    const newNote = {};
    if (req.body.etitle || req.body.edescription || req.body.etag) {
      (newNote.title = req.body.etitle),
        (newNote.description = req.body.edescription),
        (newNote.tag = req.body.etag);
    }

    //verify the existing Note and let user update
    // console.log(req.params.id)
    let existingNote = await Note.findById(req.params.id);
    if (!existingNote) {
      return res.status(400).send("Note Not Found");
    } else if (existingNote.userid.toString() !== fetchedUserId) {
      // console.log(existingNote.userid)
      // console.log(fetchedUserId)
      return res.status(401).send("Not Allowed");
    } else {
      existingNote = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json(existingNote);
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ errors: "Some error occured please try again later" });
  }
});

//Route 4: Delete an existing note.
router.delete("/deleteNote/:id", fetchUserId, async function (req, res) {
  try {
    const fetchedUserId = req.incommingUser.id;

    //verify the existing Note and let user delete
    // console.log(req.params.id)
    let existingNote = await Note.findById(req.params.id);
    if (!existingNote) {
      return res.status(400).send("Not Found");
    } else if (existingNote.userid.toString() !== fetchedUserId) {
      // console.log(existingNote.userid)
      // console.log(fetchedUserId)
      return res.status(401).send("Not Allowed");
    } else {
      existingNote = await Note.findByIdAndDelete(req.params.id);
      res.json({
        Message: "Note Deleted Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ errors: "Some error occured please try again later" });
  }
});

module.exports = router;

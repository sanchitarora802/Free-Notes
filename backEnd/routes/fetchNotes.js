const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const fetchUserId = require('../middlewares/fetchUserId');
const Note = require('../models/NotesSchema')


//Route 1 : Create new notes for user.
router.post('/createNote', fetchUserId, [
    body('title', 'Title should be greater than 3').isLength({ min: 3 }),
    body('description', 'Description should be greater than 5').isLength({ min: 5 })
], async function (req, res) {
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
            tag: req.body.tag
        })

        const savedNote = await incommingNote.save();

        res.json({
            savedNote
        })
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ "errors": "Some error occured please try again later" });
    }

})

//Route 2: Fetch all the notes according to the user.
router.get('/getNotes', fetchUserId, async function (req, res) {

    try {
        const fetchedUserId = req.incommingUser.id;
        const notes = await Note.find({ fetchedUserId });
        res.json({
            notes
        })
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ "errors": "Some error occured please try again later" });
    }
})

module.exports = router;


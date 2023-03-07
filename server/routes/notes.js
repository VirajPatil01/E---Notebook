

const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Note = require('../models/Note');

router.get('/fetchallnotes', fetchuser,




    async (req, res) => {

        try {


            const notes = await Note.find({ user: req.user.id });
            res.json(notes);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error in fetching notes");
        }

    })



router.post('/addnote', fetchuser,

    [
        body('title', "Enter valid title").isLength({ min: 3 }),
        body('description', "Enter valid description").isLength({ min: 5 }),
    ],

    async (req, res) => {

        try {


            //this process is for adding notes in our users feild

            const { title, description, tag } = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const note = new Note({

                title, description, tag, user: req.user.id

            })

            const savedNote = await note.save();
            res.json(savedNote);

        } catch (error) {

            console.error(error.message);
            res.status(500).send("Internal server error in adding note");
        }

    })






//this is or update a note


router.put('/updatenote/:id', fetchuser,

    async (req, res) => {

        try {


            const { title, description, tag } = req.body;

            //create a new note objest

            const newNote = {};

            if (title) { newNote.title = title };
            if (description) { newNote.description = description };
            if (tag) { newNote.tag = tag };

            //find note to be update and update it

            let note = await Note.findById(req.params.id);

            if (!note) {
                return res.status(404).send("Note is not found");
            }

            if (note.user.toString() !== req.user.id) {

                return res.status(401).send("Not Allowed")
            }

            note=await Note.findOneAndUpdate(req.params.id,{$set:newNote},{new : true}) 
            res.json({ note})

        } catch (error) {

            console.error(error.message);
            res.status(500).send("Internal server error in updating note");
        }

    })


    //this is or delete a note


router.delete('/deletenote/:id', fetchuser,

async (req, res) => {

    try {


        const { title, description, tag } = req.body;



        //find note to be update and update it

        let note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Note is not found");
        }

        if (note.user.toString() !== req.user.id) {

            return res.status(401).send("Not Allowed")
        }

        note=await Note.findOneAndDelete(req.params.id) ;
        res.json({"Success":"Note deleted successfully",note:note})

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error in deleting note");
    }

})

module.exports = router;

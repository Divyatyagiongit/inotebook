const express = require('express');
const fetchuser = require('../middleware/fetchUser');
const router = express.Router();
const { body, validationResult } = require('express-validator')
const Notes = require("../models/Notes")

//Route -1 : Get all the notes, GET "/api/notes/fetchAllNotes"
router.get('/fetchAllNotes',fetchuser,async (req,res) => {
    const notes  = await Notes.find({user:req.user.id});
    res.json(notes);
})

//Route -2 : Create new notes, POST "/api/notes/addNotes" - Login required.
router.post('/addNotes',fetchuser,[
    body('title', 'Enter valid value of title').isLength({ min: 3 }),
    body('description', 'Enter atleast 5 character in description').isLength({ min: 5 }),
],async (req,res) => {
    try{
        //if there are errors, return bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {title, description, tag} = req.body;

        const note  = new Notes({
            title, description, tag, user: req.user.id
        })
        console.log(note);
        const savedNotes = await Notes.insertMany(note);
        console.log(note);
        res.json(savedNotes);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Some Error Occured");
    }
})
//Route-3 : Update notes, POST "/api/notes/updatenote" - Login required.
router.put('/updatenote/:id', fetchuser, async (req,res) => {
    try{
        //if there are errors, return bad request and errors
        const {title, description, tag} = req.body;
        const newnote = {};
        if(title){newnote.title = title};
        if(description){newnote.description = description};
        if(tag){newnote.tag = tag};

        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(401).send("Notes not found")}
        
        if(note.user.toString() !== req.user.id){
           return res.status(401).send("Not allowed")
        }
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newnote}, {new:true})
        return res.json(note);
       
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Some Error Occured");
    }
})
//Route-4 : delete notes, DELETE "/api/notes/deletenote" - Login required.
router.delete('/deletenote/:id', fetchuser, async (req,res) => {
    try{
        //if there are errors, return bad request and errors
        const {title, description, tag} = req.body;
        
        let note = await Notes.findById(req.params.id);

        if(!note){return res.status(401).send("Notes not found")}
        
        if(note.user.toString() !== req.user.id){
           return res.status(401).send("Not allowed")
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        return res.json({"Success":"Note has been deleted.",note:note});
       
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Some Error Occured");
    }
})
module.exports = router
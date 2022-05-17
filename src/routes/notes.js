const { text } = require('express');
const express = require ('express');
const router = express.Router();
const Note = require ('../models/Note')
const {isAuthenticated} = require('../helpers/auth');


router.get('/notes/add',isAuthenticated, (req, res)=>{
    res.render ('notes/new-note');

});

router.post('/notes/new-note',isAuthenticated, async (req, res) =>{
    const {title, description} = req.body;
    const errors = [];
    if(!title){
        errors.push({text:'por favor ingrese un titulo'});
    }
    if(!description){
        errors.push({text: 'por favor ingrese una desripcion'});
    }
    if(errors.length>0){
        res.render('notes/new-note',{
            errors,
            title,
            description
        });

    }
    else{
     const newNote = new Note ({title, description});
     //linea se agrega o no si quiero que cada usuario solo vea su propia nota en vez de la de los demas
        newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Note Addded Succesfully');
     res.redirect('/notes')
    }
   
});

router.get('/notes',isAuthenticated, async(req, res)=>{
    //dentro del note.find()agregar o no la consulta para que cada usuario vea su nota y no interfiera con la de los demas
  const notes = await   Note.find ({user: req.user.id}).lean().sort({date:'desc'});
  res.render('notes/all-notes',{notes});
});

router.get('/notes/edit/:id',isAuthenticated, async (req, res)=>{
   const note = await Note.findById (req.params.id).lean();
    res.render('notes/edit-note',{note});
});

router.put('/notes/edit-note/:id', isAuthenticated,async (req, res)=>{
const {title, description}= req.body;
await Note.findByIdAndUpdate (req.params.id, {title, description});
req.flash('succes_msg', 'note update successfully');
res.redirect('/notes');
});

router.delete('/notes/delete/:id',isAuthenticated, async (req, res)=>{
    await Note.findByIdAndDelete(req.params.id);
    req.flash('succes_msg', 'note Delete successfully');
          res.redirect('/notes')
})

module.exports = router
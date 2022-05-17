const mongoose = require('mongoose')
const {Schema} = mongoose;

const NoteSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, default: Date.now},
    //agregando o no la siguiente linea de codigo cada usuario puede ver su propia nota o todos ven la de todos
    user: {type: String}
});

module.exports = mongoose.model('Note', NoteSchema)


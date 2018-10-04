const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

let todoShcema = new Schema({
    todoText: { type: String},
    todoDesc: {type: String}
})

module.exports = mongoose.model('todo', todoShcema);
const mongoose = require ('mongoose')

mongoose.connect('mongodb://localhost/users-db-app',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
})

.then( db=> console.log ('db is connect'))
.catch(err=> console.log(err));
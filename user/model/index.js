// import mongoDB package
const mongoose = require('mongoose');
// connet to the database 27017 is the default mongodb port
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
	.then(() => console.log('Database connected!'))
	.catch(() => console.log('FAILED to connect to the data base'));

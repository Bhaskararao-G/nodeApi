const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = 3000;
const api = require('./routes/api');
const adminRoutes = require('./routes/admin-routes');

const app = express();

const db = 'mongodb://localhost/mean_auth';

mongoose.connect(db, err => {
	if (err) {
		console.error('Error!' + err);
	} else {
		console.log('Connected to mongoDB');
	}
})

app.use(cors());
app.use(bodyParser.json());
app.use('/api', api);
app.use('/admin', adminRoutes);

app.get('/', (req, res)=> {
	res.send("Hello from server");
});



app.listen(PORT, function() {
	console.log('Server running on localhost:' + PORT);
})
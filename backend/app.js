const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const MONGO_URL = "mongodb+srv://piyush:1234@integration.4meth.mongodb.net/feedback?retryWrites=true&w=majority&appName=Integration"

mongoose.connect(MONGO_URL).then(() => {
    console.log("MongoDb connection Est.");

}).catch(() => {
    console.log("Failed to Connect");

})


const facultySchema = new mongoose.Schema({
    name: String,
    subject: String,
    experience: String,
    qualification: String,
    image: String,
});

const Faculty = mongoose.model('facultys', facultySchema);

app.get('/api/faculty', async (req, res) => {
    try {
        const faculties = await Faculty.find();
        res.json(faculties);
    } catch (err) {
        res.status(500).send('Error fetching data');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
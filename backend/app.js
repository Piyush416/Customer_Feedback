require('dotenv').config()     // load .env file
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const cors = require('cors');
const app = express();
const PORT = process.env.PORT;
const path = require("path")



// json web token
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET_CODE


app.use(express.static(path.join(__dirname, '/dist')))
app.use(cors({
    origin: "https://piyush416.github.io",
}));
app.use(express.json());


const MONGO_URL = process.env.MONGO_URI

mongoose.connect(MONGO_URL).then(() => {
    console.log("MongoDb connection Est.");

}).catch(() => {
    console.log("Failed to Connect");

})


// faculty schema
const facultySchema = new mongoose.Schema({
    name: String,
    subject: String,
    experience: String,
    qualification: String,
    image: String,
});

const FacultyModel = mongoose.model('facultys', facultySchema);


// user login and register schema
const userSchema = new mongoose.Schema({
    enrol: Number,
    firstName: String,
    lastName: String,
    email: String,
    password: String
});
const userModel = new mongoose.model('users', userSchema);


// feedback store in database model
const { Schema } = mongoose
const feedbackSchema = new mongoose.Schema({
    facultyName: String,
    FeedBackEnrol: Number,
    feedback: String,
    facultyObjectId: Schema.Types.ObjectId
})
const feedbackModel = new mongoose.model('feedbacks', feedbackSchema);



app.get('/api/faculty', async (req, res) => {
    try {
        const faculties = await FacultyModel.find();
        res.json(faculties);
    } catch (err) {
        res.status(500).send('Error fetching data');
    }
});


// handle register request
app.post("/user/register", async (req, res) => {
    try {
        // get the data from the request
        const { firstName, lastName, enrol, email, password } = req.body;
        console.log(firstName, lastName, enrol, email, password);

        //bcrypt the password 
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        console.log("hash Password: ", hashPassword);

        // store the data in database
        const newUser = await new userModel({ firstName, lastName, enrol, email, password: hashPassword })
        await newUser.save();
        res.status(201).json({ message: "Successfully Reg" })
    } catch {
        res.status(500).json({ message: "Error Encoded" })
    }
})


// handle login request
app.post("/user/login", async (req, res) => {
    const { enrollment, password } = req.body;
    const data = await userModel.findOne({ $or: [{ email: enrollment }, { enrol: enrollment }] })
    if (data) {
        const isMatch = await bcrypt.compare(password, data.password);
        if (isMatch) {
            // generate the token
            const token = jwt.sign(
                { id: data._id, enrol: data.enrol },
                JWT_SECRET,
                { expiresIn: '1h' }
            )
            res.status(201).json({ message: 'Login SuccessFully', token })
        }
        else {
            res.status(500).json({ message: 'Incorrect Password' })
        }
    }
    else {
        res.status(500).json({ message: 'User Not Found' })
    }

})



// handle feedback
app.post('/user/feedback', async (req, res) => {
    try {
        const { facultyId, facultyName, feedbackText, enrollment } = req.body
        const newfeedback = await new feedbackModel({ facultyObjectId: facultyId, facultyName, FeedBackEnrol: enrollment, feedback: feedbackText })
        await newfeedback.save();
        res.status(201).json({ message: "FeedBack Submitted SuccessFully" })
    } catch {
        res.status(500).json({ message: "Error to Submit FeedBack" })
    }
})


app.post('/api/faculty/enrollment', async (req, res) => {
    const { enrollment } = req.body;
    try {
        const faculties = await FacultyModel.find();
        res.json(faculties);
    } catch (err) {
        res.status(500).send('Error fetching data');
    }
    res.status(201).json({ message: "Success" })
})


// Catch-all route for React
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

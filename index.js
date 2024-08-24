const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const questionRoutes = require('./routes/questions');
const optionRoutes = require('./routes/options');

const app = express();
const port = 8000;

mongoose.connect('mongodb+srv://akshita:ak1234@cluster0.aoxpnce.mongodb.net/PollingSystem?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.json());
app.use('/questions', questionRoutes);
app.use('/options', optionRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

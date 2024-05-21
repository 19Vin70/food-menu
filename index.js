const express = require('express');
const path = require('path');
const foods = require('./public/data/food'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/foods', (req, res) => {
    res.json(foods);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

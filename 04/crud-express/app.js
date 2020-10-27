const express = require('express');
const dbData = require('./db.json');

const app = express();
const port = 3000;

app.engine('html', require('express-art-template'));

app.use('/node_modules/', express.static('../../node_modules/'));
app.use('/public/', express.static('public'));

app.get('/', (req, res) => {
  res.render('index.html', {
    fruits: ['苹果', '香蕉', '橘子'],
    students: dbData.students,
  });
});

app.listen(port, () => {
  console.log(`running ${port}...`);
});
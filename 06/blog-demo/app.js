const express = require('express');
const path = require('path');

const app = express();

app.engine('html', require('express-art-template'));
// 设置目录到 views 目录
app.set('views', path.join(__dirname, '/views/'));

app.use('/public/', express.static(path.join(__dirname, '/public/')));
app.use('/node_modules/', express.static(path.join(__dirname, '/node_modules/')));

app.get('/', (req, res) => {
  res.render('index.html', {
    name: 'Blog'
  });
});

app.listen(3000);

const express = require('express');
const app = express();
const packageJson = require('./package.json')
const path = require("path")

// Middleware
app.use(requireHTTPS);
app.use(express.static('./dist'));

// Redirect app request to index.html
app.get('/*', (req, res) => {
  res.sendFile('index.html', {root: 'dist'});
 // res.sendFile(path.join(__dirname, './src', 'index.html'));
});

// Start server
app.listen(process.env.PORT || 8080, () => console.log('Server started...'));

/**
 * @author: Klement Omeri
 * Special thanks to Klement for providing the function to redirect traffic from http to https
 */
function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

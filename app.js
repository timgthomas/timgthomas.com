var express = require('express'),
  app = express(),
  port = process.env.PORT;

app.get('/rss', function(req, res) {
  res.redirect(301, 'http://feeds.feedburner.com/timgthomas');
});

app.use(express.static(__dirname + '/public'));

// app.use(connect.compress());

app.listen(port, function(){
  console.log('Hexo is running on port %d', port);
});

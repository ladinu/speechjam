var fs = require('fs');
var http = require('http');

var files = {
   '/index.html': {
      'mime': 'text/html',
      'content': fs.readFileSync('./index.html')
   },
   '/index.js': {
      'mime': 'text/javascript',
      'content': fs.readFileSync('./index.js')
   }
}

var server = http.createServer(function(req, res){
   var url = req.url;
   if (files.hasOwnProperty(url)) {
      res.writeHead(200, {'Content-Type': files[url].mime});
      res.end(files[url].content)
   } else {
      res.writeHead(404);
      res.end();
   }
   res.end(files['index.js'])
});

server.listen(9090, function(){
   console.log('> Listening on 9090...')
})

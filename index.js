const https = new ServerHttps()

https.get('/', function (req, res) {
  res.send('hello there')
})

https.get('/test', function (req, res) {
  res.send(`
    <html>
      <head>
        <title>Test with picture</title>
      </head>

      <body>
        <h1>This elephant says hello</h1>
        <img src="test.png" />
      </body>
    </html>
  `.trim())
})

https.get('/test.png', function (req, res) {
  chrome.runtime.getPackageDirectoryEntry(function(root) {
    root.getFile("test.png", {}, function(fileEntry) {
      fileEntry.file(function(file) {
        var reader = new FileReader()
        reader.onloadend = function (e) {
          res.sendFile(200, 'image/png', this.result)
        }
        reader.readAsArrayBuffer(file)
      }, console.log)
    }, console.log)
  })
})

https.listen(9999)

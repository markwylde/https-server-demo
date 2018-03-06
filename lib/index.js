async function main () {
  const https = new ServerHttps()

  https.get('/', function (req, res) {
    res.send('hello there')
  })

  https.get('/test', async function (req, res) {
    const result = await readFileAsString('test.txt')

    res.send(`
      <html>
        <head>
          <title>Test with picture</title>
        </head>

        <body>
          <h2>Testing text fetching</h2>
          <p>${result}</p>
          <h2>Testing form</h2>
          <form method="post">
            <label>Your name:</label>
            <input name="name" />
            <button type="submit">Submit</button>
          </form>
          <h2>Testing image fetching</h2>
          <img style="float: left;" width=75 src="test.png" />
          <p style="float: left; margin-left: 10px;">This elephant says hello</p>
        </body>
      </html>
    `.trim())
  })

  https.post('/test', async function (req, res) {
    res.send(`
      <html>
        <head>
          <title>Test post form</title>
        </head>

        <body>
          <form>
            You submitted <strong>${req.body.name}</strong>
          </form>
        </body>
      </html>
    `.trim())
  })

  https.get('/test.png', async function (req, res) {
    const result = await readFileAsBinary('test.png')
    res.sendFile(200, 'image/png', result)
  })

  const cert = await readFileAsString('keys/server.crt')
  const key = await readFileAsString('keys/server.key')

  https.listen(9999, {cert, key})
}

main()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const Url = require('url')
const axios = require('axios')
const cheerio = require('cheerio')

function doCrawl(url) {
  console.log('Start to crawl ', url)
  return axios.get(url).then(({ data }) => {
    console.log('Successful got data')
    const $ = cheerio.load(data)
    const links = $('meta') || []
    const result = Array.from(links)
      .map(({ attribs }) => attribs)
      .filter(link => link.name != null || link.property != null)
      .reduce((acc, link) => Object.assign({}, acc, { [link.name || link.property]: link.content }), {})

    return {
      url,
      domain: Url.parse(url).hostname,
      image: result['og:image'],
      title: result['og:title'],
      description: result['og:description'] || result.description
    }
  })
}

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.post('/', (req, res) => {
  const data = req.body

  try {
    Url.parse(data.url)
  } catch (e) {
    return callback(e)
  }

  console.log('Got data ', data)

  doCrawl(data.url)
    .then(
      result => res.json(result)
      // req.json({
      //   statusCode: 200,
      //   headers: {
      //     'Access-Control-Allow-Origin': '*',
      //     'Access-Control-Allow-Credentials': true
      //   },
      //   body: JSON.stringify(result)
      // })
    )
    .catch(err => console.error(err))
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))

const axios = require('axios')
const cheerio = require('cheerio')

axios.get('https://hikerlust.com/am-thuc-hoi-an-nhung-mon-ngon-khong-the-choi-tu-noi-pho-hoi').then(({ data }) => {
  const $ = cheerio.load(data)
  const links = $('meta') || []
  const result = Array.from(links)
    .map(({ attribs }) => attribs)
    .filter(link => link.name != null || link.property != null)
    .reduce((acc, link) => Object.assign({}, acc, { [link.name || link.property]: link.content }), {})
  console.log(JSON.stringify(result))
})

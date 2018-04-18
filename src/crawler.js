const axios = require('axios')
const cheerio = require('cheerio')

axios.get('https://hikerlust.com/am-thuc-hoi-an-nhung-mon-ngon-khong-the-choi-tu-noi-pho-hoi').then(({ data }) => {
  const $ = cheerio.load(data)
  const links = $('meta') || []
  const result = Array.from(links).map(link => link.attribs)
  console.log(result)
})

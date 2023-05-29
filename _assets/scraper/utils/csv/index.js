const { renderCsv } = require('./readCsv');
const cheerio = require('cheerio');
const axios = require('axios');

const actions = {
  render: renderCsv,
  fetchHtml: async function fetchHTML(url) {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const brand = $('.ProductMainSection__brandName').text();
    const slug = $('.ProductMainSection__brandName').text().toLowerCase().replace(/\'|\-| /g, "");
    const title = $('.Text--subtitle-1').text();
    const product_img = $("meta[property='og:image']").attr("content")
    const product_desc = $('.ProductDetail__productContent').first().html();
    const product_url = url;
    const price = $('.ProductPricingPanel').find('span').text();
    const typeElements = $('ul').first().children().children();
    const typesArray = [];
  
    $(typeElements).each((idx, type) => {
      typesArray.push(type.children[0].data);
    })
    
    const types = typesArray.join(",");
    
    return {
      brand,
      slug,
      title,
      product_img,
      product_desc,
      product_url,
      price,
      types
    }
  }  
}

module.exports = {
  actions
}
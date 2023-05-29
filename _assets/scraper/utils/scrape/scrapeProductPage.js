const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: false });

const scrapeProductPage = async (url) => {
  return await nightmare
  .goto(url)
  .evaluate(() => {
    const productDetails = document.getElementsByClassName('ProductDetail__wrapper')[0];

    const brand = productDetails.getElementsByClassName('ProductMainSection__brandName')[0].innerText.toLowerCase().replace(/ /g, "_").match(/\w*/g)[0];
    const title = productDetails.getElementsByClassName('Text--subtitle-1')[0].innerText;
    const product_img = productDetails.getElementsByClassName('slick-initialized slick-slider')[0].querySelector('img').src;
    const product_desc = productDetails.getElementsByClassName('ProductDetail__productContent')[0].innerHTML;
    const product_url = window.location.href;
    const price = productDetails.getElementsByClassName('ProductPricingPanel')[0].querySelector('span').innerText.match(/\$.*/g)[0];

    const typeElements = document.getElementsByTagName('ul')[0].querySelectorAll('a');
    
    let types = '';
    
    typeElements.forEach((item, idx) => {
      types += `${item.innerText}`;
      if (idx < typeElements.length - 1) types +=',';
    });
    
    return {
      brand,
      title,
      product_img,
      product_desc,
      product_url,
      price,
      types
    }
  })
  .end()
  .then((product) => {
    return product
  })
}

module.exports = {
  scrapeProductPage
}
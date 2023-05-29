const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: false });

const scrapeProductUrls = url => {
    return nightmare
    .goto(url)
    .evaluate(() => {
        const products = [];
        const productEls = document.getElementsByClassName('quick-view-prod');
  
        for (let i = 0; i < productEls.length; i++){
          const product = productEls[i];
          products.push(product.querySelector('a').href);
        }
        return products;
    })
    .end()
    .then(result => {
      return result;
    })
}

module.exports = {
  scrapeProductUrls
}
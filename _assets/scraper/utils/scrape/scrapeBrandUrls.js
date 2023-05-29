const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: false });

const scrapeBrandUrls = async (url) => {
  return await nightmare
  .goto(url)
  .evaluate(() => {
    const brandUrls = [];
    // [[all brands for A], [all brands for B]]
    const allBrandsByLetter = document.getElementsByClassName('all-brands-sublisting');
    for (let i = 0; i < allBrandsByLetter.length; i++) {
      // [all brands for A]
      let currentBrandsByLetter = allBrandsByLetter[i];
      // [brand AAAA, brand AAAB, brand AAAC, brand AAAD]
      if (currentBrandsByLetter) {
        let brands = currentBrandsByLetter.querySelectorAll('li');

        for (let j = 1; j < brands.length; j++) {
          // brand AAAA
          let brand = brands[j];
          if (brand) {
            let brandLink = brand.querySelector('a');
            if (brandLink && brandLink.href !== brandUrls[brandUrls.length - 1]) {
              brandUrls.push(brandLink.href);
            }
          }
        }
      }
    }
    return brandUrls
  })
  .end()
  .then((brandUrls) => {
    return brandUrls
  })
}

module.exports = {
  scrapeBrandUrls
}
const { writeCsvProducts, writeCsvProductUrls, writeCsvBrandUrls } = require('./writeCsv');

const renderCsv = (products, filename, type) => {
  return function () {
    if (type === 'products') {
      writeCsvProducts(products, filename)
    }
    else if (type === 'brands') {
      writeCsvBrandUrls(products, filename)
    }
    else {
      writeCsvProductUrls(products, filename)
    }
  }
};


module.exports = {
  renderCsv
}
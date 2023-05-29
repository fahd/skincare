var fs = require('fs');


const writeCsvProductUrls = async (products, filename) => {
  products.forEach(product_url => {
    const url = `${product_url}\r\n`;
    
    fs.appendFile(filename, url, (err) => {
      if (err) throw err;
      console.log(`${product_url} was appended to ${filename}.!`);
    });
  });
}

const writeCsvBrandUrls = async (brands, filename) => {
  brands.forEach(brand_url => {
    const url = `${brand_url}\r\n`;
    
    fs.appendFile(filename, url, (err) => {
      if (err) throw err;
      console.log(`${brand_url} was appended to ${filename}.!`);
    });
  });
}


module.exports = {
  // writeCsvProducts,
  writeCsvProductUrls,
  writeCsvBrandUrls
}
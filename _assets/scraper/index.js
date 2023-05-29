// global import
const fs = require('fs');
const csv = require('csv-parser');
const { parse } = require('json2csv');

// local import
const { actions } = require('./utils/csv');

// local variables
const fields = [
  "brand",
  "slug",
  "title",
  "product_img",
  "product_desc",
  "product_url",
  "price",
  "types"
];

const writeProductData = async (product, filename, interval, url) => {
  fs.stat(filename, function (err, stat) {
    
    if (err) console.log('err 1:', err);
    else {
      let csv = parse(product, fields).replace('"brand","slug","title","product_img","product_desc","product_url","price","types"', '')

      fs.appendFile(filename, csv, function (err) {
        if (err) throw err;
        console.log(`URL: ${url} \nFiles appended: ${interval}\n`);
      })
    }
  })
}

const saveProduct = async (filename, url, i) => {  
  setTimeout(async function () {
    const product = await actions.fetchHtml(url);
    await writeProductData(product, filename, i, url);
  }, i * 1000)
}

// // ✅ Scrape Product data from every Product URL
// const scrapeProductData = async () => {
//   let i = 1;
//   const filename = 'products.csv';
  
//   fs.createReadStream('product_urls.csv')
//     .pipe(csv())
//     .on('data', async function (row) {
//       const { product_url } = row;
//       saveProduct(filename, product_url, i)
//       i++;
//     })
//     .on('end', function () {
//       console.log(
//         'done!'
//       );
//     })
// }

// \$\d+\.?\d+ price regex
const logProducts = async () => {
  const brands = new Set();
  
    fs.createReadStream('products.csv')
    .pipe(csv())
    .on('data', async function (row) {
      const { brand, slug } = row;

      if (!brands.has(slug)) {
        brands.add(slug);
        let csv = parse({ name:brand, slug }).replace('"name","slug"', '');

        fs.appendFile('brands.csv', csv, function (err) {
          if (err) throw err;
          console.log(`URL: ${brand}`);
        })
      }
    })
    .on('end', function () {
      console.log(
        'done!'
      );
    })
}

logProducts()

/*
// ✅ Scrape all Brand URLs
// const scrapeBrands = async (url) => {
//   const brandUrls = await scrapeBrandUrls(url);
//   const saveCsvCb = actions.render(brandUrls, 'brand_urls.csv', 'brands')
//   saveCsvCb();
// }

// ✅ Scrape all Product URLs for every Brand URL
// const scrapeUrls = async () => {
//   fs.createReadStream('brand_urls.csv')
//     .pipe(csv())
//     .on('data', async function (row) {
//       const { brand_url } = row;
//       brandurl = brand_url;
//       const productUrls = await scrapeProductUrls(brand_url);
//       const saveCsvCb = actions.render(productUrls, 'product_urls.csv', 'urls');
//       saveCsvCb();
//     })
//     .on('end', function () {
//       console.log(
//         `${brandurl.slice(brandurl.lastIndexOf('/') + 1)}:`
//       );
//     })
// }
*/





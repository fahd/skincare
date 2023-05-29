import 'dotenv/config';
import fs from 'fs';
import csv from 'csv-parser';
import { connection } from '../';
import models from '../../models';

const seedBrands = (connection) => {
  return fs.createReadStream('server/db/seed/csvs/brands.csv')
  .pipe(csv())
  .on('data', async function (row) {
    const { name, slug } = row;
    let queryString = `INSERT INTO BRANDS (name, slug) values ($$${name}$$, '${slug}');`;
    await connection.query(queryString)
  })
}
const seedProducts = (connection) => {
  return fs.createReadStream('server/db/seed/csvs/products.csv')
  .pipe(csv())
  .on('data', async function (row) {
    const { slug, title, productimg, product_desc, product_url, price} = row;
    const brandInfo = await models.Brands.findBySlug({ slug });
    const brandid = brandInfo.brandid;
    const priceText = price.match(/\$\d+\.?\d+/)[0];
    
    let queryString = `
      INSERT INTO products (
        brandid,
        title,
        product_desc,
        productImg,
        product_url,
        price
      )
      VALUES (
        ${brandid},
        $$${title}$$,
        $$${product_desc}$$,
        '${productimg}',
        '${product_url}',
        '${priceText}'
      );
    `    
    await connection.query(queryString).then(res => res.rows[0])
  })
}

function seed() {
  seedBrands(connection)
  .on('end', function () {
    console.log('Brands Seeded!');

    seedProducts(connection)
      .on('end', function () {
        console.log(
          'Products Seeding...it\'s asynchronous.'
        );
      })
  })
}  

// Run this to get the database populated
seed();

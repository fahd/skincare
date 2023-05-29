import 'dotenv/config';
import fs from 'fs';
import csv from 'csv-parser';
import models  from '../../models';
import { connection } from '../';
import { saveTypes } from './tags';


const seedTags = () => { 
  return fs.createReadStream('server/db/seed/csvs/products.csv')
  .pipe(csv())
  .on('data', async function (row) {
    const { types, product_url } = row;
    const product = await models.Products.findByUrl({ product_url });
    const productid = product.productid;

    const tagIds = new Set();
    const nestedTagIds = new Set();
    const typesArray = types.split(",");
    
    saveTypes(typesArray, tagIds, nestedTagIds);
    
    const nestedTags = Array.from(nestedTagIds);
    const tags = Array.from(tagIds);

    // loop through tags and associate productid with tagid
    for (let i = 0; i < tags.length; i++){
      let tagid = tags[i];
      await models.Products.addProductTag({tagid, productid})
    }
    // loop through nestedTags and find nestedTag's parent tag, and associate 
      // productid with nestedTag AND tagId if the tagId wasn't there already;
        // highly inefficient, just using it to seed.
    for (let i = 0; i < nestedTags.length; i++){
      let nestedtagid = nestedTags[i];

      let tag = await models.Products.getNestedProductParentTag({ nestedtagid });
      let tagid = tag.tagid;
      // every product that has a nested tag should have a corresponding parent tag that this nested tag corresponds to
      let checkProductHasParentTag = await models.Products.checkProductHasTagId({ productid, tagid });
      // if there is a nested tag, but no parent tag, add in the parent tag before adding in the nested tag.
        // no product should have a nested tag without a parent tag, or else it wouldn't be nested.
      if (!checkProductHasParentTag) await models.Products.addProductTag({ tagid, productid });
      
      // add in the nestedtag for the product
      await models.Products.addNestedProductTag({ nestedtagid, productid });
    }
  })
  .on('end', function () {
    console.log(
      'Tags updated'
    );
  })
}

// Run this to associate tags of products
seedTags(connection);


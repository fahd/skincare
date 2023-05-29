import { connection } from '../../db';
import _ from 'lodash';

const modifyQuery = (query, actions, isBoth, idxToReplace, limit=10) => {
  let hasFirst = false;
  _.forEach(actions, action => {
    if (!hasFirst) {
      hasFirst = true;

      if (!_.isEmpty(action.nestedTags)) {
        query[idxToReplace] = `INNER JOIN productNestedTags ON productNestedTags.productId = products.productId\n`
        query.push(`${!isBoth ? 'WHERE ' : ''}(productTags.tagId='${action.tagInfo.tagid}' AND\n`);

        let hasFirstNested = false;
        
        _.forEach(action.nestedTags, (nestedtag) => {
          if (!hasFirstNested) {
            hasFirstNested = true;
            query.push(`(productNestedTags.nestedtagid='${nestedtag.nestedtagid}'\n`)
          }
          else {
            query.push(`OR productNestedTags.nestedtagid='${nestedtag.nestedtagid}'\n`)
          }
        })
        query.push('))\n');
      }
      else {
        query.push(`${!isBoth ? 'WHERE ' : ''}(productTags.tagId='${action.tagInfo.tagid}')\n`)
      }
    }
    else {
      if (!_.isEmpty(action.nestedTags)) {
        if (!query[idxToReplace]) query[idxToReplace] = `INNER JOIN productNestedTags ON productNestedTags.productId = products.productId\n`
        query.push('OR\n');
        query.push(`(productTags.tagId='${action.tagInfo.tagid}' AND\n`);
        let hasFirstNested = false;

        _.forEach(action.nestedTags, (nestedtag) => {
          if (!hasFirstNested) {
            hasFirstNested = true;
            query.push(`(productNestedTags.nestedtagid='${nestedtag.nestedtagid}'\n`)
          }
          else {
            query.push(`OR productNestedTags.nestedtagid='${nestedtag.nestedtagid}'\n`)
          }
        })
        query.push('))\n');
      }
      else {
        query.push(`OR (productTags.tagId='${action.tagInfo.tagid}')\n`)
      }
    }
  });
  if (isBoth) query.push(')\n');
  return query.join('');
}

const getProductsByFilter = ({ offset, limit, filters: { brands, actions } }) => {
  let queryString;

  if (brands && !actions) {
    let hasFirst = false;

    queryString = `
      SELECT DISTINCT products.*, 
        (SELECT Count(*) FROM likes WHERE likes.productid = products.productid) AS likes,
        (SELECT Count(*) FROM comments WHERE comments.productid = products.productid) AS commentcount
      FROM products
        INNER JOIN brands ON brands.brandId = products.brandId
    `

    _.forEach(brands, brand => {
      if (!hasFirst) {
        queryString += `\tWHERE products.brandId='${brand.brandid}'\n`
        hasFirst = true;
      }
      else {
        queryString += `\tOR products.brandId='${brand.brandid}'\n`
      }
    });
  }

  else if (actions && !brands) {
    let query = [
      'SELECT DISTINCT products.*,\n',
      '(SELECT Count(*) FROM likes WHERE likes.productid = products.productid) AS likes,\n',
      '(SELECT Count(*) FROM comments WHERE comments.productid = products.productid) AS commentcount\n',
      'FROM products\n',
      'INNER JOIN productTags ON productTags.productId = products.productId\n',
      null,
    ]
    queryString = modifyQuery(query, actions, false, 5);
    
  }
    
  // // if there brands with actions, choose only the products from these brands with the specified actions
  else {
    let hasFirstBrand = false;

    let query = [
      'SELECT DISTINCT products.*,\n',
      '(SELECT Count(*) FROM likes WHERE likes.productid = products.productid) AS likes,\n',
      '(SELECT Count(*) FROM comments WHERE comments.productid = products.productid) AS commentcount\n',
      'FROM products\n',
      'INNER JOIN brands ON brands.brandId = products.brandId\n',
      'INNER JOIN productTags ON productTags.productId = products.productId\n',
      null,
    ];

    _.forEach(brands, brand => {
      if (!hasFirstBrand) {
        query.push(`WHERE \n(\nproducts.brandId='${brand.brandid}'\n`)
        hasFirstBrand = true;
      }
      else {
        query.push(`OR products.brandId='${brand.brandid}'\n`);
      }
    });

    query.push(')\n');
    query.push('AND\n')
    query.push('(\n')

    queryString = modifyQuery(query, actions, true, 6);
  }
  queryString += `ORDER BY likes DESC, products.productid ASC LIMIT ${limit} OFFSET ${offset};`;
  
  return connection
  .query(queryString)
  .then(res => res.rows)
  .catch(e => console.error(e.stack));
}

export { getProductsByFilter };
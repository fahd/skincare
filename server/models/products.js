import { connection } from '../db';
import _ from 'lodash';
import { getProductsByFilter } from './methods/getProductsByFilter';

const Products = {};

Products.getProductsByFilter = getProductsByFilter;

Products.getProducts = ({ offset, limit }, cb) => {
  const queryString = `
    SELECT products.*, 
    (SELECT Count(*) FROM likes WHERE likes.productid = products.productid) AS likes,
    (SELECT Count(*) FROM comments WHERE comments.productid = products.productid) AS commentcount
    FROM products
    ORDER BY likes DESC, products.productid ASC
    LIMIT ${limit}
    OFFSET ${offset}
  `
  return connection
    .query(queryString)
    .then(res => res.rows)
    .catch(e => console.error(e.stack));
};

Products.getProduct = ({productid}, cb) => {  
  const queryString = `
    SELECT *,
    (SELECT Count(*) FROM likes WHERE likes.productid = products.productid) AS likes
     FROM products WHERE productid=${productid}
  `;

  return connection
    .query(queryString)
    .then(res => res.rows[0])
    .catch(e => console.error(e.stack));
};

Products.getComments = ({id, offset, limit}) => {
  const queryString = `
      SELECT users.*, comments.*, (
        SELECT Count(*)
        FROM commentlikes
        WHERE commentlikes.commentid = comments.commentid
      ) as likes
      FROM comments
      INNER JOIN users ON comments.userid = users.userid 
      WHERE comments.productid = ${id}
      ORDER BY likes DESC, comments.commentid DESC
      LIMIT ${limit}
      OFFSET ${offset}
  `;
  
  return connection
    .query(queryString)
    .then(res => res.rows)
    .catch(e => console.error(e.stack));
};

Products.getCommentById = ({ commentid }) => {

  const queryString = `
    SELECT users.*, comments.*, (
      SELECT Count(*)
      FROM commentlikes
      WHERE commentlikes.commentid = comments.commentid
    ) as likes
    FROM comments
    INNER JOIN users ON comments.userid = users.userid 
    WHERE comments.commentid = ${commentid}
    ORDER BY likes DESC;
  `;
  
  return connection
    .query(queryString)
    .then(res => res.rows[0])
    .catch(e => console.error(e.stack));
}

Products.addProductComment = ({ userid, productid, html }) => {

  const queryString = `
    INSERT INTO comments (userid, productid, commentBody)
    VALUES (${userid}, ${productid}, $$${html}$$)
    RETURNING commentid
  `;

  return connection
    .query(queryString)
    .then(res => res.rows[0])
    .catch(e => console.error(e.stack));
}



Products.getLikes = (args, cb) => {
  const { id } = args;
  
  const queryString = `
    SELECT Count(*) FROM likes WHERE productid=${id}
  `;

  return connection
    .query(queryString)
    .then(res => res.rows)
    .catch(e => console.error(e.stack));
};

Products.getActionOptions = () => {
  const queryString = `
    SELECT tagtype FROM tags WHERE isAction IS TRUE;
  `;

  return connection
    .query(queryString)
    .then(res => res.rows)
    .catch(e => console.error(e.stack));
};

Products.getAllActions = () => {
  const queryString = `
    SELECT * FROM tags;
  `;

  return connection
    .query(queryString)
    .then(res => res.rows)
    .catch(e => console.error(e.stack));
};

Products.getTags = ({productid}) => {
  const queryString = `
    SELECT tags.tagtype FROM productTags
    JOIN tags ON productTags.tagid = tags.tagid
    JOIN products ON products.productid = productTags.productid
    WHERE products.productid=${productid}
    UNION
    SELECT nestedTags.tagtype FROM productNestedTags
    JOIN nestedTags ON productNestedTags.nestedTagId = nestedTags.nestedTagId
    JOIN products ON products.productid = productNestedTags.productid
    WHERE products.productid=${productid}
    ORDER BY tagtype;
  `;

  return connection
    .query(queryString)
    .then(res => res.rows)
    .catch(e => console.error(e.stack));
};

Products.getNestedTags = ({tagid}) => {
  const queryString = `
    SELECT nestedtagid, tagtype FROM nestedTags
    WHERE tagid=${tagid}
  `;

  return connection
    .query(queryString)
    .then(res => res.rows)
    .catch(e => console.error(e.stack));
};

Products.hasVoted = ({userid, productid}) => {  
  const queryString = `
    SELECT likes.userid
    FROM likes
    WHERE userid=${userid}
    AND productid=${productid};
  `;

  return connection
    .query(queryString)
    .then(res => res.rows[0])
    .catch(e => console.error(e.stack));
};

Products.upvoteProduct = ({ userid, productid, hasVoted }) => {  
  let queryString;

  if (!hasVoted) {
    queryString = `
      INSERT INTO likes (userid, productid)
      VALUES (${userid}, ${productid})
      RETURNING *
    `
  } else {
    queryString = `
      DELETE FROM likes 
      WHERE userid=${userid}
      AND productid=${productid}
      RETURNING *
    `
  }
  
  return connection
    .query(queryString)
    .then(res => res.rows)
    .catch(e => console.error('Error in upvoting:', e, e.stack));
};

Products.hasCommentMarkedHelpful = ({ commentid, userid }) => {
  const queryString = `
    SELECT commentlikes.userid
    FROM commentlikes
    WHERE userid='${userid}'
    AND commentid='${commentid}';
  `;

  return connection
    .query(queryString)
    .then(res => res.rows[0])
    .catch(e => console.error(e.stack));
}

Products.markHelpfulComment = ({ commentid, userid, hasCommentMarkedHelpful }) => {
  let queryString;

  if (!hasCommentMarkedHelpful) {
    queryString = `
      INSERT INTO commentlikes (userid, commentid)
      VALUES (${userid}, ${commentid})
      RETURNING *
    `
  }
  else {
    queryString = `
      DELETE FROM commentlikes 
      WHERE userid='${userid}'
      AND commentid='${commentid}'
      RETURNING *
    `
  }
  
  return connection
    .query(queryString)
    .then(res => res.rows)
    .catch(e => console.error('Error in marking helpful comment:', e, e.stack));
}


Products.getAllProductsByBrand = ({ brandid, offset, limit }, cb) => {
  const queryString = `
    SELECT products.*, 
    (SELECT Count(*) FROM likes WHERE likes.productid = products.productid) AS likes,
    (SELECT Count(*) FROM comments WHERE comments.productid = products.productid) AS commentcount
    FROM products
    JOIN brands ON products.brandid = brands.brandid
    WHERE brands.brandid=${brandid}
    GROUP BY products.productid
    ORDER BY likes DESC, products.productid ASC
    LIMIT ${limit}
    OFFSET ${offset}
  `;

  return connection
    .query(queryString)
    .then(res => res.rows)
    .catch(e => console.error(e.stack));
};

Products.searchProducts = ({ searchQuery }) => {
  const queryString = `
    SELECT productid, products.brandid, title, productImg, brands.name FROM brands 
    JOIN products ON products.brandid = brands.brandid
  
    ORDER BY
    (
    SIMILARITY(LOWER(brands.name), LOWER('%${searchQuery}%')) > 0.3
    OR SIMILARITY(LOWER(title), LOWER('%${searchQuery}%')) > 0.3
    ) DESC
  
    LIMIT 20;
  `;

  return connection
    .query(queryString)
    .then(res => res.rows)
    .catch(e => console.error(e.stack));
}

Products.searchBrand = ({ searchQuery }) => {
  const queryString = `
    SELECT name, slug FROM brands
    WHERE LOWER(name) LIKE LOWER('%${searchQuery}%')
    OR LOWER(slug) LIKE LOWER('%${searchQuery}%')
    LIMIT 1;
  `;

  return connection
    .query(queryString)
    .then(res => res.rows[0])
    .catch(e => console.error(e.stack));
}

Products.addProductTag = ({ tagid, productid }) => {
  let queryString = `
    INSERT INTO productTags (productId, tagId)
    VALUES (${productid}, ${tagid})
  `
  return connection
    .query(queryString)
    .then(res => res.rows[0])
    .catch(e => console.error(e.stack));
}

Products.addNestedProductTag = ({ nestedtagid, productid }) => {
  let queryString = `
    INSERT INTO productNestedTags (productId, nestedTagId)
    VALUES (${productid}, ${nestedtagid})
  `
  return connection
    .query(queryString)
    .then(res => res.rows[0])
    .catch(e => console.error(e.stack));
}


Products.getNestedProductParentTag = ({ nestedtagid }) => {  
  let queryString = `
    SELECT tagid FROM nestedTags
    WHERE nestedTagId=${nestedtagid}
  `;

  return connection
    .query(queryString)
    .then(res => res.rows[0])
    .catch(e => console.error(e.stack));
}

Products.checkProductHasTagId = ({ tagid, productid }) => {  
  let queryString = `
    SELECT tagid FROM productTags
    WHERE tagId=${tagid}
    AND productId=${productid}
  `;

  return connection
    .query(queryString)
    .then(res => res.rows[0])
    .catch(e => console.error(e.stack));
}



Products.findByUrl = ({ product_url }) => {
  const queryString = `
    SELECT productid FROM products WHERE product_url='${product_url}'
  `;

  return connection
    .query(queryString)
    .then(res => res.rows[0])
    .catch(e => console.error(e.stack));
}

export default Products;

import { connection } from '../db';

const Lists = {};

Lists.findListById = ({ listid } ) => {
  let queryString = `
    SELECT lists.*, users.userid, users.first_name, users.last_name, users.username, users.avatar,
    (SELECT Count(*) FROM listlikes WHERE listlikes.listid = lists.listid) AS listlikes
    FROM lists
    INNER JOIN users ON users.userid = lists.userid
    WHERE listid=${listid}
  `;
  
  return connection
    .query(queryString)
    .then(res => res.rows[0])
    .catch(e => console.error('Error in finding list:', e, e.stack));
}

Lists.findLists = ({ userid }) => {
  let queryString = `SELECT * FROM lists WHERE userid=${userid}`;
  
  return connection
    .query(queryString)
    .then(res => res.rows)
    .catch(e => console.error('Error in finding list:', e, e.stack));
}

Lists.deleteList = ({ listid }) => {
  let queryString = `
      DELETE FROM listlikes
      WHERE listid=${listid};

      DELETE FROM listproducts
      WHERE listid=${listid};

      DELETE FROM lists
      WHERE listid=${listid};
  `;
  
  return connection
    .query(queryString)
    .then(res => res.rows)
    .catch(e => console.error('Error in deleting list:', e, e.stack));
}

Lists.voteList = ({ hasVoted, listid, userid }) => {
  let queryString;

  if (hasVoted) {
    queryString = `
      DELETE FROM listlikes
      WHERE listid=${listid}
      AND userid=${userid}
      RETURNING listid;
    `
  }
  else {
    queryString = `
      INSERT INTO listlikes (listid, userid)
      VALUES (${listid}, ${userid})
      RETURNING listid;
    `;
  }

  return connection
    .query(queryString)
    .then(res => res.rows[0])
    .catch(e => console.error('Error in deleting list:', e, e.stack));
};

Lists.findVoted = ({ listid, userid }) => {
  let queryString = `
    SELECT listlikes.userid
    FROM listlikes
    WHERE userid=${userid}
    AND listid=${listid};
  `;

  return connection
    .query(queryString)
    .then(res => res.rows[0])
    .catch(e => console.error('Error in finding user voted:', e, e.stack));
};


Lists.getListDetails = ({ listid }) => {
  let queryString = `
    SELECT 
    products.*, listProducts.action, listProducts.description,
    (SELECT Count(*) FROM likes WHERE likes.productid = listProducts.productid) AS likes
    FROM listProducts
    INNER JOIN products ON products.productid = listProducts.productid
    INNER JOIN lists ON lists.listid = listProducts.listid
    WHERE lists.listid=${listid}
    ORDER BY listProducts.listproductid;
    ;
  `
  return connection
    .query(queryString)
    .then(res => res.rows)
    .catch(e => console.error('Error in getting list details:', e, e.stack));
}

Lists.createList = ({title, slug, userid }) => {  
  
  let queryString = `
    INSERT INTO lists (routine_title, slug, userid)
    VALUES ('${title}', '${slug}', ${userid})
    RETURNING *
  `

  return connection
    .query(queryString)
    .then(res => res.rows[0])
    .catch(e => console.error('Error in creating list:', e, e.stack));
};

Lists.addListProducts = ({ listid, values, products }) => {  
  const queries = [];

  products.forEach(product => {
    const action = values[product.id];
    const description = values[`description-${product.id}`];
    const productid = product.productid;

    const query = 
    `INSERT INTO listProducts (action, description, listId, productId) VALUES ('${action}', '${description}', ${listid}, ${productid})`
    queries.push(connection.query(query));
  });

  return Promise
    .all(queries)
    .then((values) => {
      return true;
    })
    .catch(error => {
      console.log('Error in adding list products:', error.message);
      return false;
    })
};



export default Lists;

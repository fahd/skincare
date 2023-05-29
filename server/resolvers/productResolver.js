export default {
  Query: {
    product: async (parent, { productid }, { models }) => {   
      return await models.Products.getProduct({ productid });
    },
    products: async (parent, { filters, offset, limit}, { models }) => {
      const parsedFilters = filters ? JSON.parse(filters) : null;
      if (parsedFilters) return await models.Products.getProductsByFilter({ filters: parsedFilters, limit, offset }); 
      else return await models.Products.getProducts({ offset, limit }); 
    },
    searchProducts: async (parent, { searchQuery }, { models }) => {
      if (searchQuery && searchQuery.length > 2) {
        return await models.Products.searchProducts({ searchQuery });      
      }
    },
    getActionOptions: async (product, args, { models }) => {
      return await models.Products.getActionOptions();
    },
    getAllActions: async (product, args, { models }) => {
      return await models.Products.getAllActions();
    }
  },
  Mutation: {
    upvoteProduct: async (parent, { productid }, { models, me }) => {
      const userid = me.userid;
      const hasVoted = await models.Products.hasVoted({ userid, productid });
      await models.Products.upvoteProduct({ productid, userid, hasVoted });
            
      return await models.Products.getProduct({ productid });
    },
    markHelpfulComment: async (product, { commentid }, { models, me }) => {
      const userid = me.userid;
      const hasCommentMarkedHelpful = await models.Products.hasCommentMarkedHelpful({ userid, commentid });

      await models.Products.markHelpfulComment({ userid, commentid, hasCommentMarkedHelpful });
      return !hasCommentMarkedHelpful;
    },
    addProductComment: async (product, { productid, html }, { models, me }) => {
      const userid = me.userid;
      const { commentid } = await models.Products.addProductComment({ userid, productid, html });

      return await models.Products.getCommentById({ commentid });      
    },
  },
  Product: {
    comments: async (product, {offset, limit}, { models }) => {
      return await models.Products.getComments({ id: product.productid, offset, limit});
    },
    hasVoted: async (product, { userid }, { models }) => {
      return await models.Products.hasVoted({ userid, productid: product.productid });
    },
    tags: async (product, args, { models }) => {
      return await models.Products.getTags({ productid: product.productid });
    },
    brand: async (product, args, { models }) => {
      return await models.Brands.getBrand({ brandid: product.brandid });
    }
  },
  Comment: {
    hasCommentMarkedHelpful: async (product, { userid }, { models }) => {
      return await models.Products.hasCommentMarkedHelpful({userid, commentid: product.commentid});
    }
  },
  Tag: {
    nestedTags: async (tag, args, { models }) => {      
      const tagid = tag.tagid;
      return await models.Products.getNestedTags({tagid});
    }
  },
  ProductSearchResult: {
    products: async (products, args, { models }) => {
      return products;
    },
    brand: async (parent, { searchQuery }, { models }) => {
      return await models.Products.searchBrand({ searchQuery });
    }
  }
};

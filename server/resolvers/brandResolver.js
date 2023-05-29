export default {
  Query: {
    getBrand: async (parent, { slug, offset, limit }, { models }) => {     
      const brand = await models.Brands.findBySlug({ slug });
      return await models.Products.getAllProductsByBrand({ brandid: brand.brandid, offset, limit });
    },
    getAllBrands: async (parent, args, { models }) => {     
      return await models.Brands.getAllBrands();
    },
    getAllBrandsPage: async (parent, { offset }, { models }) => {
      let letter = String.fromCharCode(offset);
      const brandResultsByLetter = await models.Brands.getAllBrandsPage({ letter, offset });
      const notLetter = offset > 122;
      
      return {
        letter: notLetter ? '#' : letter,
        brands: brandResultsByLetter
      }
    },
    getAllBrandsPageSeed: async (parent, args, { models }) => {   
      const brandResultsByA = await models.Brands.getAllBrandsPage({ letter:'a', offset:97 });
      const brandResultsByB = await models.Brands.getAllBrandsPage({ letter: 'b', offset: 98 });
      const brandInfo = [
        { letter: 'a', brands: brandResultsByA },
        { letter: 'b', brands: brandResultsByB }
      ];

      return brandInfo;
    },
    getBrandsByQuery: async (parent, { searchQuery }, { models }) => {     
      return await models.Brands.getBrandsByQuery({ searchQuery }); 
    }
  },
};

import { randomString } from './userResolver';

function normalizeText(text) {
  const textToLowerCase = text.toLowerCase();
  const match = textToLowerCase.match(/[a-zA-Z0-9]+/g);
  return match ? match.join("-") : randomString(8);
}

export default {
  Query: {
    getList: async (parent, args, { models, me }) => {
      const { routine_title, slug, hasliked, listlikes, listid, avatar, username, first_name, last_name, userid } = await models.Lists.findListById({ listid: args.listid });      

      const list = { routine_title, slug, listid, hasliked, listlikes };
      const user = { userid, first_name, last_name, username, avatar };

      return {
        list,
        user
      }
    },
    findMyLists: async (parent, args, { models, me }) => {
      return await models.Lists.findLists({ userid: me.userid });
    },
  },
  Mutation: {
    createList: async (parent, {products, values}, { models, me }) => {
      const productsJSON = JSON.parse(products);
      const valuesJSON = JSON.parse(values);
      const listTitle = valuesJSON.list_name;
      const slug = normalizeText(listTitle);
          
      const newList = await models.Lists.createList({
        slug,
        userid: me.userid,
        title: listTitle
      });

      await models.Lists.addListProducts({
        listid: newList.listid,
        values: valuesJSON,
        products: productsJSON
      });

      const list = {
        routine_title: listTitle,
        listid: newList.listid,
        slug
      }

      return { list }
    },
    deleteList: async (parent, { listid }, { models, me }) => {
      const hasList = await models.Lists.findListById({ listid });
      if (hasList) {
        await models.Lists.deleteList({ listid });
        return await models.Lists.findLists({ userid: me.userid });
      }
      return false;
    },
    voteList: async (parent, { listid }, { models, me }) => {
      const hasVoted = await models.Lists.findVoted({ listid, userid: me.userid });            
      const vote = await models.Lists.voteList({ hasVoted, listid, userid: me.userid });
      return vote.listid;
    },
  },
  List: {
    products: async (list, args, { models, me }) => {
      return await models.Lists.getListDetails({ listid: list.listid });
    },
    hasliked: async (list, args, { models, me }) => {      
      const vote = await models.Lists.findVoted({ listid: list.listid, userid: me.userid });

      return vote !== undefined;
    }
  },
};

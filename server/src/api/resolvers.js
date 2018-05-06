import fetch from "node-fetch";
import {
  getUserOwnedItems,
  getBorrowedItems,
  getItem,
  getUser
} from "./resources/jsonServer";

const jsonApi = "http://localhost:3001";

export default function({ jsonResources, pgResources, fbResources }) {
  return {
    Query: {
      items(root) {
        return pgResources.getItems();
      },
      users(root) {
        return fbResources.getUsers();
      },
      item(root, { id }, context) {
        return context.loaders.SingleItem.load(id);
      },
      user(root, { id }, context) {
        return context.loaders.SingleUser.load(id);
      }
    },
    Item: {
      async borrower({ borrower }) {
        return jsonResources.getBorrower();
      },
      itemowner({ itemowner }, args, context) {
        return context.loaders.ItemOwner.load(itemowner);
      }
    },
    User: {
      borroweditems({ id }, args, context) {
        return context.loaders.BorrowedItems.load(id);
      },
      owneditems({ id }, args, context) {
        return context.loaders.UserOwnedItems.load(id);
      }
    },
    Mutation: {
      addItem(root, args) {
        return pgResources.addItem(args);
      }
    }
  };
}

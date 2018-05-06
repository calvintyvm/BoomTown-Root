import DataLoader from "dataloader";
import {
  getUserOwnedItems,
  getBorrowedItems,
  getItem,
  getUser,
  getItemOwner
} from "./resources/jsonServer";

export default function({ jsonResources, pgResources, firebaseResources }) {
  return {
    UserOwnedItems: new DataLoader(ids =>
      Promise.all(ids.map(id => pgResources.getUserOwnedItems(id)))
    ),
    BorrowedItems: new DataLoader(ids =>
      Promise.all(ids.map(id => pgResources.getBorrowedItems(id)))
    ),
    SingleItem: new DataLoader(ids =>
      Promise.all(ids.map(id => pgResources.getItem(id)))
    ),
    SingleUser: new DataLoader(ids =>
      Promise.all(ids.map(id => firebaseResources.getUser(id)))
    ),
    ItemOwner: new DataLoader(ids =>
      Promise.all(ids.map(id => firebaseResources.getUser(id)))
    )
  };
}

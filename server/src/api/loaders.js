import DataLoader from 'dataloader';
import {
    getUserOwnedItems,
    getBorrowedItems,
    getItem,
    getUser,
    getItemOwner
} from './resources/jsonServer';

export default function({ jsonResources, pgResources }) {
    return {
        UserOwnedItems: new DataLoader(ids =>
            Promise.all(ids.map(id => jsonResources.getUserOwnedItems(id)))
        ),
        BorrowedItems: new DataLoader(ids =>
            Promise.all(ids.map(id => jsonResources.getBorrowedItems(id)))
        ),
        SingleItem: new DataLoader(ids =>
            Promise.all(ids.map(id => pgResources.getItem(id)))
        ),
        SingleUser: new DataLoader(ids =>
            Promise.all(ids.map(id => jsonResources.getUser(id)))
        ),
        ItemOwner: new DataLoader(ids =>
            Promise.all(ids.map(id => jsonResources.getItemOwner(id)))
        )
    };
}
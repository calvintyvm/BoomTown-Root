import DataLoader from 'dataloader';
import { getUserOwnedItems, getIndividualItems } from './jsonServer'

export function Loaders() {
    return {
        UserOwnedItems: new DataLoader((ids) => {
            return Promise.all(ids.map(id => getUserOwnedItems(id)))
        }),
        UserBorrowedItems: new DataLoader((ids) =>{
            return Promise.all(ids.map(id => getBorrowedItems(id)))
        }),
        IndividualItems: new DataLoader((ids)=>{
            return Promise.all(ids.map(id=>getIndividualItems(id)))
        }),
        IndividualUsers: new DataLoader((ids)=>{
            return Promise.all(ids.map(id=>getIndividualUsers(id)))
        })


    }
}

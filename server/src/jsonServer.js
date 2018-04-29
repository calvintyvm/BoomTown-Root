import fetch from 'node-fetch';

export const getUserOwnedItems = (id) => {
    return fetch(`http://localhost:3001/items/?itemowner=${id}`)
            .then(response=>response.json())
}

export const getUserBorrowedItems = (id) => {
    return fetch(`http://localhost:3001/items/?borrower=${id}`)
            .then(response=>response.json())
}

export const getIndividualItems = (id) => {
    return fetch (`http://localhost:3001/items/${id}`)
            .then(response=>response.json())
}

export const getIndividualUsers = (id) => {
    return fetch (`http://localhost:3001/users/${id}`)
            .then(response=>response.json())
}
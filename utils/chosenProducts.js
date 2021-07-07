export function chosenProducts() {

    let store = localStorage.getItem('chosenGoods');

    if (store) {
        return JSON.parse(store);
    }
    return {};
}
import { storage } from "../main/main.js";

export function chosenProducts() {

    let store = localStorage.getItem(storage.chosenGoods);

    if (store) {
        return JSON.parse(store);
    }
    return {};
}
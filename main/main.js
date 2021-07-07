// ************ APPLICATION на ES6 - КЛАССЫ ******************

import { data2, cartPage, cartSum, root, inputPrice, inputRange, rangeWrap, select, button } from "../constant/constants.js";
import { template_ID } from "../utils/template_ID.js";
import { rangeValue, Type, filter } from "../utils/filter.js";
import { chosenProducts } from "../utils/chosenProducts.js";

class Storage {

    constructor() {
        this.LSname = "storage";
        this.Cart = 'cartpage__active';
    }

    getLS() {
        let store = localStorage.getItem(this.LSname);

        if (store) {
            return JSON.parse(store);
        }
        return {};
    }

    setInLS(attr, ind, storeVal, amount, store, storeID) {

        let result = this.getLS();

        (result[attr] && result[attr] < storeVal) ? result[attr]++: result[attr] = 1;

        cartPage.classList.add('cartpage__active');

        amount[ind].textContent = result[attr];


        let Products = chosenProducts();

        store[ind].textContent = data2[attr].store - result[attr];

        Products[storeID] = +store[ind].textContent;


        cartSum.textContent = Object.values(result).reduce((acc, i) => acc += i, 0);

        this.recordLS(result, Products);
    }

    deleteFromLS(attr, ind, amount, store, storeID) {

        let result = this.getLS();

        result[attr] > 1 ? result[attr]-- : delete result[attr];

        amount[ind].textContent = result[attr];


        let Products = chosenProducts();

        store[ind].textContent = data2[attr].store - amount[ind].textContent;

        Products[storeID] = +store[ind].textContent;


        cartSum.textContent = Object.values(result).reduce((acc, i) => acc += i, 0);

        Object.values(result).length ? cartPage.classList.add('cartpage__active') : cartPage.classList.remove('cartpage__active');

        this.recordLS(result, Products);
    }

    render(mass) {

        let result = this.getLS(),
            Products = chosenProducts(),
            str = "",
            a,
            b;


        Object.values(result).length ? cartPage.classList.add('cartpage__active') : cartPage.classList.remove('cartpage__active');
        // сохранение активного класса корзины при перезагрузке

        cartSum.textContent = Object.values(result).reduce((acc, i) => acc += i, 0);
        // сохранение товаров в корзине при перезагрузке


        for (let key in mass) {

            let i = mass[key];

            result[key] ? a = result[key] : a = "";

            Products[i.storeid] ? b = Products[i.storeid] : b = i.store;

            let card = `
            <div class="card">
                <span class="model"> ${i.model}</span>
                <a href='./template.html' alt="good-link"  ><img class="pict" src="${i.pict}" data-id="${key}"></img></a>
                <span class="rating"> ${i.ratingReview} </span>                
                <div class="settings">
                    <div class="price"> <span class="usd">${i.price.toLocaleString()}</span> &#8381; </div>
                    <div class="controll"> 
                        <span class="plus" data-id="${key}"> + </span>
                        <span class="amount" > ${a} </span>  
                        <span class="minus" data-id="${key}"> - </span>  
                    </div>                
                </div>
                <div class="store"> В наличии: <span data-storeID="${i.storeid}"> ${b} </span> </div>                
            </div>`;
            str += card;
        }
        root.innerHTML = str;

        // DOM-elements-constants
        const plus = document.querySelectorAll('.plus'),
            minus = document.querySelectorAll('.minus'),
            amount = document.querySelectorAll('.amount'),
            store = document.querySelectorAll(".store span"),
            pict = document.querySelectorAll(".pict");


        template_ID(pict);

        // событие плюс
        this.plusEvent(plus, store, amount);

        // событие минус
        this.minusEvent(minus, amount, store);

    }

    plusEvent(plus, store, amount) {
        plus.forEach((el, ind) => {
            let storeVal = +store[ind].innerHTML,
                attr = el.getAttribute('data-id'),
                storeID = store[ind].dataset.storeid;

            el.addEventListener('click', () => {
                this.setInLS(attr, ind, storeVal, amount, store, storeID);
            });
        });
    }

    minusEvent(minus, amount, store) {
        minus.forEach((el, ind) => {
            el.addEventListener('click', () => {
                let attr = el.getAttribute('data-id'),
                    storeID = store[ind].dataset.storeid;
                this.deleteFromLS(attr, ind, amount, store, storeID);
            });
        });
    }

    recordLS(data, chosen) {
        localStorage.setItem(this.LSname, JSON.stringify(data));
        localStorage.setItem('chosenGoods', JSON.stringify(chosen));
    }
}

export const storage = new Storage();
storage.render(data2);

// ************** Фильтр *******************

rangeValue(inputPrice, inputRange, rangeWrap);

button.addEventListener('click', function(e) {
    e.preventDefault();
    let val1 = inputPrice.value,
        val2 = select.value;

    if (val2 != "all") {
        let data = Type(data2, val2);
        storage.render(data);
        filter(val1, data);

    } else {
        storage.render(data2);
        filter(val1, data2);
    }

});
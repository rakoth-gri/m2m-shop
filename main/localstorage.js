// ************ APPLICATION на ES6 - КЛАССЫ ******************

import { data2 } from "../data/data.js";
import { template_ID } from "../utils/template_ID.js";

const root = document.querySelector('.root'),
    cartPage = document.querySelector('.cartpage'),
    cartSum = document.querySelector('.cartSum');



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

    setInLS(attr, ind, storeVal) {

        let result = this.getLS();

        (result[attr] && result[attr] < storeVal) ? result[attr]++: result[attr] = 1;

        cartPage.classList.add('cartpage__active');

        amount[ind].textContent = result[attr];

        cartSum.textContent = Object.keys(result).length;

        this.recordLS(result);
    }

    deleteFromLS(attr, ind) {

        let result = this.getLS();

        result[attr] > 1 ? result[attr]-- : delete result[attr];

        amount[ind].textContent = result[attr];

        cartSum.textContent = Object.keys(result).length;

        Object.values(result).length ? cartPage.classList.add('cartpage__active') : cartPage.classList.remove('cartpage__active');

        this.recordLS(result);
    }

    render(mass) {

        let result = this.getLS(),
            str = "",
            a;

        Object.values(result).length ? cartPage.classList.add('cartpage__active') : cartPage.classList.remove('cartpage__active');
        // сохранение активного класса корзины при перезагрузке

        cartSum.textContent = Object.keys(result).length;
        // сохранение товаров в корзине при перезагрузке

        for (let key in mass) {
            let i = mass[key];

            let num = result[key];
            num ? a = result[key] : a = "";

            let card = `
            <div class="card">
                <div class="model"> ${i.model}</div>
                <a href='../template/template.html' alt="good-link"  ><img class="pict" src="${i.pict}" data-id="${key}"></img></a>                
                <div class="price"> <span class="usd">${i.price.toLocaleString()}</span> &#8381; </div>
                <div class="controll"> <span class="plus" data-id="${key}"> + </span> 
                <span class="amount" > ${a} </span>  <span class="minus" data-id="${key}"> - </span> 
                </div>
                <div class="store"> В наличии: <span> ${i.store} </span> </div>                
            </div>`;
            str += card;
        }
        root.innerHTML = str;
    }

    plusEvent() {
        plus.forEach((el, ind) => {
            let storeVal = +store[ind].innerHTML,
                attr = el.getAttribute('data-id');
            el.addEventListener('click', () => {
                this.setInLS(attr, ind, storeVal);
            });
        });
    }

    minusEvent() {
        minus.forEach((el, ind) => {
            el.addEventListener('click', () => {
                let attr = el.getAttribute('data-id');
                this.deleteFromLS(attr, ind);
            });
        });
    }

    recordLS(data) {
        localStorage.setItem(this.LSname, JSON.stringify(data));
    }
}

const storage = new Storage();
storage.render(data2);

// DOM-elements-constants
const plus = document.querySelectorAll('.plus'),
    minus = document.querySelectorAll('.minus'),
    amount = document.querySelectorAll('.amount'),
    store = document.querySelectorAll(".store span"),
    pict = document.querySelectorAll(".pict");

template_ID(pict);

// событие плюс
storage.plusEvent();

// событие минус
storage.minusEvent();
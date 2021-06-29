// ************ APPLICATION на ES6 - КЛАССЫ ******************

const wrapper = document.querySelector('.wrapper'),
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

    setInLS(attr, ind, storeVal, amount) {

        let result = this.getLS();

        let num = result[attr];
        (num && num < storeVal) ? result[attr]++: result[attr] = 1;

        cartPage.classList.add('cartpage__active');

        amount[ind].textContent = result[attr];

        cartSum.textContent = Object.keys(result).length;

        this.recordLS(result);
    }

    deleteFromLS(attr, ind, amount) {
        let result = this.getLS();

        let num = result[attr];

        num > 1 ? result[attr]-- : delete result[attr];

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
        // проверка на длину нового массива, сотворенного из объетка result

        cartSum.textContent = Object.keys(result).length;
        // сохранение товаров в корзине при перезагрузке

        for (let key in mass) {
            let i = mass[key];

            let num = result[key];
            num ? a = result[key] : a = "";

            let card = `
            <div class="card">
                <div class="model"> ${i.model}</div>
                <img class="pict" src="${i.pict}"></img>                
                <div class="price"> <span class="usd">${i.price}</span> $ </div>
                <div class="controll"> <span class="plus" data-id="${key}"> + </span> 
                <span class="amount" > ${a} </span>  <span class="minus" data-id="${key}"> - </span> 
                </div>
                <div class="store"> В наличии: <span> ${i.store} </span> </div>                
            </div>`;
            str += card;
        }
        wrapper.innerHTML = str;
    }

    plusEvent(plus, amount) {
        let store = document.querySelectorAll(".store span");
        plus.forEach((el, ind) => {
            let storeVal = +store[ind].innerHTML,
                attr = el.getAttribute('data-id');
            el.addEventListener('click', () => {
                this.setInLS(attr, ind, storeVal, amount);
            });
        });
    }

    minusEvent(minus, amount) {
        minus.forEach((el, ind) => {
            el.addEventListener('click', () => {
                let attr = el.getAttribute('data-id');
                this.deleteFromLS(attr, ind, amount);
            });
        });
    }

    recordLS(data) {
        localStorage.setItem(this.LSname, JSON.stringify(data));
    }
}

const storage = new Storage();

async function getInfo() {
    let p = await fetch('https://gist.githubusercontent.com/rakoth-gri/aff357d5d9974bb0d74f2dec85c0a38c/raw/5278b37e30a7c222abc94a69e7a1bdcfa03e5426/BASE.json');
    let resp = await p.json();
    storage.render(resp);

    const plus = document.querySelectorAll('.plus'),
        minus = document.querySelectorAll('.minus'),
        amount = document.querySelectorAll('.amount');

    storage.plusEvent(plus, amount);
    storage.minusEvent(minus, amount);

}

getInfo();
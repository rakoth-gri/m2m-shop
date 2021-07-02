import { data2 } from '../constant/constants.js';
const root = document.querySelector('.root');


class Cart {

    constructor() {
        this.LSname = "storage";
    }

    getLS() {
        let store = localStorage.getItem(this.LSname);
        if (store) {
            return JSON.parse(store);
        }
        return {};
    }

    render(data) {

        let result = this.getLS();

        root.innerHTML = `
            <a href='./index.html' alt="main" class="main"> <img  src="./icons/back.png"></img> ГЛАВНАЯ </a>            
            <div class="model"> Наименование изделия </div>
            <div class="price"> Цена, в руб. / шт. </div>
            <div class="store"> Кол-во </div>
            <div class="summOfModel"> Всего, руб. / шт. </div>
            <div class="action"> Действие </div>`;

        for (let key in result) {
            if (result.hasOwnProperty(key)) {
                let store = result[key],
                    model = data[key].model,
                    price = data[key].price;

                root.innerHTML += `                    
                    <div class="model">${model}</div>
                    <div class="price"><span>${price.toLocaleString()}</span> &#8381; </div>
                    <div class="store">${store}</div>
                    <div class="summOfModel"><span> ${(price*store).toLocaleString()} </span> &#8381; </div>
                    <button class="del" data-del="${key}"> Удалить </button>                     
                `;
            }
        }

        root.innerHTML += "<div class='itogo'>ИТОГО:</div><div class='all'></div>";

        let all = document.querySelector('.all'),
            del = document.querySelectorAll('.del'),
            summa = document.querySelectorAll('.summOfModel span');

        // метод суммы товаров    
        this.sumGoods(summa, all);
        // метод удаления товара
        this.delete(del);
    }

    delete(del) {
        let result = this.getLS();
        for (let i of del) {
            i.addEventListener('click', () => {
                let attr = i.dataset.del;
                delete result[attr];
                localStorage.setItem(this.LSname, JSON.stringify(result));
                this.render(data2);
            });
        }

    }

    sumGoods(summa, all) {
        let summa_arr = [...summa];
        all.innerHTML = summa_arr.reduce((acc, i) => acc += +i.textContent.replace(/\s/g, ""), 0).toLocaleString() + " &#8381;";
    }
}

const cart = new Cart();
cart.render(data2);













// ************** Аналогично через функцию и событие "storage" *****************

// window.addEventListener('storage', RenderLocal);

// function RenderLocal() {
//     let memory = JSON.parse(localStorage.getItem('memory'));
//     const out = document.querySelector('.out');

//     out.innerHTML = `<div class="model"> Наименование изделия </div>
//     <div class="price"> Цена, USD / шт. </div>
//     <div class="store"> Кол-во </div>
//     <div class="summOfModel"> Всего, USD / шт. </div>
//     <div class="action"> Действие </div>`;


//     for (let key in memory) {
//         if (memory.hasOwnProperty(key)) {
//             let store = memory[key],
//                 model = data[key].model,
//                 price = data[key].price;
//             out.innerHTML += `                    
//                 <div class="model">${model}</div>
//                 <div class="price"><span>${price}</span> USD </div>
//                 <div class="store">${store}</div>
//                 <div class="summOfModel"><span>${(price*store).toFixed(2)}</span> </div>
//                 <button class="delet" data-del="${key}"> Удалить </button>                     
//             `;
//         }
//     }

//     out.innerHTML += "<div class='itogo'>ИТОГО:</div><div class='all'></div>";

//     const all = document.querySelector('.all'),
//         delet = document.querySelectorAll('.delet'),
//         spanSumm = document.querySelectorAll('.summOfModel span');

//     for (let i of delet) {
//         i.addEventListener('click', () => {
//             let data_attr = i.dataset.del;
//             delete memory[data_attr];
//             localStorage.setItem('memory', JSON.stringify(memory));
//             RenderLocal();
//         });
//     }

//     // суммирование товаров
//     let itogo = 0;
//     for (let item of spanSumm) {
//         let a = +item.textContent;
//         itogo += a;
//     }
//     all.textContent = itogo.toFixed(2);
// }

// // сохранение после перезагрузки
// lsVisual();

// function lsVisual() {
//     RenderLocal();
// }
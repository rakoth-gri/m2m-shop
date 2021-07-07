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

        let result = this.getLS(),
            second = '',
            link = `<a href='./index.html' alt="main" class="main"> <img  src="./icons/back.png"></img> ГЛАВНАЯ </a>`;

        const first = `
            <tr>            
                <th class="model"> Наименование изделия </th>
                <th class="price"> Цена, в руб. / шт. </th>
                <th class="store"> Кол-во </th>
                <th class="summOfModel"> Всего, руб. / шт. </th>
                <th class="action"> Действие </th>
            </tr>`;

        for (let key in result) {
            if (result.hasOwnProperty(key)) {
                let store = result[key],
                    model = data[key].model,
                    price = data[key].price;

                second += `
                <tr>                    
                    <td class="model">${model} </td>
                    <td class="price"><span>${price.toLocaleString()}</span> &#8381; </td>
                    <td class="store">${store}</td>
                    <td class="summOfModel"><span> ${(price*store).toLocaleString()} </span> &#8381; </td>
                    <td> <button class="del" data-del="${key}"> Удалить </button> </td>
                </tr>                        
                `;
            }
        }

        root.innerHTML = `
        ${link}
        <table class="table">
            ${first}
            ${second}
        </table>
        <div class="check">
            <div class='itogo'>ИТОГО:</div>
            <div class='all'></div>
        </div>
        `;

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
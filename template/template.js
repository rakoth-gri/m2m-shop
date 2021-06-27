import { data2 } from '../data/data.js';

class Template {

    constructor() {
        this.id = "template_ID";
    }

    getLS() {
        let result = localStorage.getItem(this.id);

        if (result) {
            return JSON.parse(result);
        }
    }

    render(data) {
        let result = this.getLS(),
            i = data[result];

        const root = document.querySelector('.root');

        let temp = `
        <div class="good_desc">
            <span class="model"> ${i.model}</span>
            <div class="store"> На складе: ${i.store}  </div>
            <img alt="picture" src="${i.pict}" class="pict">
            <span class="price"> Цена в руб. с НДС: ${i.price.toLocaleString()} </span>
            <p class="desc1">${i.desc1} </p>
            <p class="desc2">${i.desc2} </p>
            <div class="specification">${i.specification}</div>
        </div>        
        `;

        root.innerHTML = temp;
    }
}

const template = new Template();
template.render(data2);
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
            <div class="store"> На складе: <span>${i.store}</span> шт. </div>
            <img alt="picture" src="${i.pict}" class="pict">
            <div class="price"> Цена с НДС: <span>${i.price.toLocaleString()}</span> &#8381; </div>
            <p class="desc">${i.desc1} </p>
            <p class="desc">${i.desc2} </p>
            <h2 class="title"> Основные возможности </h2>            
        </div>        
        `;
        root.innerHTML = temp;

        const goodDesc = document.querySelector('.good_desc');

        this.specificationChange(i, goodDesc);
    }

    specificationChange(data, container) {

        let mass = data.specification.split(';'),
            str = "",
            str2 = "";

        mass.map(item => {
            let temp = `<p class="specification"> ${item};</p>`;
            str += temp;
        });

        container.innerHTML += str;

        if (data.specification2) {

            container.innerHTML += `<h2 class="title"> Другие характеристики </h2>`;
            const mass2 = data.specification2.split(';');
            mass2.map(item => {
                let temp = `<p class="specification"> ${item};</p>`;
                str2 += temp;
            });
            container.innerHTML += str2;
        }
    }
}

const template = new Template();
template.render(data2);
import { data2, checkboxMin, checkboxMax, checkboxRating } from "../constant/constants.js";
import { storage } from "../main/main.js";


// сортировка по убыванию
export function Min(data) {
    let newData = {};
    let mass = Object.entries(data).sort((a, b) => b[1].price - a[1].price);
    // фильтруем массив по убыванию

    // создаем новый объект
    for (let i of mass) {
        newData[i[0]] = i[1];
    }
    return newData;
}

// сортировка по возрастанию
export function Max(data) {
    let newData = {};
    let mass = Object.entries(data).sort((a, b) => a[1].price > b[1].price ? 1 : -1);
    // фильтруем массив по возрастанию

    // создаем новый объект
    for (let i of mass) {
        newData[i[0]] = i[1];
    }
    return newData;
}

// фильтр по цене
export function Price(data, value) {
    let newData = {};
    let mass = Object.entries(data).filter(i => Math.round(i[1].price / 1000) * 1000 === Math.round(value / 1000) * 1000);
    // фильтруем массив по цене

    // создаем новый объект
    for (let i of mass) {
        newData[i[0]] = i[1];
    }
    return newData;
}

// отображение RangeValue в DOM-element
export function rangeValue(input, range, root) {

    input.oninput = () => {
        let value = +input.value;
        range.value = value;
        rangeValue ? root.innerHTML = value.toLocaleString() + " &#8381;" : root.textContent = ``;
    };
}

// фильтр по рейтингу
export function RatingReview(data, value) {
    let newData = {};
    let mass = Object.entries(data).sort(((a, b) => b[1].ratingReview - a[1].ratingReview));
    // фильтруем массив по цене

    // создаем новый объект
    for (let i of mass) {
        newData[i[0]] = i[1];
    }
    return newData;
}


// фильтр по типу оборудования
export function Type(data, value) {
    let newData = {};

    let mass = Object.entries(data).filter(i => i[1].model.includes(value));
    // фильтруем массив по цене

    // создаем новый объект
    for (let i of mass) {
        newData[i[0]] = i[1];
    }
    return newData;
}

// основной код фильтра
export const filter = (val1, data) => {
    let min = Min(data),
        max = Max(data),
        ratingReview = RatingReview(data);

    if (checkboxMin.checked && !checkboxMax.checked) {
        storage.render(min);
    } else if (checkboxMax.checked && !checkboxMin.checked) {
        storage.render(max);
    } else if (checkboxRating.checked && !checkboxMin.checked && !checkboxMax.checked) {
        storage.render(ratingReview);
    } else if (val1) {
        let price = Price(data, val1);
        storage.render(price);
    } else {
        storage.render(data);
    }
};
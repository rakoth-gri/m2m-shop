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
    let mass = Object.entries(data).filter(i => i[1].price == value || Math.round(i[1].price / 1000) * 1000 === Math.round(value / 1000) * 1000);
    // фильтруем массив по цене

    // создаем новый объект
    for (let i of mass) {
        newData[i[0]] = i[1];
    }
    return newData;
}

// отображение range Value in DOM-tree

export function rangeValue(input, range, root) {

    input.oninput = () => {
        let value = +input.value;
        range.value = value;
        rangeValue ? root.innerHTML = value.toLocaleString() + " &#8381;" : root.textContent = ``;
    };
}
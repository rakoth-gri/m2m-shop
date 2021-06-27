export const template_ID = (data) => {
    data.forEach(item => {
        let key = item.dataset.id;
        item.addEventListener('click', drawTemplate);

        function drawTemplate() {
            localStorage.setItem("template_ID", JSON.stringify(key));
        }
    });

};
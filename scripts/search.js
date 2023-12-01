document.addEventListener("DOMContentLoaded", e => {

    mode.addEventListener("change", e => {
        if (mode.value === "") {
            //HIDE ALL
            catList.classList.add("hidden")
            prodList.classList.add("hidden")
        } else if (mode.value === "all") {
            //HIDE CATEGORY
            catList.classList.add("hidden")
            //SHOW PROD LIST
            prodList.classList.remove("hidden")
            fetch("http://localhost:8081/api/products/")
            .then(r => r.json())
            .then(data => {
                prodList.innerHTML = "<option value=\"\">Select a Product</option>"; //CLEAR PROD LIST
                data.forEach(item => {
                    prodList.innerHTML += `<option value="${item.productId}">${item.productName} - $${Number(item.unitPrice).toFixed(2)}</option>`
                })
            })
        } else {
            //SHOW CATEGORY
            catList.classList.remove("hidden")
            prodList.classList.remove("hidden")
        }
    });

    fetch("http://127.0.0.1:8081/api/categories")
        .then(r => r.json())
        .then(data => {
            data.forEach(item => catList.innerHTML += `<option value="${item.categoryId}">${item.name} - ${item.description}</option>`)
        })

    catList.addEventListener("change", e => {
        fetch("http://localhost:8081/api/products/")
            .then(r => r.json())
            .then(data => {
                prodList.innerHTML = "<option value=\"\">Select a Product</option>"; //CLEAR PROD LIST
                data.filter(i => i.categoryId === catList.value).forEach(item => {
                    prodList.innerHTML += `<option value="${item.productId}">${item.productName} - $${Number(item.unitPrice).toFixed(2)}</option>`
                })
            })
    })


    prodList.addEventListener("change", e => {
        window.location = "details.html?productId=" + prodList.value;
    })

}) //END DOM CONTENT LOADED
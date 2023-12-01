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
                data.sort((a,b) => a.productName > b.productName ? 1 : -1);//EXTRA CREDIT SORT
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
                data.sort((a,b) => a.productName > b.productName ? 1 : -1);//EXTRA CREDIT SORT
                prodList.innerHTML = "<option value=\"\">Select a Product</option>"; //CLEAR PROD LIST
                productImage.src = `./images/cat${catList.value}.png`;
                data.filter(i => i.categoryId == catList.value).forEach(item => {
                    prodList.innerHTML += `<option value="${item.productId}">${item.productName} - $${Number(item.unitPrice).toFixed(2)}</option>`
                })
            })
    })


    prodList.addEventListener("change", e => {
        fetch("http://localhost:8081/api/products/" + prodList.value)
        .then(r => r.json())
        .then(item => {
            details.innerHTML = ""; //CLEAR 
            details.innerHTML += `<tr><th>product Id:</th><td>${item.productId}</td></tr>`
            details.innerHTML += `<tr><th>product Name:</th><td>${item.productName}</td></tr>`
            details.innerHTML += `<tr><th>unit Price:</th><td>$${Number(item.unitPrice).toFixed(2)}</td></tr>`
            details.innerHTML += `<tr><th>Link to details:</th><td>
                <a href="details.html?productId=${item.productId}">
                    <button> Details </button>
                </a>
            </td></tr>`
        })
        // window.location = "details.html?productId=" + prodList.value;
    })

}) //END DOM CONTENT LOADED
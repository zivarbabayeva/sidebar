function GetProducts() {
    let basket = JSON.parse(localStorage.getItem('basket'));

    if (basket.length === 0) {
        document.querySelector('#tbl').classList.add('d-none')
        let alert = '';
        alert = `
        <div class="alert alert-danger text-center" role="alert">
        <i class="fa-solid fa-bag-shopping"></i>Basket is empty <a href="index.html">Alış-verişə başla</a>
        </div>
        `
        document.getElementById('Alert').innerHTML = alert
    }
    else {
        for (let item of basket) {
            let metin = '';
            metin += `
                <tr>
                    <td>${item.id}</td>
                    <td>
                        <img src="${item.image}" alt="">
                    </td>
                    <td>
                        ${item.title}
                    </td>
                    <td>
                        <input type="number" value=${item.count}>
                    </td>
                    <td>${item.price}</td>
                    <td>
                        <button class="btn btn-danger">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
                </tr> 
            `

            document.getElementById('tbody').innerHTML += item
        }
    }
}

GetProducts();

function ClearAll() {
    localStorage.setItem('basket', JSON.stringify([]))
}


let btn_clear = document.getElementById('btn_clear');
btn_clear.onclick = function () {
    ClearAll();
    document.querySelector('#tbl').classList.add('d-none')
    GetProducts();
    ShowCount();
}


document.getElementById('btn_refresh').onclick = function () {
    location.reload();
}


function ShowCount() {
    let basket = JSON.parse(localStorage.getItem('basket'));
    let count = document.getElementById('count');
    count.innerHTML = basket.length
}
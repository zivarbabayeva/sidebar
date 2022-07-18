 function SendRequest() {
     fetch('https://fakestoreapi.com/products')
         .then(response => response.json())
         .then(data => {
             console.log(data)
             let item = '';
             data.forEach(product => {
                 item += `
                        <div class="card" style="">
                            <img src="${product.image}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text">${product.price}</p>
                                <p class="card-text">${product.description}</p>
                                <a href="#" class="btn btn-primary">add to cart</a>
                            </div>
                        </div>
                        `
                     document.getElementById('list').innerHTML = item

                })
         })
         .catch(error => console.log(error));
 }
 SendRequest();

 if(localStorage.getItem('basket') === null) {
    localStorage.setItem('basket',JSON.stringify([]))
}


let buttons = document.querySelectorAll('.btn');

for(let btn of buttons) {
    btn.addEventListener('click',function(e) {
        e.preventDefault();
        let basket = JSON.parse(localStorage.getItem('basket'));
        let id = e.target.parentElement.parentElement.parentElement.id;
        let img = e.target.parentElement.previousElementSibling.src;
        let prod_title = e.target.previousElementSibling.previousElementSibling.innerText;
        let prod_price = e.target.previousElementSibling.innerText;
        let existProd = basket.find(x => x.id === id)
        if(existProd === undefined) {
            basket.push({
                id: id,
                title: prod_title,
                price: prod_price,
                image: img,
                count: 1
            })
        }
        else{
            existProd.count += 1;
        }
        localStorage.setItem('basket',JSON.stringify(basket))
        ShowCount();
    })
}
function ShowCount() {
    let basket = JSON.parse(localStorage.getItem('basket'));
    let count = document.getElementById('count');
    count.innerHTML = basket.length
}
ShowCount();
let rootElem = document.querySelector('basket');
let randomId = () => `item-${Math.round(Math.random() * 10000)}`
let formatPrice = (total) => `Total: ${total}$`
let basket = {
    items: [],
    addItem() {
        this.items = [...this.items, {
            id: randomId(), qty: 0, price: 0, title: ''
        }]
    },
    removeItem(id) {
        this.items = this.items.filter(i => i.id !== id)
    },
    getTotal() {
        return this.items.reduce((acc, next) => { return acc += next.qty * next.price }, 0)
    },
    isEmpty() {
        return this.items.length === 0
    }
}
function renderApp(basket, rootElem) {
    renderItems(basket, rootElem)
    renderTotal(basket, rootElem)
    renderInterface(basket, rootElem)
}
function renderItems(basket, rootElem) {
    let itemsRoot = refreshItemsRoot(rootElem)
    basket.items.forEach(item => {
        renderItem(item, itemsRoot, rootElem)
    })
} function renderItem(item, itemsRoot) {
    let itemWrapper = document.createElement('div')
    itemWrapper.classList.add('item')
    let titleInput = document.createElement('input')
    titleInput.classList.add('input')
    titleInput.setAttribute('placeholder', 'Product title')
    let qtyInput = document.createElement('input')
    qtyInput.classList.add('input')
    qtyInput.setAttribute('placeholder', 'Quantity')
    let priceInput = document.createElement('input')
    priceInput.classList.add('input')
    priceInput.setAttribute('placeholder', 'Price')
    let removeBtn = document.createElement('button')
    removeBtn.classList.add('input')
    removeBtn.textContent = 'Remove'
    removeBtn.addEventListener('click', () => {
        basket.removeItem(item.id)
        renderItems(basket, rootElem, rootElem)
    })
    itemWrapper.append(titleInput, qtyInput, priceInput, removeBtn)
    itemsRoot.appendChild(itemWrapper)
}
function renderTotal(basket, rootElem) {
    let totalElem = document.createElement('div')
    totalElem.classList.add('total')
    totalElem.textContent = formatPrice(basket.getTotal())
    rootElem.appendChild(totalElem)
}
function refreshItemsRoot(rootElem) {
    let itemsRootSelector = '.items-root'
    if (!rootElem.querySelector(itemsRootSelector)) {
        let itemsRoot = document.createElement('div')
        itemsRoot.classList.add('items-root')
        rootElem.appendChild(itemsRoot)
        return itemsRoot
    } else {
        let itemsRoot = rootElem.querySelector(itemsRootSelector)
        itemsRoot.innerHTML = ''
    }
}

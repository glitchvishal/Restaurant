const coffeeSelect = document.querySelector('#coffee');
const addonSelect = document.querySelector('#addon');
const table = document.querySelector('#table');
const quantityHolder = document.querySelector('#quantity');

const coffeeTypes = ['Espresso', 'Cappuccino', 'Latte'];
const addOnTypes = ['Milk', 'Cream', 'Latte'];

const priceTable = {
    'Espresso-Milk': 60,
    'Espresso-Cream': 75,
    'Espresso-Latte': 100,
    'Cappuccino-Milk': 80,
    'Cappuccino-Cream': 90,
    'Cappuccino-Latte': 125,
    'Latte-Milk': 100,
    'Latte-Cream': 125,
    'Latte-Latte': 150,
}

let orders = [];
let quantity = 0;

const init = () => {
    coffeeTypes.forEach(coffee => {
        const option = document.createElement('option');
        option.value = coffee;
        option.innerText = coffee;
        coffeeSelect.appendChild(option);
    });
    
    addOnTypes.forEach(addon => {
        const option = document.createElement('option');
        option.value = addon;
        option.innerText = addon;
        addonSelect.appendChild(option);
    });
}

const renderTable = () => {
    const items = orders.map((order, index) => {
        const { coffee, addon, unit, quantity, price } = order;
        return `<tr>
            <th scope="row">${index+1}</th>
            <td>${coffee} - ${addon}</td>
            <td>${unit}</td>
            <td>${quantity}</td>
            <td>${price}</td>
        </tr>`
    })

    const totalPrice = orders.reduce((acc, order) => {
        return acc + order.price;
    }, 0);

    
    const total = `<tr>
        <th scope="row">💵</th>
        <th colspan="3">Total</th>
        <td>${totalPrice}</td>
    </tr>`;

    table.innerHTML = items.join('') + total;
}

const change = (type) => {
    switch(type) {
        case 'add':
            quantity++;
            break;
        case 'sub':
            if(quantity > 0) {
                quantity--;
            }
            break;
        case 'reset':
            quantity = 0;
            break;
        default:
            break;
    }
    quantityHolder.innerText = quantity;
}

const addItem = () => {
    if(quantity === 0) return alert('Please select at least 1 quantity');

    const order = {
        coffee: coffeeSelect.value,
        addon: addonSelect.value,
        unit: priceTable[`${coffeeSelect.value}-${addonSelect.value}`],
        quantity: quantity,
        price: priceTable[`${coffeeSelect.value}-${addonSelect.value}`] * quantity
    };
    orders.push(order);
    renderTable();
    reset();
}

const reset = () => {
    coffeeSelect.value = 'none';
    addonSelect.value = 'none';
    change('reset');
}
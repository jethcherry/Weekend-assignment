const product = [
    {
        id: 0,
        image: '/images/foldable-mobile.jpeg',
        title: 'z Flip Foldable Mobile',
        price: 15600,
        
    },
    {
        id: 1,
        image: '/images/airpods.jpeg',
        title: 'Air Pods Pro',
        price: 7800,
    },
    {
        id: 2,
        image: '/images/camera250D.jpeg',
        title: '250D DSLR Camera',
        price: 29900,
    },
    {
        id: 3,
        image: '/images/head-phone.jpeg',
        title: 'Head phones',
        price: 13000,
    },
    {
        id:4,
        image: '/images/1.jpg',
        title:'TCL 50 Smart UHD 4K With HDR Google TV Frameless ',
        price: 50499,
    }
];

const categories = [...new Set(product.map((item) => item))];

let i = 0;

document.getElementById('root').innerHTML = product.map((item, index) => {
    const { image, title, price } = item;
    return `
        <div class='box'>
            <div class='img-box'>
                <img class='images' src='${image}' alt='${title}'></img>
            </div>
            <div class='bottom'>
                <p>${title}</p>
                <h2>Ksh ${price}.00</h2>
                <button onclick='addToCart(${index})'>Add to cart</button> 
            </div>
        </div>`;
}).join('');

var cart = [];
var discountApplied = false;

function addToCart(a) {
    cart.push({...categories[a]});
    displayCart();
}

function delElement(a) {
    cart.splice(a, 1);
    displayCart();
}

function displayCart() {
    let j = 0, total = 0;
    document.getElementById("count").innerHTML = cart.length;
    if (cart.length === 0) {
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
        document.getElementById("total").innerHTML = "Ksh 0.00";
    } else {
        document.getElementById('cartItem').innerHTML = cart.map((items) => {
            var { image, title, price } = items;
            total += price;
            return `
                <div class='cart-item'>
                    <div class='row-img'>
                        <img class='rowimg' src='${image}' alt='${title}'>
                    </div>
                    <p style='font-size: 12px;'>${title}</p>
                    <h2 style='font-size: 12px;'>Ksh ${price}</h2>
                    <i class="fa-solid fa-trash" onclick='delElement(${j++})'></i>
                </div>`;
        }).join('');
        document.getElementById("total").innerHTML = "Ksh " + total + ".00";
    }
}

function applyDiscount() {
    if (discountApplied) {
        alert("Discount has already been applied.");
        return;
    }
    const discountPercentage = parseFloat(document.getElementById('discount').value);
    if (!isNaN(discountPercentage) && discountPercentage >= 0 && discountPercentage <= 100) {
        cart = cart.map(item => {
            item.price = item.price - (item.price * discountPercentage / 100);
            return item;
        });
        displayCart();
        discountApplied = true;
        document.getElementById('discount').disabled = true;
        document.querySelector('button[onclick="applyDiscount()"]').disabled = true;
    } else {
        alert("Please enter a valid discount percentage (0-30).");
    }
}

function checkout() {
    if (cart.length > 0) {
        const totalAmount = document.getElementById("total").innerHTML;
        localStorage.setItem('totalAmount', totalAmount); 
        window.location.href = 'payment.html'; 
    } else {
        alert('Your cart is empty!');
    }
}

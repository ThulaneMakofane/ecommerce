// variables

const cartBtn = document.querySelector(".nav-icon");
const closeBtn = document.querySelector(".close-btn");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDom = document.querySelector(".cart");
const cartItems = document.querySelector(".cart-items");
const cartOverlay = document.querySelector(".cart-overlay");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDom = document.querySelector(".products-center");

// cart
let cart = [];
//buttons
let ButtonsDom = [];
//getting the products
class Products {
  async getProducts() {
    try {
      let result = await fetch("products.json");
      let data = await result.json();
      let products = data.items;
      //getting simple data items  by decrementing it from products.json file
      products = products.map((item) => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, price, id, image };
      });

      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

//display product
class UI {
  DisplayProducts(products) {
    //console.log(products);

    // adding the products to the htmlDom
    let result = "";
    products.forEach((product) => {
      result += `
        
        
         <article class="product">
          <div class="img-container">
            <img
              src=${product.image}
              alt="product"
              class="product-img"
            />
            <button class="bag-btn" data-id=${product.id}>
              <i class="fas fa-shopping-cart">add to cart </i>
            </button>
          </div>
          <div>
            <h3>${product.title}</h3>
            <h4>$${product.price}</h4>
          </div>
        </article>
        
        
        `;
    });
    productsDom.innerHTML = result;
  }
  getBagButton() {
    const buttons = [...document.querySelectorAll(".bag-btn")];
    ButtonsDom = buttons;
    buttons.forEach((button) => {
      let id = button.dataset.id;

      let incart = cart.find((item) => item.id === id);
      if (incart) {
        button.innerText = "in Cart";
        button.disabled = true;
      }
      button.addEventListener("click", (event) => {
        event.target.innerText = "in Cart";
        event.target.disabled = true;

        // get product from products
        let cartItem = { ...Storage.getProduct(id), amount: 1 };

        // add product to the cart
        cart = [...cart, cartItem];
        console.log(cart);
        // save cart in local  storage
        Storage.SaveCart(cart);
        // get cart value
        this.setCartValue(cart);
        // display cart item
        this.AddCartItem(cartItem);
        // show cart
        this.ShowCart();
      });
    });
  }
  setCartValue(cart) {
    let tempTotal = 0;
    let itemTotal = 0;
    cart.map((item) => {
      tempTotal += item.price * item.amount;
      itemTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemTotal;
    console.log(cartTotal, cartItems);
  }

  AddCartItem(item) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = ` <img src=${item.image} alt="" />
          </div>
          <div>
            <h4>${item.title}</h4>
            <h5>$${item.price}</h5>
            <span class="remove-item" data-id= ${item.id}>remove </span>
          </div>

          <div>
            <i class="fas fa-chevron-up"data-id= ${item.id}></i>
            <p class="item-amount">${item.amount}</p>
            <i class="fas fa-chevron-down"data-id= ${item.id}></i>
          </div>`;
    cartContent.appendChild(div);
    console.log(cartContent);
  }
  ShowCart() {
    cartOverlay.classList.add("transparentBcg");
    cartDom.classList.add("showCart");
  }
}

//local  storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((product) => product.id === id);
  }

  static SaveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

//event listener
document.addEventListener("DOMContentLoaded", () => {
  let products = new Products();
  let ui = new UI();

  // get all products
  products
    .getProducts()
    .then((products) => {
      ui.DisplayProducts(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getBagButton();
    });
});

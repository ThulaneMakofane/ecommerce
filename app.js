// variables

const cartBtn = document.querySelector(".nav-icon");
const closeBtn = document.querySelector(".close-btn");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDom = document.querySelector(".cart");
const cartItems = document.querySelector(".cart-items");
const cartOverlay = document.querySelector("cart-overlay");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDom = document.querySelector(".products-center");

// cart
let cart = [];
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
    buttons.forEach((button) => {
      let id = button.dataset.id;
      console.log(id);
      let incart = cart.find((item) => item.id === id);
      if (incart) {
        button.innerText = "in Cart";
        button.disabled = true;
      } else {
        button.addEventListener("click", (event) => {
          event.target.innerText = "in Cart";
          event.target.disabled = true;
        });
      }
    });
  }
}

//local  storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
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

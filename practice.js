const cartBtn = document.querySelector(".nav-icon");
const closeBtn = document.querySelector(".close-btn");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDom = document.querySelector(".cart");
const cartItems = document.querySelector(".cart-items");
const cartOverlay = document.querySelector("cart-overlay");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDom = document.querySelector(".products-center");

// getting products class
class Products {
  async getProducts() {
    try {
      let results = await fetch("products.json");
      let data = await results.json;
      let products = data.items;
      products = products.map((item) => {
        const { id } = items.sys;
        const { title, price } = items.fields;
        const { image } = items.fields.file.url;
        return { title, price, id, image };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

//displaying products

class Ui {
  DisplayProducts(products) {
    results = "";
    products.forEach((product) => {
      results += `
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
    productsDom.innerHTML = results;
  }
}

/// local storage

class localStorage {}

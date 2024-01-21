const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(product, quantity) {
    this.items.push({ product, quantity });
  }

  calculateTotal() {
    let total = 0;
    for (const item of this.items) {
      total += item.product.price * item.quantity;
    }
    return total;
  }
}

const products = [
  new Product(1, "SanDisk", 599),
  new Product(2, "Hisense Deep Freezer", 1299),
  new Product(3, "Binatone Iron", 79),
  new Product(4, "Tecno Tablet", 349),
  new Product(5, "Oraimo Smartwatch", 199),
];

const shoppingCart = new ShoppingCart();

function displayProducts() {
  console.log("Available Products:");
  for (const product of products) {
    console.log(`${product.id}. ${product.name} - $${product.price}`);
  }
}

function main() {
  console.log("Welcome to Dozzy Electronics and Accessories!\n");

  function promptUser(question) {
    return new Promise((resolve) => rl.question(question, resolve));
  }

  async function handleChoice() {
    console.log(
      "1. Display Products\n2. Add to Cart\n3. View Cart\n4. Checkout\n5. Exit"
    );
    const choice = await promptUser("Enter your choice: ");

    switch (choice) {
      case "1":
        displayProducts();
        break;
      case "2":
        displayProducts();
        const productId = parseInt(
          await promptUser("Enter the product ID to add to cart:")
        );
        const quantity = parseInt(await promptUser("Enter the quantity:"));
        const selectedProduct = products.find(
          (product) => product.id === productId
        );
        if (selectedProduct) {
          shoppingCart.addItem(selectedProduct, quantity);
          console.log(`${quantity} ${selectedProduct.name}(s) added to cart.`);
        } else {
          console.log("Invalid product ID. Please try again.");
        }
        break;
      case "3":
        console.log("\nShopping Cart:");
        for (const item of shoppingCart.items) {
          console.log(`${item.product.name} - Quantity: ${item.quantity}`);
        }
        console.log(`Total: $${shoppingCart.calculateTotal()}`);
        break;
      case "4":
        console.log(`Total amount to pay: $${shoppingCart.calculateTotal()}`);
        console.log(
          "Thank you for shopping with us! Your order has been placed."
        );
        rl.close();
        break;
      case "5":
        console.log("Exiting the program. Goodbye!");
        rl.close();
        break;
      default:
        console.log("Invalid choice. Please try again.");
        break;
    }

    handleChoice();
  }

  handleChoice();
}

main();

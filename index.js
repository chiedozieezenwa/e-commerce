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
  new Product(1, "Laptop", 1000),
  new Product(2, "Headphones", 50),
  new Product(3, "Smartphone", 500),
];

const shoppingCart = new ShoppingCart();

function displayProducts() {
  console.log("Available Products:");
  for (const product of products) {
    console.log(`${product.id}. ${product.name} - $${product.price}`);
  }
}

function main() {
  while (true) {
    console.log(
      "\n1. Display Products\n2. Add to Cart\n3. View Cart\n4. Checkout\n5. Exit"
    );

    // Get user's choice
    const choice = prompt("Enter your choice: ");

    // Perform actions based on user's choice
    switch (choice) {
      case "1":
        displayProducts();
        break;
      case "2":
        displayProducts();
        const productId = parseInt(
          prompt("Enter the product ID to add to cart:")
        );
        const quantity = parseInt(prompt("Enter the quantity:"));
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
        return; // Exit the program
      case "5":
        console.log("Exiting the program. Goodbye!");
        return; // Exit the program
      default:
        console.log("Invalid choice. Please try again.");
    }
  }
}

main();

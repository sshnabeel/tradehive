const products = [
  {
    name: "iPhone 12",
    price: "$699",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "MacBook Pro",
    price: "$1299",
    image: "https://via.placeholder.com/150",
  },
  { name: "AirPods", price: "$199", image: "https://via.placeholder.com/150" },
];

const productList = document.getElementById("product-list");
const wishlistDisplay = document.getElementById("wishlist");

// Load wishlist from localStorage
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Function to update wishlist display
function updateWishlist() {
  wishlistDisplay.innerHTML =
    wishlist.length > 0
      ? wishlist
          .map(
            (item, index) =>
              `<p>${item.name} - ${item.price} <button onclick="removeFromWishlist(${index})">Remove</button></p>`
          )
          .join("")
      : "<p>No items saved</p>";

  // Save wishlist to localStorage
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// Generate products dynamically
products.forEach((product, index) => {
  const productDiv = document.createElement("div");
  productDiv.classList.add("product");
  productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.price}</p>
        <button class="save-for-later" data-id="${index}">Save for Later</button>
    `;
  productList.appendChild(productDiv);
});

// Add event listeners for "Save for Later"
document.querySelectorAll(".save-for-later").forEach((button) => {
  button.addEventListener("click", (event) => {
    const productId = event.target.getAttribute("data-id");
    const productToSave = products[productId];

    if (!wishlist.some((item) => item.name === productToSave.name)) {
      wishlist.push(productToSave);
      updateWishlist();
    }
  });
});

// Function to remove from wishlist
function removeFromWishlist(index) {
  wishlist.splice(index, 1);
  updateWishlist();
}

// Initialize wishlist on page load
updateWishlist();

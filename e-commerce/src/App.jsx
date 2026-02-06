import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import productImg1 from "./assets/1image.png";
import productImg2 from "./assets/2image.png";
import productImg3 from "./assets/3image.png";
import productImg4 from "./assets/4image.png";
import productImg5 from "./assets/5image.png";
import { useState } from "react";

const products = [
  {
    id: 1,
    price: 150,
    lastPrice: 190,
    rating: 4,
    amountRated: 134,
    description: "K Pop Short Sleeve T-Shirt and Shorts Outfits Set for Girls Hunters Rumi Mira Zoey Graphic Tees De-Mon Kids",
    colors: ["#000000", "#FFFFFF", "#FF5733"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [productImg1, productImg1, productImg1],
  },
  {
    id: 2,
    price: 35,
    lastPrice: 50,
    rating: 3,
    amountRated: 85,
    description: "Blooming Jelly Womens Business Casual Tank Top Summer Sleeveless Outfits 2026 Spring Trendy Dressy Work Shirt",
    colors: ["#FFFFFF", "#000000", "#FFB6C1"],
    sizes: ["S", "M", "L"],
    images: [productImg2, productImg2, productImg2],
  },
  {
    id: 3,
    price: 89,
    lastPrice: null,
    rating: 4,
    amountRated: 320,
    description: "Classic White Sneakers with red stripes standard edition for everyday comfort and style",
    colors: ["#FFFFFF", "#F0F0F0"],
    sizes: ["7", "8", "9", "10", "11"],
    images: [productImg3, productImg3, productImg3],
  },
  {
    id: 4,
    price: 24,
    lastPrice: 35,
    rating: 2,
    amountRated: 56,
    description: "Summer Hat for beach vibes and sunny days, wide brim for maximum UV protection",
    colors: ["#F5F5DC", "#000000"],
    sizes: ["One Size"],
    images: [productImg4, productImg4, productImg4],
  },
  {
    id: 5,
    price: 299,
    lastPrice: 450,
    rating: 5,
    amountRated: 12,
    description: "Elegant Evening Dress for special occasions, features silk texture and a flattering silhouette",
    colors: ["#000000", "#800020", "#000080"],
    sizes: ["S", "M", "L"],
    images: [productImg5, productImg5, productImg5],
  },
];


function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  function handleSelectProduct(product) {
    setSelectedProduct(product);
    setIsCartOpen(false);
  }

  function handleOpenCart() {
    setIsCartOpen(true);
    setSelectedProduct(null);
  }

  function handleAddToCart(product) {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }

  function handleRemoveFromCart(productId) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }

  function handleUpdateQuantity(productId, newQuantity) {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  }

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header onCartClick={handleOpenCart} cartCount={cartItemCount} />
      {isCartOpen ? (
        <Cart
          cartItems={cart}
          onBack={() => setIsCartOpen(false)}
          onRemove={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
        />
      ) : selectedProduct ? (
        <ProductDetail
          onAddToCart={handleAddToCart}
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
        />
      ) : (
        <Products
          onAddToCart={handleAddToCart}
          products={products}
          onSelectProduct={handleSelectProduct}
        />
      )}
    </div>
  );
}

function Products({ onAddToCart, products, onSelectProduct }) {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            onAddToCart={onAddToCart}
            onSelectProduct={onSelectProduct}
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </main>
  );
}

export default App;

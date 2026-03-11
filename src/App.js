import React, { useState, useEffect } from "react";

function App() {
  const [fruits, setFruits] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [kg, setKg] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // USING DUMMYJSON API - Reliable and works on Netlify
    fetch("https://dummyjson.com/recipes?limit=20")
      .then((res) => res.json())
      .then((data) => {
        // We map the recipe data to look like fruits for your store
        const formatted = data.recipes.map((item, index) => ({
          id: index + 1,
          name: item.name, // Using recipe name
          price: Math.floor(Math.random() * 200) + 40, // Random price
          image: item.image // Using recipe image (bonus!)
        }));
        setFruits(formatted);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const filteredFruits = fruits.filter((fruit) =>
    fruit.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleKgChange = (id, value) => {
    setKg({ ...kg, [id]: value });
  };

  const addToCart = (fruit) => {
    const quantity = kg[fruit.id] || 1;
    const item = {
      name: fruit.name,
      price: fruit.price,
      kg: quantity,
      total: fruit.price * quantity,
    };
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((item, i) => i !== index);
    setCart(updatedCart);
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.total, 0);

  const handlePayment = () => {
    alert("Payment Successful! Total Paid: ₹" + totalAmount);
  };

  if (loading) {
    return (
      <div className="container">
        <h1>🍎 Online Store</h1>
        <p>Loading items...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>🍎 Online Store</h1>

      <input
        type="text"
        placeholder="Search items..."
        className="search"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="fruit-list">
        {filteredFruits.map((fruit) => (
          <div key={fruit.id} className="fruit-card">
            {/* Displaying the image from the new API */}
            <img 
              src={fruit.image} 
              alt={fruit.name} 
              style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }} 
            />
            <h3>{fruit.name}</h3>
            <p>Price: ₹{fruit.price} / kg</p>

            <input
              type="number"
              min="1"
              placeholder="kg"
              className="kg-input"
              onChange={(e) => handleKgChange(fruit.id, e.target.value)}
            />

            <button onClick={() => addToCart(fruit)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <h2>🛒 Cart</h2>

      {cart.map((item, index) => (
        <div key={index} className="cart-item">
          <p>{item.name}</p>
          <p>{item.kg} kg</p>
          <p>₹{item.total}</p>

          <button className="remove-btn" onClick={() => removeFromCart(index)}>
            Remove
          </button>
        </div>
      ))}

      <h2>Total Amount: ₹{totalAmount}</h2>

      <button className="pay-btn" onClick={handlePayment}>
        Pay Amount
      </button>
    </div>
  );
}

export default App;

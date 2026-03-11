import React, { useState, useEffect } from "react";

function App() {
  const [fruits, setFruits] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [kg, setKg] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching from our reliable local "Fruit API"
    fetch("./fruits.json")
      .then((res) => res.json())
      .then((data) => {
        setFruits(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error:", error);
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
      id: fruit.id,
      name: fruit.name,
      price: fruit.price,
      kg: quantity,
      total: fruit.price * quantity,
      image: fruit.image
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
        <h1>🍎 Online Fruit Store</h1>
        <p>Loading fresh fruits...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>🍎 Online Fruit Store</h1>

      <input
        type="text"
        placeholder="Search fruits..."
        className="search"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="fruit-list">
        {filteredFruits.map((fruit) => (
          <div key={fruit.id} className="fruit-card">
            {/* Fruit Image */}
            <img 
              src={fruit.image} 
              alt={fruit.name} 
              style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%", marginBottom: "10px" }} 
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

      {cart.length === 0 && <p>Your cart is empty.</p>}

      {cart.map((item, index) => (
        <div key={index} className="cart-item">
          <p><strong>{item.name}</strong></p>
          <p>{item.kg} kg</p>
          <p>₹{item.total}</p>

          <button
            className="remove-btn"
            onClick={() => removeFromCart(index)}
          >
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
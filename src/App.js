import React, { useState, useEffect } from "react";

function App() {
  const [fruits, setFruits] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [kg, setKg] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. We use the FruityVice API (Fruits only)
    // 2. We wrap it in 'allorigins' proxy so it works on Netlify
    const apiUrl = "https://api.allorigins.win/raw?url=https://www.fruityvice.com/api/fruit/all";

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((fruit, index) => ({
          id: index + 1,
          name: fruit.name,
          price: Math.floor(Math.random() * 200) + 40,
        }));
        setFruits(formatted);
        setLoading(false);
      })
      .catch((error) => {
        console.log("API Error, using backup fruits:", error);
        // BACKUP PLAN: If API fails, load these fruits so site is never empty
        const backupFruits = [
          { id: 1, name: "Apple", price: 120 },
          { id: 2, name: "Banana", price: 50 },
          { id: 3, name: "Orange", price: 80 },
          { id: 4, name: "Mango", price: 150 },
          { id: 5, name: "Grapes", price: 90 },
          { id: 6, name: "Pineapple", price: 100 },
          { id: 7, name: "Strawberry", price: 200 },
          { id: 8, name: "Watermelon", price: 60 },
          { id: 9, name: "Papaya", price: 40 },
          { id: 10, name: "Pomegranate", price: 180 },
        ];
        setFruits(backupFruits);
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
        <h1>🍎 Online Fruit Store</h1>
        <p>Loading fruits...</p>
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

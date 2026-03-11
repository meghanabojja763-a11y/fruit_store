import React, { useState, useEffect } from "react";

function App() {

const [fruits,setFruits] = useState([]);
const [search,setSearch] = useState("");
const [cart,setCart] = useState([]);
const [kg,setKg] = useState({});

useEffect(()=>{

fetch("https://corsproxy.io/?https://www.fruityvice.com/api/fruit/all")
.then(res => res.json())
.then(data => {

const formatted = data.map((fruit,index)=>({
id:index+1,
name:fruit.name,
price:Math.floor(Math.random()*200)+40
}));

setFruits(formatted);

})
.catch(error => console.log(error));

},[]);


const filteredFruits = fruits.filter((fruit)=>
fruit.name.toLowerCase().includes(search.toLowerCase())
);


const handleKgChange = (id,value)=>{
setKg({...kg,[id]:value});
};


const addToCart = (fruit)=>{

const quantity = kg[fruit.id] || 1;

const item = {
name:fruit.name,
price:fruit.price,
kg:quantity,
total:fruit.price * quantity
};

setCart([...cart,item]);

};


const removeFromCart = (index)=>{
const updatedCart = cart.filter((item,i)=> i !== index);
setCart(updatedCart);
};


const totalAmount = cart.reduce((sum,item)=>sum + item.total ,0);


const handlePayment = ()=>{
alert("Payment Successful! Total Paid: ₹"+ totalAmount);
};


return(

<div className="container">

<h1>🍎 Online Fruit Store</h1>

<input
type="text"
placeholder="Search fruits..."
className="search"
onChange={(e)=>setSearch(e.target.value)}
/>

<div className="fruit-list">

{filteredFruits.map((fruit)=>(
<div key={fruit.id} className="fruit-card">

<h3>{fruit.name}</h3>
<p>Price: ₹{fruit.price} / kg</p>

<input
type="number"
min="1"
placeholder="kg"
className="kg-input"
onChange={(e)=>handleKgChange(fruit.id,e.target.value)}
/>

<button onClick={()=>addToCart(fruit)}>
Add to Cart
</button>

</div>
))}

</div>

<h2>🛒 Cart</h2>

{cart.map((item,index)=>(
<div key={index} className="cart-item">

<p>{item.name}</p>
<p>{item.kg} kg</p>
<p>₹{item.total}</p>

<button
className="remove-btn"
onClick={()=>removeFromCart(index)}
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
import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
// import "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState(0);

  const [products, setProducts] = useState([]);
  const productsCollectionRef = collection(db, "Products");

  const createProduct = async () => {
    await addDoc(productsCollectionRef, {
      name: newName,
      price: Number(newPrice),
    });
  };

  const updateProduct = async (id, price) => {
    const productDoc = doc(db, "products", id);
    const newFields = { price: price + 1 };
    await updateDoc(productDoc, newFields);
  };

  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
  };

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getProducts();
  }, []);

  return (
    <div className="App">
      <input
        placeholder="Product name..."
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Price..."
        onChange={(event) => {
          setNewPrice(event.target.value);
        }}
      />

      <button onClick={createProduct}> Create Product</button>
      {products.map((product) => {
        return (
          <div>
            {" "}
            <h1 className="text-red-600">Name: {product.name}</h1>
            <h1 className="text-red-800">Price: {product.price}$</h1>
            <button
              onClick={() => {
                updateProduct(product.id, product.price);
              }}
            >
              {" "}
              Increase Price
            </button>
            <button
              onClick={() => {
                deleteProduct(product.id);
              }}
            >
              {" "}
              Delete Product
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;

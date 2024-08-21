import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
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

  const productsCollectionRef = collection(db, "products");

  const createProduct = async () => {
    await addDoc(productsCollectionRef, {
      name: newName,
      price: Number(newPrice),
    });

    const data = await getDocs(productsCollectionRef);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const updateProduct = async (id, price) => {
    const productDoc = doc(db, "products", id);
    const newFields = { price: price + 1 };
    await updateDoc(productDoc, newFields);

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, price: price + 1 } : product
      )
    );
  };

  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);

    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
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
      <div className="wrapper-input">
        <input
          className="input"
          maxLength={15}
          placeholder="Product name..."
          onChange={(event) => setNewName(event.target.value)}
        />
        <input
          className="input"
          type="number"
          placeholder="Price..."
          onChange={(event) => setNewPrice(event.target.value)}
        />

        <button className="btn" onClick={createProduct}>
          + Create Product
        </button>
      </div>
      {products.map((product) => (
        <div className="wrapper-product" key={product.id}>
          <h3>
            Name: <span className="product">{product.name}</span>
          </h3>
          <h3>
            Price: <span className="product">{product.price}$</span>
          </h3>
          <button
            className="btn incres"
            onClick={() => updateProduct(product.id, product.price)}
          >
            Increase Price
          </button>
          <button className="btn" onClick={() => deleteProduct(product.id)}>
            Delete Product
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;

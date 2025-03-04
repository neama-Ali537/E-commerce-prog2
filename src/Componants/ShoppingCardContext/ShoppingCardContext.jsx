import React, { createContext, useState } from "react";

export const ShoppingCartContext = createContext({});

export default function ShoppingCardProvider({ children }) {
  let [cardItems, setCardItems] = useState([]);

  const [Massege, setMassege] = useState(false);
  const addToCart = (product) => {
    setCardItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 0) + (product.quantity || 1) }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: product.quantity || 1 }];
      }
    });
  
    setMassege(true);
    setTimeout(() => setMassege(false), 2000);
  };
  
  //func to get itemQuantity
  const getIyemsQuantity = (id) => {
    return cardItems.find((item) => item.id === id)?.quantity || 0;
  };
  
  // func to increase item
  const increaseItemQuantity = (id, title, image, price) => {
    setCardItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === id);
      if (!existingItem) {
        return [...currentItems, { id, title, image, price, quantity: 1 }];
      } else {
        return currentItems.map((item) =>
          item.id === id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
        );
      }
    });
  };
  

  const decreaseItemQuantity = (id) => {
    setCardItems(
      (currentItems) =>
        currentItems
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0) // بتشيل المنتجات اللي الكمية بتاعتها بقت صفر
    );
  };

  // func to remove items
  const removeItemFromCard = (id) => {
    setCardItems((currentItem) => currentItem.filter((item) => item.id !== id));
  };
  const getTotalItemsQuantity = () => {
    return cardItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cardItems,
           Massege,
        addToCart,
        decreaseItemQuantity,
        increaseItemQuantity,
        removeItemFromCard,
        getIyemsQuantity,
        getTotalItemsQuantity,
     
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

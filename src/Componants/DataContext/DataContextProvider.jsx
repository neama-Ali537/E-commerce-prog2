import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// إنشاء الـ Context
export const dataContext = createContext("");

// الدالة الرئيسية لجلب البيانات
export default function DataContextProvider(props) {
  // تخزين البيانات في الحالة
  const [mackUp, setMackUp] = useState([]);
  const [mist, setMist] = useState([]);
  const [furniture, setFurniture] = useState([]);
  const [eat, setEat] = useState([]);


  const baseURL = "https://dummyjson.com/products";

  // دالة للحصول على البيانات
  async function getData(callback, category) {
    let response = await axios.get(baseURL);
    let products = response.data.products;
console.log(products);

    let filterData = products.filter((item) => item.category === category);
    callback(filterData);
  }

  // جلب البيانات عند تحميل الصفحة
  useEffect(() => {
    getData(setMackUp, "beauty"); // استدعاء دالة الجلب
    getData(setMist, "fragrances"); // استدعاء دالة الجلب
    getData(setFurniture, "furniture"); // استدعاء دالة الجلب
    getData(setEat, "groceries"); // استدعاء دالة الجلب
    // استدعاء دالة الجلب
  }, []);

  return (
    <dataContext.Provider value={{ mackUp, eat, furniture, mist }}>
      {props.children} {/* تمرير الـ children ليتاح الوصول للبيانات */}
    </dataContext.Provider>
  );
}

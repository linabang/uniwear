import { create } from "zustand";
import { categoriesCollectionRef } from "../product-slice/products-slice";
import { doc, getDoc } from "firebase/firestore";

export const categoryDoc = doc(categoriesCollectionRef, "category");

export const useCategoty = create((set) => ({
  category:[],
  currentCategory:'',

  setCurrentCategory(value) {
    set({ currentCategory: value });
  },
    async getAllCategory() {
      const productSnap = await getDoc(categoryDoc);
      set({ category: productSnap.data()?.category });
      set({currentCategory:productSnap.data()?.category[4]})
    },
  
}))
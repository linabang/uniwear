import { create } from "zustand";
import { productsCollectionRef } from "../product-slice/products-slice";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../utils/firebase/firebase-config";

const userCollectionRef = collection(db, "users");

export const productDetails = create((set) => ({
  defineProducts: null,
  isFetch: false,
  sameProduct: [],

  getDefaneProducts: async (id) => {
    try {
      set({ isFetch: true });
      const defineProductsRes = doc(productsCollectionRef, id);
      const productSnap = await getDoc(defineProductsRes);
      set({ defineProducts: { id: productSnap.id, ...productSnap.data() } });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isFetch: false });
    }
  },
  async getSameProductByCategory(categories) {
    try {
      const q = query(
        productsCollectionRef,
        where("category", "array-contains", categories)
      );
      const quetySnapshot = await getDocs(q);
      const productData = quetySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      set({ sameProduct: productData });
    } catch (error) {
      console.log(error);
    }
  },
  async setCartNewItem({ productID, chooseSize, userId }) {
    try {
      const userDocRef = doc(userCollectionRef, userId);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        console.error("Пользователь не найден");
        return;
      }

      const productDocRef = doc(productsCollectionRef, productID);
      const productSnap = await getDoc(productDocRef);

      if (!productSnap.exists()) {
        console.error("Товар не найден");
        return;
      }

      await updateDoc(userDocRef, {
        cart: arrayUnion({
          quantity: 1,
          productId: productSnap.id,
          chooseSize,
        }),
      });
      console.log("Товар добавлен в корзину");
    } catch (error) {
      console.error("Ошибка добавления товара в корзину", error);
    }
  },
}));
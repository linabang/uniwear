/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth, db} from '../../utils/firebase/firebase-config'
import { toast } from "react-toastify";
import { collection, doc, setDoc } from "firebase/firestore";

const userCollectionRef = collection(db,'users')

export const useRegistr = create((set) => ({
  isFetch: false,
  async registrUser(email, password,navigate) {
    set({ isFetch: true });
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if(user.user.uid){
        const userDoc = doc(userCollectionRef, user.user.uid);
        await setDoc(userDoc, {isAdmin: false, cart:[], arders:[]})
      }
      console.log(user);
      set({isFetch:true})
      navigate('/')
      toast('Вы успкшно вошли 👍')
    } catch (error) {
      toast.error('Проверьте Email or password');
    } finally {
      set({ isFetch: false });
    }
  },
  async loginUser (email,password,navigate) {
    set({isFetch: true})
    try {
      const userCredentials = await signInWithEmailAndPassword(auth,email,password)
      console.log(userCredentials);
      set({isFetch:true})
      navigate('/')
      toast('Вы успкшно вошли 👍')
    } catch (error) {
      console.error(error)
      toast.error('Проверьте Email or password');
    } finally {
      set({isFetch:false})
    }
  }
}));

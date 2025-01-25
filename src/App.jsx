import './App.css'
import { Route, Routes } from 'react-router-dom'
import  { lazy , Suspense} from 'react'

const LoginPage = lazy(()=> import('./components/login/login'))
const RegistrPage = lazy(()=> import('./components/registr/registr'))
const MainPage = lazy(()=> import('./components/main-page/main-page'))
const ProductPage = lazy(()=> import('./components/product-page/product-page'))
const Basket = lazy (()=> import ('./components/basket/basket') )



function App() {

  return (
    <>
    <Suspense fallback={<h1>загруска</h1>}></Suspense>
    <Routes>
      <Route path='/' element={<MainPage/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/registr' element={<RegistrPage/>} />
      <Route path='/basket' element={<Basket/>} />
      <Route path='/productPage/:id' element={<ProductPage/>} />
    </Routes>
    </>
  )
}

export default App

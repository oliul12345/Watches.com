import React, { useEffect, useState } from "react";
import Show from "./Comphinents/Home/Show";
import { addToLs, getStoredCart } from "./Utlities/LocalStorage";

const Cart = () => {
  const [cart, SetCart] = useState([]);
  const [Shows,setShow] = useState([]);
  const [totalPrice,setTotalPrice] = useState(0);
  
  useEffect(() => {
    fetch("watches.json")
      .then((res) => res.json())
      .then((data) => SetCart(data));
  }, []);

  /////   load cart to the localStorage  ///
  useEffect(()=>{
    console.log( 'called the useEffect',cart.length)
    if(cart.length > 0){
      const storedCart = getStoredCart();
      console.log(storedCart,cart)


      const saveCart = [];
      for(const id of storedCart){
        console.log(id)
        const carts = cart.find(cart => cart.id === id)
        if(carts){
          saveCart.push(carts)
        }
      }
      console.log(saveCart)
      setShow(saveCart)

    }
  },[cart])
const handleShow = (watch) =>{
    // console.log(watch)
    let count = watch.price;
    const isShow = Shows.find(item=>item.id == watch.id)
    if(isShow){
      alert('Already Selected this')
    }else{
      Shows.forEach(counts => {
        count = count + counts.price;
      })
      setTotalPrice(count)
      setShow([...Shows,watch])

      addToLs(watch.id)
      
    }
   
}
const handleRemove = (remove) =>{
  // console.log(remove)
  const remaining = Shows.filter(item => item.id !== remove.id)
  setTotalPrice(totalPrice - remove.price)
  setShow(remaining)
}

  return (
    <div>
        {
             <div className="flex gap-4 w-11/12 mx-auto mt-5">
                 <div className="flex-1 grid grid-cols-3 gap-3">

               {
                  cart.map(Cart =>(
                    
                    <div className="card bg-slate-900 text-yellow-100 text-slate-950 rounded-xl shadow-xl p-5">
                      <figure className="px-10 pt-10">
                        <img
                          src={Cart.img}
                          alt="Shoes"
                          className="rounded-xl h-[300px] w-full"
                        />
                      </figure>
                      <div className="card-body items-center text-center">
                        <h2 className="card-title">{Cart.name}</h2>
                        <p>{Cart.brand}</p>
                        <div className="flex justify-around text-lime-600 font-semibold">
                            <p>Price : {Cart.price}</p>
                            <p>Quality : {Cart.quality}</p>
                        </div>
                        <div className="card-actions">
                          <button onClick={()=>handleShow(Cart)} className="bg-emerald-700 text-white py-3 px-4 rounded-xl mt-4">Buy Now</button>
                        </div>
                      </div>
                    </div>                  
                     ))
                }
               
         
                </div>
                <div className="w-[300px] bg-purple-100 px-4 rounded-xl">
                
                <Show 
                Shows={Shows}
                totalPrice={totalPrice}
                handleRemove={handleRemove}
                >

                </Show>
                 
                </div>
            </div>
        }
    </div>
  );
};

export default Cart;

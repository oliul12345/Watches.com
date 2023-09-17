import React from 'react';

const Show = ({Shows,totalPrice,handleRemove}) => {
    // console.log(totalPrice)
    // const{name,brand,price} = Shows;
    return (
        <div>
            <p className='text-3xl font-semibold'> Carts Length : {Shows.length}</p>
           <p>
           {
                Shows.map(oli => (
                 <div className='bg-slate-800 text-white mt-4 p-4 rounded-xl flex'>
                    <div>
                    <li> Price : {oli.price}</li>
                     <li>Name : {oli.name}</li>
                    </div>
                    <button onClick={()=>handleRemove(oli)} className='bg-rose-800 text-white py-0 px-2 rounded'>Remove</button>
                 </div>
                
                ))
            }
           </p>
           <hr className='my-5 border' />
           <h3 className='text-2xl font-bold mt-6'>Total Cost : {totalPrice.toFixed(2)}</h3>
        </div>
    );
};

export default Show;
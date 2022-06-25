import React,{useEffect, useState, useContext, createContext} from 'react'

import { toast } from 'react-hot-toast';
//little popup

const Context = createContext();

export const StateContext = ({ children })=>{
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    // whenever we change new quantity with previous then we use callback in setState hook
    const incQty = ()=>{
        setQty((prevQty)=>prevQty + 1)
    }

    const decQty = ()=>{
        setQty((prevQty)=>{
            if(prevQty-1<1){
                return 1
            }else{
                return prevQty - 1
            }
        })
    }

    const onAdd = (product, quantity)=>{
        const checkProductionCart = cartItems.find(item=> item._id == product._id);
        setTotalPrice((prevTotalPrice)=>prevTotalPrice + product.price * product.quantity);
        setTotalQuantities((prevQuantities)=>prevQuantities + quantity)


        if(checkProductionCart){

            // we are updating the cart items and we dont want that if we add item inside the productDetail page inc quantity then when we click on cart in home page it will still same quantity and price will inc dec according to it 
            //if item already exist in the cart it will not accept it

            const updatedCartItems = cartItems.map((cartProduct)=>{
                if(cartProduct._id === product._id) return {
                    ...cartItems,
                    quantity : cartProduct.quantity + quantity
                }
            })
            setCartItems(updatedCartItems);

        }else{
            product.quantity = quantity;
            setCartItems([...cartItems, {...product}])
        }

        toast.success(`${qty} ${product.name} added to the cart.`);

    }

    const onRemove = (product)=>{
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    const toggleCartItemQuanitity = (id, value)=>{
        foundProduct = cartItems.find((item)=>item._id === id)
        index = cartItems.findIndex((product)=> product._id === id)
        const newCartItem = cartItems.filter((item)=>item._id !== id) 
        // we want only one item from start index otherwise redunant item add 


        if(value === 'inc'){
            //newCart item because we cant change state directly
            setCartItems([...newCartItem, {...foundProduct, quantity:foundProduct.quantity + 1}])
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantities((prevTotalQuantities)=>prevTotalQuantities + 1)
        }else if(value == 'dec'){
            if(foundProduct.quantity > 1){
                setCartItems([...newCartItem, {...foundProduct, quantity:foundProduct.quantity - 1}])
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setTotalQuantities((prevTotalQuantities)=>prevTotalQuantities - 1)
            }
          
        }

    //     foundProduct = cartItems.find((item) => item._id === id)
    // index = cartItems.findIndex((product) => product._id === id);
    // const newCartItems = cartItems.filter((item) => item._id !== id)

    // if(value === 'inc') {
    //   setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
    //   setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
    //   setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    // } else if(value === 'dec') {
    //   if (foundProduct.quantity > 1) {
    //     setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
    //     setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
    //     setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
    //   }
    // }
    }


    return (
        <Context.Provider value={{setTotalQuantities, setTotalPrice,showCart,cartItems,setShowCart,totalPrice,totalQuantities,qty, incQty,decQty,onAdd,onRemove,toggleCartItemQuanitity,setCartItems}}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = ()=> useContext(Context)
import { createContext, useContext, ReactNode, useState } from "react"
import ShoppingCart from "../components/ShoppingCart"

// types
type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number,
    quantity: number
}

type ShoppingContext = {
    openCart : () => void
    closeCart : () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
}

// creating context
const ShoppingCartContext = createContext({} as ShoppingContext)
// by using as... we say that our context contains above types inside ShoppingCartContext type.

// creating custom hook
export const useShoppingCart = () => useContext(ShoppingCartContext)


export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {

    const [isOpen,setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    const cartQuantity = cartItems.reduce((quantity,item)=> item.quantity + quantity,0)

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    const getItemQuantity = (id: number) => {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    const increaseCartQuantity = (id: number) => {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const decreaseCartQuantity = (id: number) => {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const removeFromCart = (id: number) => {
        setCartItems(currItems => {
          return currItems.filter(item => item.id !== id)
        })
      }

return <ShoppingCartContext.Provider
    value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart
    }}
>
    {children}
    <ShoppingCart isOpen={isOpen}/>
</ShoppingCartContext.Provider>
}
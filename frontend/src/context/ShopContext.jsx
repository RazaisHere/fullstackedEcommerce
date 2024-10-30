import React, { createContext, useContext, useEffect, useState } from "react";
// import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(true);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState(() => localStorage.getItem("token") || "");
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate();

    const[products,setProducts]=useState([]);
    
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        }
        if (userId) {
            localStorage.setItem('userId', userId);
        }
    }, [token, userId]);
    // Function to add item to cart
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Select Product Size");
            return;
        }
    
        console.log("Attempting to add to cart for itemId:", itemId);
        console.log("Available products:", products);
    
        const item = products.find(product => product._id === itemId);
    
        if (!item) {
            toast.error("Item not found");
            return;
        }
    
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
        } else {
            cartData[itemId] = { [size]: 1 };
        }
    
        console.log("Updated Cart Data Before Set:", cartData);
        setCartItems(cartData);
    
        const currentCount = getCartCount();
        console.log("Cart Count After Adding Item:", currentCount);
    
        if (token) {
            try {
                const response = await axios.post(`${backendUrl}/api/cart/addToCart`, { itemId, size }, { headers: { Authorization: `Bearer ${token}` } });
                if (response.data.success) {
                    toast.success("Item added");
                    // localStorage.setItem("userId", response.data.user._id);
                }
            } catch (error) {
                console.log(error);
                // toast.error(error.message);
            }
        }
    };
    

    const getCartCount = () => {
        let count = 0;
    
        // Loop through each item in the cart
        for (const sizes of Object.values(cartItems)) {
            // Loop through each size of the item
            for (const quantity of Object.values(sizes)) {
                // Ensure quantity is a valid number before adding
                if (typeof quantity === "number" && !isNaN(quantity)) {
                    count += quantity; // Add the quantity to the total count
                }
            }
        }
    
        console.log("Current Cart Count:", count); // Log the current count
        return count; // Return the total count
    };
    

    const updateQuantity = async (itemId, size, quantity) => {

        const cartData = { ...cartItems };
        cartData[itemId] = { ...cartData[itemId], [size]: quantity };
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/updatecart`, { itemId, size, quantity }, { headers: { Authorization: `Bearer ${token}` } })
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    };
    //
    const getUserCart = async (token) => {
        try {
            const response = await axios.post(`${backendUrl}/api/cart/getcart`, {}, { headers: { Authorization: `Bearer ${token}` } });

            if (response.data.success) {

                setCartItems(response.data.cartData)
            }
        }
        catch (error) {

            console.log(error);
            toast.error(error.message)
        }
    }


    const getCartAmount = () => {
        let totalAmount = 0; // Initialize total amount to zero
    
        // Loop through each item in the cart
        for (const [itemId, sizes] of Object.entries(cartItems)) {
            // Find the product in the products array using the item ID
            const item = products.find(product => product._id === itemId);
    
            // If the item is not found, skip to the next item
            if (!item) continue;
    
            // Loop through each size and quantity of the item
            for (const [size, quantity] of Object.entries(sizes)) {
                // Calculate the total amount by multiplying price by quantity
                totalAmount = item.price * quantity;
            }
        }
    
        return totalAmount; // Return the total amount
    };
    

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setToken("");
        setUserId("");
        setCartItems({});
        navigate("/login");
    }; 

    useEffect(() => {
        if (localStorage.getItem("token")) {
            
            const storedUserId = localStorage.getItem("userId");

            setUserId(storedUserId);
            console.log("Set User ID from localStorage:", storedUserId); // Log the userId being set
            getUserCart(localStorage.getItem("token"));
        }
    }, []);
    

    useEffect(() => {
        const fetchUserCart = async () => {
            if (token) {
                await getUserCart(token);
            }
        };

        fetchUserCart();
    }, [token]);
// getting products from Database to display 
    const getProducts = async () => {
     
        
        try {
            const response = await axios.get(`${backendUrl}/admin/products/list`);
          
            setProducts(response.data.products); // Set the fetched products data to state
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to fetch products");
        }
    };
    
    useEffect(()=>{
        getProducts();
    },[])

    return (
        <ShopContext.Provider value={{
            products,
            currency: "$",
            delivery: 50,
            search,
            setSearch,
            showSearch,
            setShowSearch,
            cartItems,
            setCartItems,
            addToCart,
            getCartCount,
            updateQuantity,
            getCartAmount,
            navigate,
            setToken,
            token,
            logout,
            userId,
            backendUrl
        }}>
            {children}
        </ShopContext.Provider>
    );
};
export const useShop = () => {
    return useContext(ShopContext);
};

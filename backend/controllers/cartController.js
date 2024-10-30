const userModel= require("../models/userModel")


const addToCart = async (req, res) => {
    try {
        const { itemId, size } = req.body;
        const userId = req.userId; // Use userId from middleware

        console.log("Adding to cart for userId:", userId, "Item ID:", itemId, "Size:", size);

        // Validate inputs
        if (!userId) {
            return res.status(401).json({ success: false, message: "User not authenticated." });
        }

        if (!itemId || !size) {
            return res.status(400).json({ success: false, message: "Item ID and size are required." });
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Initialize cart data if it doesn't exist
        let cartData = userData.cartData || {};

        // Check if the item already exists in the cart
        if (cartData[itemId]) {
            // Check if the size exists in the cart
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1; // Increase quantity for existing size
            } else {
                cartData[itemId][size] = 1; // Add size with quantity 1 if it doesn't exist
            }
        } else {
            cartData[itemId] = { [size]: 1 }; // Add new item with size and quantity
        }

        // Update the cart in the database
        await userModel.findByIdAndUpdate(userId, { cartData });
        
        console.log("Updated Cart Data:", cartData); // Log the updated cart data for debugging
        res.json({ success: true, message: "Item added to cart successfully", cartData }); // Send updated cart data as response
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


const updateCart = async (req, res) => {
    try {
      const { itemId, size, quantity } = req.body;
      const userId = req.userId; // Assuming your middleware sets req.userId
  
      if (!itemId || !size || quantity === undefined) {
        return res.status(400).json({ success: false, message: "Item ID, size, and quantity are required." });
      }
  
      const userData = await userModel.findById(userId);
      if (!userData || !userData.cartData) {
        return res.status(404).json({ success: false, message: "User or cart data not found." });
      }
  
      let cartData = userData.cartData;
      
  
      // Check if item exists
      if (cartData[itemId]) {
        cartData[itemId][size] = quantity; // Update quantity if item exists
      } else {
        cartData[itemId] = { [size]: quantity }; // Add new item and size if not present
      }
  
      await userModel.findByIdAndUpdate(userId, { cartData });
      res.json({ success: true, message: "Cart updated successfully" });
    } catch (error) {
      console.error("Error updating cart:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

const getUserCart = async (req, res) => {
    try {
        const userId = req.userId; // Check if this is being set correctly
        console.log("Getting cart for userId:", userId); // Log the user ID
        const userData = await userModel.findById(userId);

        if (!userData || !userData.cartData) {
            console.log("User or cart data not found for userId:", userId);
            return res.status(404).json({ success: false, message: "User or cart data not found." });
        }

        res.json({ success: true, cartData: userData.cartData });
    } catch (error) {
        console.error("Error fetching user cart:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { addToCart, updateCart, getUserCart };


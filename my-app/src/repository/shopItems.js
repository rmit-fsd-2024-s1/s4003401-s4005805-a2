import axios from "axios";


//Retrieve all products from database 
const getShopItems = async () => {
  try {
      const result = await axios.get("http://localhost:4000/api/product");
      return result.data;
  } catch (error) {
      console.log("Error fetching data:", error);
  }
}

//Function to assign a cartID to a user
const initCart = async (User) => {
  if (User == null){
    console.log("user is null")

    return [];
  }
  else{
    console.log("user is :", User)

  }
  let id = User.id;
  console.log("initCart: user id of:",id)
  try {
    const response = await axios.get("http://localhost:4000/api/shoppingCart", {
      params: {
        userID: id,
      },
    });
    const cart = response.data;
    if (cart.length > 0) {
      console.log("initCart: user has a cart was sucessful cartId",cart[0].cartID);
      return returnCart(cart[0].cartID);
      
    } else {
      console.log("initCart:  assign user cart, createCartForUser called");
      const newCart = await createCartForUser(User.id);
      if (newCart) {
        return [];
      }
    }
  } catch (error) {
    console.error('Error initializing cart:', error);
    return [];
  }
};

//Function to create the cart for the user
const createCartForUser = async (userId) => {
  try {
    await axios.post("http://localhost:4000/api/shoppingCart", {
      userID: userId
    });
    console.log("cart created for user", userId)
    return true;
  } catch (error) {
    console.error('Error creating cart for user:', error);
    return null;
  }
};

//Function to get the cart items for the specific user
const returnCart = async (shoppingCartId) => {
  console.log("shoppingCartId is: ",shoppingCartId)

  try {  
    const response = await axios.get(`http://localhost:4000/api/cartItem/${shoppingCartId}`);

    if(response.data){
      return response.data;
    }
    else{
      return [];
    }
  } catch (error) {
    console.error('Error retrieving cart items:', error);
    return [];
  }
};

//Function to get the user's cartID
const getUserCartID = async (User) => {
  console.log(User.id);
  let id = User.id;
  try {  
    const response = await axios.get("http://localhost:4000/api/shoppingCart", {
      params: {
        userID: id,
      },
    });

    if (response.data) {
      console.log("Retrieving the user's cartID is a go", response.data[0].cartID);
      return response.data[0].cartID;
    } else {
      console.log("There seems to be an error retrieving the user's cartID");
      return null;
    }
  } catch (error) {
    console.error('Error retrieving the user\'s cartID:', error);
    return null;
  }
};


  //Function to retrieve special shop items
  export const getSpecialItems = async () => {
    try {
      const result = await axios.get("http://localhost:4000/api/product/specials");
      return result.data;
  } catch (error) {
      console.log("Error fetching data:", error);
  }
}
  
  
  export {
    getShopItems,
    initCart,
    returnCart,
    getUserCartID
  };

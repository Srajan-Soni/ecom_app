import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();
const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const exists = state.find(p => p.id === action.payload.id);
      return exists
        ? state.map(p =>
            p.id === action.payload.id ? { ...p, quantity: p.quantity + 1 } : p
          )
        : [...state, { ...action.payload, quantity: 1 }];
    case 'UPDATE_QUANTITY':
      return state.flatMap(p =>
        p.id === action.payload.id
          ? action.payload.quantity > 0
            ? [{ ...p, quantity: action.payload.quantity }]
            : []
          : [p]
      );
    case 'SET_CART':
      return action.payload;
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    AsyncStorage.getItem('cart').then(data => {
      if (data) dispatch({ type: 'SET_CART', payload: JSON.parse(data) });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

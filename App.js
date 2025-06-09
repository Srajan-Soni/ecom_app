import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from './src/screens/HomeScreen';
// import ProductDetail from './src/screens/ProductDetail';
// import CartScreen from './src/screens/CartScreen';
import { CartProvider } from './src/context/CartContext';
import HomeScreen from './src/Screens/HomeScreen';
import CartScreen from './src/Screens/CartScreen';
import ProductDetail from './src/Screens/ProductDetail';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>

        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={ProductDetail} />
          <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

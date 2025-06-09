import React, { useContext } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import CartContext from '../context/CartContext';

export default function ProductDetail({ route }) {
  const { product } = route.params;
  const { dispatch } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.rating}>Rating: {product.rating.rate} ⭐ ({product.rating.count})</Text>
      <Button title="Add to Cart" onPress={() => dispatch({ type: 'ADD_TO_CART', payload: product })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15, flex: 1 },
  image: { width: '100%', height: 250, resizeMode: 'contain', marginBottom: 10 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  price: { fontSize: 16, marginBottom: 5 },
  description: { marginBottom: 10 },
  rating: { marginBottom: 10 },
});

import React, { useEffect, useState, useContext } from 'react';
import {
  View, FlatList, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Button
} from 'react-native';
import CartContext from '../context/CartContext';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cart } = useContext(CartContext);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Details', { product: item })}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text numberOfLines={1}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
      <Button title={`Go to Cart (${cart.length})`} onPress={() => navigation.navigate('Cart')} />
    </View>
  );
}

const styles = StyleSheet.create({
  list: { padding: 10 },
  card: {
    flex: 1, margin: 5, padding: 10,
    backgroundColor: '#eee', alignItems: 'center', borderRadius: 8
  },
  image: { width: 80, height: 80, resizeMode: 'contain', marginBottom: 5 },
  price: { fontWeight: 'bold' },
});

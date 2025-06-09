import React, { useContext } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import CartContext from '../context/CartContext';

export default function CartScreen() {
  const { cart, dispatch } = useContext(CartContext);

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

   const updateQuantity = (id, change) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    const newQty = item.quantity + change;
    if (newQty < 1) return; 
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: newQty } });
  };

  return (
    <View style={{ flex: 1, padding: 15 }}>
      <FlatList
        data={cart}
        keyExtractor={i => i.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={{ flex: 1 }}
                numberOfLines={1}
                ellipsizeMode="tail"
            >{item.title}</Text>
            <Text>${item.price}</Text>
            <View style={styles.quantityContainer}>
              <Text style={styles.qtyText}>Qty: {item.quantity}</Text>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => updateQuantity(item.id, -1)}
              >
                <Text>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => updateQuantity(item.id, 1)}
              >
                <Text>+</Text>
              </TouchableOpacity>
              </View>
               <TouchableOpacity
                style={styles.removeButton}
                onPress={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
               >
                <Text style={{ color: 'white' }}>❌</Text>
                </TouchableOpacity>
          </View>
         
        )}
      />
      <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    marginBottom: 10,
    flexWrap: 'wrap',
    gap: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  qtyButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#ddd',
    borderRadius: 3,
    marginLeft: 5,
    justifyContent: 'center',
  },
  qtyText: {
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  removeButton: {
    marginLeft: 10,
    backgroundColor: '#f44336',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 25,
    textAlign: 'center',
  },
});

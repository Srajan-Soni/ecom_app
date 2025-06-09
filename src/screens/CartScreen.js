import React, { useContext } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import CartContext from '../context/CartContext';

export default function CartScreen() {
  const { cart, dispatch } = useContext(CartContext);

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return (
    <View style={{ flex: 1, padding: 15 }}>
      <FlatList
        data={cart}
        keyExtractor={i => i.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={{ flex: 1 }}>{item.title}</Text>
            <Text>${item.price}</Text>
            <TextInput
              style={styles.input}
              value={item.quantity.toString()}
              keyboardType="numeric"
              onChangeText={txt => {
                const q = parseInt(txt) || 0;
                dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: q } });
              }}
            />
          </View>
        )}
      />
      <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  input: { borderWidth: 1, width: 50, marginLeft: 10, padding: 5 },
  total: { fontSize: 18, fontWeight: 'bold', marginTop: 15 },
});

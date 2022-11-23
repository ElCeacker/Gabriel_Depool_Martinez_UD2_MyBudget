import { StyleSheet, View, Text, FlatList } from 'react-native';
import TransactionInput from './components/TransactionInput';
import ListItem from './components/ListItem'; 
import Balance from './components/Balance';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


export default function App() {

  const [ transactionValues, setTransactionValues ] = useState([]);
  const [ transactionList, setTransactionList ] = useState([]);

  const [ miSaldo, setMisaldo ] = useState(0);

// Función para añadir una nueva transacción con su propio objeto
const addTransactionHandler = (transactionQuantity, description) => { 
    let newDate = new Date();
    let date = `${newDate.getFullYear()}/${newDate.getMonth() + 1}/${newDate.getDate()}`;
    let transaction = {
      id : uuidv4().slice(0,8),
      amount : parseFloat(transactionQuantity).toFixed(2),
      description: description,
      date: date
    };
    setTransactionValues(() => [
      ...transactionValues,
      transactionQuantity,
    ]);
    setTransactionList(() => [
      ...transactionList, 
      transaction
    ])
  };


  // Función para borrar
  const remove = (id) => {
    setTransactionList(() => transactionList.filter((transaction) => transaction.id != id)); 
    setMisaldo(0)
  }

  // Función para editar
  const edit = (obj, newAmount, newDescription, newDate) => {
      obj.amount = parseFloat(newAmount).toFixed(2);
      obj.description = newDescription;
      obj.date = newDate;
  }

  return (
    <View>
      <View style={styles.TransactionInput}>
        <Text style={styles.titulo}>Añade una nueva Transaccion</Text>
        <TransactionInput onTransactionAdd={addTransactionHandler}/>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.transactions}>Movimientos</Text>
        <FlatList style={styles.transactionList} data={transactionList} renderItem={(transaction) => {
          return <ListItem  
            transaction={transaction.item} 
            removeTransaction={remove}
            edit={edit}
            transactionList={transactionList}
            miSaldo={setMisaldo}/>
        }}/>
      </View>
      <View style={styles.balance}>
        <Balance transactionList={transactionList} miSaldo={miSaldo}/>
      </View>
  </View>
  );
}

const styles = StyleSheet.create({
  TransactionInput: {
    marginTop: 25,
    backgroundColor: '#303f9f',
    paddingBottom: 20,
    margin: 10,
    marginBottom: 0,
    borderRadius: 10
  },

  titulo: {
    fontSize: 25,
    textAlign: 'center',
    color: 'white'
  },

  listItem: {
    height: '53%',
    margin: 10,
    backgroundColor: '#64b5f6',
    borderRadius: 10
  },

  transactionList: {
    marginTop: 10,
    alignSelf: 'flex-end'
  },

  transactions: {
    textAlign: 'center',
    fontSize: 25
  },

  balance : {
    flexDirection: 'row',
    justifyContent: 'center',
  }
});

import { View, StyleSheet, TextInput, Button, Alert } from "react-native"
import { useState } from "react";

const ProductInput = ({ onTransactionAdd }) => {

    const [transactionValue, setTransactionValue] = useState('');
    const [description, setDescription] = useState('')

    const changeValueHandler = (value) => {
        setTransactionValue(value);
    }
    const changeDescriptionHandler = (value) => {
        setDescription(value)
    }

    const addProductHandler = () => {
        if (transactionValue === '0') {
            Alert.alert('El importe tiene que ser diferente a 0')
        } else if (transactionValue !== '' && description !== '') {
            onTransactionAdd(transactionValue, description)
            setTransactionValue('');
            setDescription('');
        } else {
            Alert.alert("Tiene que rellenar todos los campos");
        }
    };

    return (
        <View>
            <View style={styles.subContainer1}>
                <TextInput style={styles.quantity} placeholder="Importe" keyboardType="numeric" onChangeText={changeValueHandler} value={transactionValue}/>
                <Button title="add" onPress={addProductHandler}/>
            </View>
            
            <View style={styles.subContainer2}>
                <TextInput placeholder="Descripción" multiline={true} numberOfLines={4} onChangeText={changeDescriptionHandler} value={description}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    subContainer1 : {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        marginTop: 10,
    },
    
    quantity: {
        backgroundColor: 'white',
        borderWidth: 1,
        width: 90,
        textAlign: 'center',
        borderRadius: 5
    },

    subContainer2 : {
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 1,
        backgroundColor: 'white',
        margin: 15,
        width: '90%',
        alignSelf: 'center',
        padding: 10,
        borderRadius: 10
    },
});

export default ProductInput
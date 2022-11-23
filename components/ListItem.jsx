import { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image, Modal, Button, TextInput, Alert } from "react-native";
import DatePicker from 'react-native-modern-datepicker';

const ListItem = ({ transaction, removeTransaction, edit, transactionList, miSaldo }) => {
    let saldo = 0;

    transactionList.forEach(element => {
        saldo += parseFloat(element.amount);
        miSaldo(saldo)
    });

    const [ modalVisible, setModalVisible ] = useState(false);
    const [ modalEdit, setModalEdit ] = useState(false);

    const [ newTransactionValue, setNewTransactionValue ] = useState(transaction.amount); 
    const [ newDescription, setNewDescription ] = useState(transaction.description);
    const [ calendar, setCalendar ] = useState(transaction.date);

    const [ minimumDate, setMinimumDate ] = useState(`${new Date().getFullYear() - 10}/01/01`);
    const [ maximumDate, setMaximumDate ] = useState(`${new Date().getFullYear() + 10}/12/31`);

    const changeNewValueHandler = (value) => {
        setNewTransactionValue(value)
    }

    const changeNewDescriptionHandler = (value) => {
        setNewDescription(value)
    }

    let shortDescripion;
    if (transaction.description.length < 10 && transaction.description.length > 0) {
        shortDescripion = transaction.description
    } else if (transaction.description.length < 0) {
        shortDescripion = transaction.description
    } else if (transaction.description.length > 10) {
        shortDescripion = transaction.description.substring(0, 8) + "..."
    }

    let amount;

    if (transaction.amount > 0) {
        amount = '+' + transaction.amount
    } else if (transaction.amount < 0) {
        amount = transaction.amount
    }

    let amountString = '' + amount

    const editar = () => {
        if (newTransactionValue === '0') {
            Alert.alert('El importe tiene que ser diferente a 0')
        } else {
            edit(transaction, parseFloat(newTransactionValue).toFixed(2), newDescription, calendar)
            setModalEdit(!modalEdit)
        }
    };
    
    return (
        <View style={{flexDirection:'row'}}>
            <View style={{flexDirection: 'row'}}>
                <View style={amount > 0 ? styles.positive : styles.negative}>
                    <Text style={amount > 0 ? styles.transactionAmountPositive : styles.transactionAmountNegative}>{amountString.length > 7 ? amountString.substring(0, 5) + '...' : amount}€</Text>
                    <Text style={styles.transactionDescription}>{shortDescripion}</Text>
                    <View style={styles.containerImages}>

                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalEdit}
                                onRequestClose={() => {
                                    setModalEdit(!setModalEdit);
                            }}>

                                <View style={styles.containerModal}>
                                    <Text style={styles.styleEditTextTransaction}>Transacción a editar</Text>
                                    <View style={styles.modalTotalEditar}>
                                        <View style={styles.boxBotonCerrar}>
                                            <Pressable  onPress={() => setModalEdit(!modalEdit)}>
                                                <Image style={styles.imgClose} source={require("../assets/cerrar.png")}/>
                                            </Pressable>
                                        </View>
                                        <Text style={styles.textoEditar}>Editar importe</Text>
                                        <View style={styles.editarInputAmount}>
                                            <TextInput placeholder="Importe" keyboardType="numeric" onChangeText={changeNewValueHandler} value={newTransactionValue}/>
                                        </View>
                                        <Text style={styles.textoEditar}>Editar descripcion</Text>
                                        <View style={styles.editarInputDescription}>
                                            <TextInput placeholder="Descripción"  onChangeText={changeNewDescriptionHandler} value={newDescription}/>
                                        </View>
                                        <Text style={styles.textoEditar}>Editar fecha</Text>
                                        <View style={styles.editarInputDate}>
                                        <DatePicker
                                            mode="calendar"
                                            onDateChange={selectedTime => setCalendar(selectedTime)}
                                            selected={calendar}
                                            minimumDate={minimumDate}
                                            maximumDate={maximumDate}
                                            />
                                        </View>
                                        <View>
                                            <Button title="Update" onPress={editar}/>
                                        </View>
                                    </View>
                                </View>
                            </Modal>

                        <Pressable onPress={() => setModalEdit(true)}>
                            <Image style={styles.imagenes} source={require("../assets/edit.png")}/>
                        </Pressable>

                        <Pressable onPress={() => removeTransaction(transaction.id)}>
                            <Image style={styles.imagenes} source={require("../assets/borrar.png")}/>
                        </Pressable>

                    </View>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.datasBox}>
                        <View style={styles.boxBotonClose}>
                            <Text style={styles.textInfo}>Información de transacción</Text>
                            <Pressable  onPress={() => setModalVisible(!modalVisible)}>
                                <Image style={styles.imgClose} source={require("../assets/close.png")}/>
                            </Pressable>
                        </View>
                        <Text style={styles.datasText}>- Importe: {transaction.amount}€</Text>
                        <Text style={styles.datasText}>- Descripción: {transaction.description}</Text>
                        <Text style={styles.datasText}>- Fecha de transacción: {transaction.date}</Text>
                    </View>
                </View>
            </Modal>
            <Pressable onPress={() => setModalVisible(true)}>
                <View style={styles.styleImage}>
                    <Image style={styles.imagenInfo} source={require("../assets/boton-de-informacion.png")}/>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({

    negative: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 5,
        width: '90%',
        height: 50,
        paddingHorizontal: 5,
        backgroundColor: 'white',
        elevation: 10,
        marginBottom: 10
    },

    positive: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 5,
        width: '90%',
        height: 50,
        paddingHorizontal: 5,
        backgroundColor: 'white',
        elevation: 10,
        marginBottom: 10,
    },

    imagenes: {
        width: 40,
        height: 40,
    },

    containerImages: {
        flexDirection: 'row',
    },

    transactionAmountPositive: {
        fontSize: 20,
        color: '#80e27e',
    },

    transactionAmountNegative: {
        fontSize: 20,
        color: '#ff6f60',
    },

    transactionDescription: {
        fontSize: 20
    },

    styleImage: {
        marginLeft: -20,
        height: 50,
        justifyContent: 'center',
    },

    datasBox: {
        borderWidth: 2,
        justifyContent: 'center',
        width: 250,
        padding: 10,
        alignContent: 'center',
        backgroundColor: 'black',
        borderRadius: 5
    },

    datasText: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'yellow',
        marginTop: 10,
        padding: 10,
        color:'yellow',
    },

    boxBotonCerrar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: -20,
    },

    boxBotonClose: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: -20,
    },

    imgClose: {
        width: 30,
        height: 30,
        marginTop: 25
    }, 

    imagenInfo: {
        width: 30,
        height: 30,
    },

    modalTotalEditar: {
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 4,
        width: '80%',
        backgroundColor: 'white'
    },

    editarInputAmount: {
        alignSelf: 'center',
        width: '90%',
        borderWidth: 1,
        marginBottom: 10
    },

    editarInputDescription: {
        alignSelf: 'center',
        width: '90%',
        borderWidth: 1,
        marginBottom: 10
    },

    editarInputDate: {
        alignSelf: 'center',
        width: '90%',
        borderWidth: 1,
        marginBottom: 10
    },

    styleEditTextTransaction: {
        color: 'white',
        backgroundColor: 'green',
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 25
    },

    containerModal: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: '100%'
    },

    textoEditar: {
        width: '90%',
        alignSelf: 'center',
        fontSize: 15
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: '100%',
    },

    textInfo: {
        fontSize: 20,
        borderWidth: 1,
        alignSelf: 'center',
        marginTop: 20,
        marginLeft: 20,
        color: 'yellow',
        backgroundColor: 'black',
        fontWeight: "bold"
    }
});

export default ListItem
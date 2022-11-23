import { View, Text, StyleSheet } from "react-native"

const Balance = ({ miSaldo }) => {
    
    return (
        <View style={miSaldo > 0 ? styles.positive : miSaldo === 0 ? styles.miSaldo : miSaldo < 0 ? styles.negative : null } >
            <View style={styles.cajaMiSaldo}>
                <Text style={styles.textoSaldo}>Mi saldo</Text>
            </View>
            <View style={styles.cajaMiSaldo}>
                <Text style={styles.aparienciaSaldo}>{miSaldo}€</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    miSaldo: {
        borderWidth: 1,
        justifyContent: 'center',
        backgroundColor: '#cfcfcf',
        padding: 10,
        elevation: 10,
    },

    textoSaldo: {
        fontSize: 25,
        alignItems: 'center'
    },

    aparienciaSaldo: {
        fontSize: 25,
    },

    negative: {
        borderWidth: 1,
        justifyContent: 'center',
        backgroundColor: '#ff6f60',
        padding: 10,
        elevation: 10
    },

    positive: {
        borderWidth: 1,
        justifyContent: 'center',
        backgroundColor: '#80e27e',
        padding: 10,
        elevation: 10
        
    },
    cajaMiSaldo: {
        alignSelf: 'center'
    }
    
});

export default Balance
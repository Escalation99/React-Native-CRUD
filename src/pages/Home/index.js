//gunakan shortcut rncs
import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import FIREBASE from '../../config/Firebase'
import { CardKontak } from '../../components'

export default class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            kontaks: {},
            kontaksKey: [],
        };
    }

    componentDidMount() {
        this.ambilData();
    };

    ambilData = () => {
        FIREBASE.database()
            .ref('Kontak')
            .once('value', (querySnapShot) => {
                let data = querySnapShot.val() ? querySnapShot.val() : {};
                let kontakItem = { ...data };

                this.setState({
                    kontaks: kontakItem,
                    kontaksKey: Object.keys(kontakItem)
                });
            });
    }

    removeData = (id) => {
        Alert.alert(
            "Info",
            "Anda yakin akan menghapus Data Kontak?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        FIREBASE.database()
                            .ref('Kontak/' + id)
                            .remove()
                        this.ambilData();

                        Alert.alert('Hapus', 'Sukses Hapus Data')
                    }
                }
            ]
        );
    }

    render() {
        const { kontaks, kontaksKey } = this.state;
        return (
            <View style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>Daftar Kontak</Text>
                    <View style={styles.garis} />
                </View>

                <View style={styles.listKontak}>
                    {kontaksKey.length > 0 ? (
                        kontaksKey.map((key) => (
                            <CardKontak key={key} kontakItem={kontaks[key]} id={key} {...this.props} removeData={this.removeData} />
                        ))
                    ) : (
                        <Text>Daftar Kosong</Text>
                    )}
                </View>



                <TouchableOpacity
                    style={styles.wrapperButton}
                    onPress={() => this.props.navigation.navigate('TambahKontak')}>
                    <FontAwesomeIcon icon={faPlus} size={20} color={'white'} />
                </TouchableOpacity>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 30,
        paddingTop: 30,
    }, title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    garis: {
        borderWidth: 1,
        marginTop: 10,
    },
    listKontak: {
        paddingHorizontal: 30,
        marginTop: 20
    },
    page: {
        flex: 1,
    },
    wrapperButton: {
        backgroundColor: 'red',
        height: 70,
        width: 70,
        borderRadius: 50,
        position: 'absolute',
        right: 25,
        bottom: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

})

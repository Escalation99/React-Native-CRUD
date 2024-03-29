import React, { Component } from 'react'
import { StyleSheet, Text, TextInputBase, View, TouchableOpacity, Alert } from 'react-native'
import { InputData } from '../../components';
import FIREBASE from '../../config/Firebase'

export default class EditKontak extends Component {

    constructor(props) {
        super(props)

        this.state = {
            nama: '',
            nomorHP: '',
            alamat: '',
        }
    }

    componentDidMount() {
        FIREBASE.database()
            .ref('Kontak/' + this.props.route.params.id)
            .once('value', (querySnapShot) => {
                let data = querySnapShot.val() ? querySnapShot.val() : {};
                let kontakItem = { ...data };

                this.setState({
                    nama: kontakItem.nama,
                    nomorHP: kontakItem.nomorHP,
                    alamat: kontakItem.alamat,

                });
            });
    };

    onChangeText = (namaState, value) => {
        this.setState({
            [namaState]: value
        })
    }

    onSubmit = () => {

        if (this.state.nama && this.state.nomorHP && this.state.alamat) {
            const kontakReferensi = FIREBASE.database().ref('Kontak/' + this.props.route.params.id);
            const kontak = {
                nama: this.state.nama,
                nomorHP: this.state.nomorHP,
                alamat: this.state.alamat,
            }
            kontakReferensi
                .update(kontak)
                .then((data) => {
                    Alert.alert('Success', 'Kontak Terupdate')
                    this.props.navigation.replace('Home')
                })
                .catch((error) => {
                    console.log("Error: ", error)
                })
        } else {
            Alert.alert('Error', 'Nama, Nomor HP, dan Alamat wajib diisi !')
        }

    }

    render() {
        return (
            <View style={styles.pages}>
                <InputData
                    label="Nama: "
                    placeholder="Masukkan Nama"
                    onChangeText={this.onChangeText}
                    value={this.state.nama}
                    namaState="nama"
                />
                <InputData
                    label="No. HP: "
                    placeholder="Masukkan Nomor Handphone"
                    keyboardType="number-pad"
                    onChangeText={this.onChangeText}
                    value={this.state.nomorHP}
                    namaState="nomorHP"
                />
                <InputData
                    label="Alamat: "
                    placeholder="Masukkan Alamat"
                    isTextArea={true}
                    onChangeText={this.onChangeText}
                    value={this.state.alamat}
                    namaState="alamat"
                />
                <TouchableOpacity style={styles.tombol} onPress={() => this.onSubmit()}>
                    <Text style={styles.teksTombol}>SUBMIT</Text>
                </TouchableOpacity>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    pages: {
        flex: 1,
        padding: 30,
        borderRadius: 25
    },
    tombol: {
        backgroundColor: '#FA3F70',
        padding: 10,
        borderRadius: 25,
        marginTop: 10
    },
    teksTombol: {
        color: 'white',
        textAlign: 'center',
    }

})

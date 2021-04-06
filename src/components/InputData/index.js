import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { onChangeText } from 'react-native-reanimated'

export default function InputData({ label, placeholder, keyboardType, isTextArea, onChangeText, namaState, value }) {

    if (isTextArea) {
        return (
            <View>
                <Text style={styles.label}>{label} </Text>
                <TextInput
                    multiline={true}
                    numberOfLines={4}
                    placeholder={placeholder}
                    style={styles.textInputArea}
                    placeholderTextColor='gray'
                    keyboardType={keyboardType}
                    value={value}
                    onChangeText={(text) => onChangeText(namaState, text)}
                />
            </View>
        )
    }

    return (
        <View>
            <Text style={styles.label}>{label} </Text>
            <TextInput
                placeholder={placeholder}
                style={styles.textInput}
                placeholderTextColor='gray'
                keyboardType={keyboardType}
                value={value}
                onChangeText={(text) => onChangeText(namaState, text)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        marginBottom: 5
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 10,
        color: 'black',
        marginBottom: 10
    },
    textInputArea: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 10,
        color: 'black',
        marginBottom: 10,
        textAlignVertical: 'top'
    }
})

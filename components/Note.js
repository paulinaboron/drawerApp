//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

// create a component
class Note extends Component {

    constructor(props) {
        super(props)
        console.log(props);
    }

    async getItem() {
        await SecureStore.getItemAsync("key");
    }

    createTwoButtonAlert = (title) =>
        Alert.alert(
            "Usunąć notatkę?",
            "",
            [
                {
                    text: "Nie",
                    onPress: () => console.log("Nie Pressed"),
                    style: "cancel"
                },
                { text: "Tak", onPress: () => this.okPressed(title) }
            ]
        );

    onPressNote = (t) => {
        console.log("press", t);
        this.createTwoButtonAlert(t)
    };

    async okPressed(title) {
        console.log(title)
        await SecureStore.deleteItemAsync(title);
        // console.log(r);
    }

    render() {
        return (
            <View style={[styles.container, { backgroundColor: this.props.color }]}>

                <TouchableOpacity
                    onPress={() => this.onPressNote(this.props.title)}
                >
                    <Text style={styles.text}>{this.props.title}</Text>
                    <Text>{this.props.content}</Text>
                    <Text>{this.props.date}</Text>
                </TouchableOpacity>


            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        padding: 20,
        margin: 20,
        width: '40%'

    },

    text: {
        fontWeight: 'bold',
        fontSize: 20,
    }
});

//make this component available to the app
export default Note;

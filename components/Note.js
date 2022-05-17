//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

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
                { text: "Tak", onPress: () => console.log("OK Pressed") }
            ]
        );

        onPressNote = (t) => {
            console.log("press", t);
            this.createTwoButtonAlert(t)
          };

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

    },

    text: {
        fontWeight: 'bold',
        fontSize: 20,
    }
});

//make this component available to the app
export default Note;

//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

// create a component
class Note extends Component {

    constructor(props) {
        super(props)
        // console.log(props);
    }

    onPressNote = (id) =>
        Alert.alert(
            "Usuwanie",
            "Na pewno chcesz usunąć notatkę?",
            [
                {
                    text: "Nie",
                    onPress: () => console.log("Nie Pressed"),
                    style: "cancel"
                },
                { text: "Tak", onPress: () => this.okPressed(id) }
            ]
        );



    async okPressed(id) {
        console.log(id, 'key id')
        await SecureStore.deleteItemAsync(id);
        this.props.navigation.navigate("Dodaj notatkę")
        this.props.navigation.navigate("Notatki")
    }

    render() {
        return (
            <View style={[styles.container, { backgroundColor: this.props.color }]}>

                <TouchableOpacity
                    onLongPress={() => this.onPressNote(this.props.id)}
                    onPress={() => this.props.navigation.navigate("Edytowanie", {data: this.props})}
                >
                    <View style={styles.row}>
                        <Text style={styles.text}>{this.props.title}</Text>
                        <Text style={styles.cat}>{this.props.category}</Text>
                        
                    </View>

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
        margin: 15,
        width: 140,
        borderRadius: 10,

    },

    text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1
    },

    cat: {
        flex: 1,
        backgroundColor: 'rgb(40, 40, 50)',
        color: 'white',
        textAlign: 'center',
        borderRadius: 5,
        padding: 5
    },

    row:{
        flexDirection: 'row'
    }
});

//make this component available to the app
export default Note;

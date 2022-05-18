import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';


class S2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            keysArray: []
        };
    }

    saveNote() {
        let colors = ['red', "green", 'blue', 'magenta']
        let currDate = new Date().toLocaleDateString()
        let key = this.state.title
        let note = {
            title: this.state.title,
            content: this.state.content,
            date: currDate,
            color: colors[Math.floor(Math.random() * 4)]
        }

        console.log(currDate, key);
        this.setState({ keysArray: [...this.state.keysArray, key] })

        this.saveItem(key, JSON.stringify(note))
        this.saveItem("keys", JSON.stringify(this.state.keysArray))
    }

    async saveItem(key, value) {
        await SecureStore.setItemAsync(key, value);
    }



    render() {
        return (
            <View style={styles.form}>
                <TextInput
                    underlineColorAndroid="#ff0000"
                    placeholder="Tytuł"
                    onChangeText={(text) => this.setState({ title: text })}
                    style={styles.input}
                />


                <TextInput
                    underlineColorAndroid="#ff0000"
                    placeholder="Treść"
                    onChangeText={(text) => this.setState({ content: text })}
                    style={styles.input}
                />

                <Button
                    title="Dodaj"
                    onPress={() => this.saveNote()}
                    state={styles.button}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        paddingTop: 100,
        alignItems: 'center',
        backgroundColor: '#333344'
    },

    input: {
        width: '70%',
        marginTop: 15,
        marginBottom: 15,
        paddingBottom: 10,
        textAlign: 'center',
        color: 'white',
    },

    button: {
        paddingTop: 300,
    }
});

export default S2;

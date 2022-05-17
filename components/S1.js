//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Note from './Note';

// create a component
class S1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keys: [],
            notesKeys: []
        }

        this.getKeys()
    }
    getData() {
        this.getKeys()
        console.log(this.state.keys, "kkk");
    }

    async getKeys() {
        await SecureStore.getItemAsync("keys").then((resp) => {
            console.log(resp, "resp");
            resp = resp.slice(1, -1)
            resp = resp.split(",")
            this.setState({ keys: resp })

            console.log(typeof (resp));
            console.log(typeof (this.state.keys), this.state.keys[0]);

            var notes = resp.map(function (elem) {
                let i = elem.slice(1, -1)

                return (i)
            })
            console.log(notes)
            this.setState({ notesKeys: notes })
        })

    }

    getNotes() {
        this.state.notesKeys.map(function (elem) {
            // this.getItem(elem)
            console.log(elem);
        })
    }

    async getItem(key) {
        await SecureStore.getItemAsync(key).then((resp) => {
            console.log(resp, "note");
        });
    }

    render() {

        return (
            <View style={styles.container}>
                <Text>S1</Text>
                <Button
                    title="KLIK"
                    onPress={() => this.getData()}
                />

                <Button
                    title="NOTES"
                    onPress={() => this.getNotes()}
                />

                <Text>{this.state.keys}</Text>

                <FlatList
                    style={styles.list}
                    numColumns={2}
                    data={
                        [{
                            title: "AA",
                            content: "aaaa",
                            date: '12/12/22',
                            color: 'red',
                            id: 1
                        },
                        {
                            title: "BB",
                            content: 'bbbbb',
                            date: '20/05/22',
                            color: 'blue',
                            id: 2
                        }]
                    }

                    renderItem={({ item }) => <Note
                        title={item.title}
                        content={item.content}
                        date={item.date}
                        color={item.color}
                        keyExtractor={item => item.id.toString()} />}

                />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },

    list:{
        flex: 1,
    }
});

//make this component available to the app
export default S1;

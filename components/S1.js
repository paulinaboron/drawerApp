//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import * as SecureStore from 'expo-secure-store';

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
            this.getItem(elem)
        })
    }

    async getItem(key) {
        await SecureStore.getItemAsync(key).then((resp) =>{
            console.log(resp, "note");
        });
    }

    render() {
        // this.getKeys()




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

                {/* <FlatList
                    data={
                        this.state.keys
                    }

                    renderItem={({ item }) => <Text>{item.key}</Text>}

                /> */}
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
});

//make this component available to the app
export default S1;

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
            notes: []
        }

        this.getKeys()
        this.funkcja = null
    }
    getData() {
        this.getKeys()
        console.log(this.state.keys, "kkk");
    }

    async getKeys() {

        let resp = await SecureStore.getItemAsync("keys")
        resp = JSON.parse(resp)
        console.log(resp, "resp");
        this.setState({ keys: resp })


        this.setState({ notes: [] })
        resp.forEach(async element => {
            let i = await SecureStore.getItemAsync(element)
            i = JSON.parse(i)
            this.setState({ notes: [...this.state.notes, i] })
            console.log(i, "i");
        });

        console.log(this.state.notes, "nnnnnnn");


    }


    async getItem(key) {
        await SecureStore.getItemAsync(key).then((resp) => {
            console.log(resp, "note");
        });
    }

    componentDidMount = () => {
        this.funkcja = this.props.navigation.addListener('focus', () => {
            // ta funkcja wykona się za kazdym razem kiedy ekran zostanie przywrócony 
            this.getKeys()
        });

        // ta funkcja wykona się raz podczas uruchomienia ekranu
        this.getKeys()

    }

    componentWillUnmount() {
        this.funkcja();
    }

    render() {

        return (
            <View style={styles.container}>
                <Button
                    title="reload"
                    onPress={() => this.getData()}
                />


                <FlatList
                    style={styles.list}
                    numColumns={2}
                    data={
                        this.state.notes
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

    list: {
        flex: 1,
    }
});

//make this component available to the app
export default S1;

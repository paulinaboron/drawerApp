//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Note from './Note';

// create a component
class S1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keys: [],
            notes: [],
            searchValue: ""
        }

        this.getKeys()
        this.funkcja = null
    }

    async getKeys() {
        this.setState({ notes: [] })
        console.log(this.state.keys, "kkk");

        let resp = await SecureStore.getItemAsync("keys")
        resp = JSON.parse(resp)
        console.log(resp, "resp");
        this.setState({ keys: resp })


        
        if (resp != null) {
            resp.forEach(async element => {
                let i = await SecureStore.getItemAsync(element)
                if (i != null) {
                    i = JSON.parse(i)
                    this.setState({ notes: [...this.state.notes, i] })
                    console.log("\niiiiiiiiiii\n", i, "\niiiiiiiiiiii\n");
                }

            });
        }


        console.log(this.state.notes, "nnnnnnn");
        console.log("NNNNNN");


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

    search = (text) =>{
        // this.getKeys()
        this.setState({searchValue: text})
        console.log(text, "ttttttt");
        let oldNotes = this.state.notes

        let newNotes = oldNotes.filter(function (e){
            return e.title.includes(text)
        })

        console.log(newNotes, "new notes");
        this.setState({notes: newNotes})
    }

    render() {

        return (
            <View style={styles.container}>

                <TextInput
                    defaultValue={this.state.searchValue}
                    value={this.state.searchValue}
                    onChangeText={(text) => this.search(text)}
                    multiline={true}
                    style={styles.input} />

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
                        id={item.key}
                        category={item.category}
                        keyExtractor={item => item.id.toString()} />}
                />

            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(40, 40, 50)',
    },

    list: {
        flex: 1,
    },
    input: {
        width: '85%',
        height: 40,
        borderRadius: 25,
        backgroundColor: 'rgb(24, 24, 34)',
        marginBottom: 10,
        textAlign: 'center',
        color: 'white'
    }
});

//make this component available to the app
export default S1;

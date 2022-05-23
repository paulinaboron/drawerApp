import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';
import { useRef } from 'react/cjs/react.production.min';


class S2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            keysArray: [],
            selectedCat: "",
            cats: []
        };

        // this.getCategories()
        this.funkcja = null

    }

    async getCategories(){
        let cats = await SecureStore.getItemAsync('categories')
        cats = JSON.parse(cats)
        this.setState({'cats': cats})
    }

    saveNote() {
        let colors = ['red', "green", 'blue', 'magenta']
        let currDate = new Date().toLocaleDateString()
        let key = JSON.stringify(Math.floor(Math.random() * 10000))
        let note = {
            title: this.state.title,
            content: this.state.content,
            date: currDate,
            color: colors[Math.floor(Math.random() * 4)],
            key: key,
            category: this.state.selectedCat
        }

        console.log(note, "note");
        this.setState({ keysArray: [...this.state.keysArray, key] })

        // this.saveItem(key, JSON.stringify(note))
        // this.saveItem("keys", JSON.stringify(this.state.keysArray))
        SecureStore.setItemAsync(key, JSON.stringify(note));
        SecureStore.setItemAsync('keys', JSON.stringify(this.state.keysArray));

        this.props.navigation.navigate('Notatki')

    }

    changeCat = (val) => {
        if(val) this.setState({selectedCat: val})
        console.log(this.state.selectedCat, val);
    }

    renderPickerItems(){
        return this.state.cats.map((e)=>{
            return <Picker.Item label={e} value={e} keyExtractor={e => e.id.toString()} />
        })
    }

    componentDidMount = () => {
        this.funkcja = this.props.navigation.addListener('focus', () => {
            // ta funkcja wykona się za kazdym razem kiedy ekran zostanie przywrócony 
            this.getCategories()
        });

        // ta funkcja wykona się raz podczas uruchomienia ekranu
        this.getCategories()

    }

    componentWillUnmount() {
        this.funkcja();
    }



    render() {
        return (
            <View style={styles.form}>
                <TextInput
                    underlineColorAndroid="#2222aa"
                    placeholder="TYTUŁ"
                    onChangeText={(text) => this.setState({ title: text })}
                    style={styles.input}
                />


                <TextInput
                    underlineColorAndroid="#2222aa"
                    placeholder="TREŚĆ"
                    onChangeText={(text) => this.setState({ content: text })}
                    style={styles.input}
                />
                <Picker
                style={styles.picker}

                    selectedValue={this.state.selectedCat}
                    onValueChange={this.changeCat}>

                    {this.renderPickerItems()}

                </Picker>

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
        paddingTop: 50,
        alignItems: 'center',
        backgroundColor: 'rgb(40, 40, 50)'
    },

    input: {
        width: '70%',
        marginTop: 5,
        marginBottom: 25,
        paddingBottom: 10,
        textAlign: 'center',
        color: 'white',
    },

    button: {
        paddingTop: 320,
    },

    picker: {
        width: '70%',
        height: 50,
        marginBottom: 40,
        backgroundColor: 'rgb(30, 30, 40)'
    }
});

export default S2;

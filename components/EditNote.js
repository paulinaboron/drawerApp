import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';
import { useRef } from 'react/cjs/react.production.min';


class EditNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.route.params.data.title,
            content: this.props.route.params.data.content,
            keysArray: [],
            selectedCat: this.props.route.params.data.category,
            cats: []
        };

        // this.getCategories()
        this.funkcja = null
        console.log(this.props.route.params);

    }

    async getCategories() {
        let cats = await SecureStore.getItemAsync('categories')
        cats = JSON.parse(cats)
        this.setState({ 'cats': cats })
    }

    saveNote() {
        let note = {
            title: this.state.title,
            content: this.state.content,
            date: this.props.route.params.data.date,
            color: this.props.route.params.data.color,
            key: this.props.route.params.data.id,
            category: this.state.selectedCat
        }

        console.log(note, "note");
        let key = this.props.route.params.data.id

        SecureStore.deleteItemAsync(key)
        SecureStore.setItemAsync(key, JSON.stringify(note));

        this.props.navigation.navigate('Notatki')

    }

    changeCat = (val) => {
        if (val) this.setState({ selectedCat: val })
        console.log(this.state.selectedCat, val);
    }

    renderPickerItems() {
        if (this.state.cats != null) {
            return this.state.cats.map((e) => {
                return <Picker.Item label={e} value={e} keyExtractor={e => e.id.toString()} />
            })
        }else{
            return "brak"
        }
    }

    componentDidMount = () => {
        this.funkcja = this.props.navigation.addListener('focus', () => {
            this.getCategories()
        });

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
                    placeholder={this.props.route.params.data.title}
                    onChangeText={(text) => this.setState({ title: text })}
                    style={styles.input}
                />


                <TextInput
                    underlineColorAndroid="#2222aa"
                    placeholder={this.props.route.params.data.content}
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
                    title="Zapisz"
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

export default EditNote;

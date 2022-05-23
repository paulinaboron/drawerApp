//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';

// create a component
class NewCategory extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: ""
        }
    }

    async saveCategory(){
        console.log(this.state.name);
        let oldCat = await SecureStore.getItemAsync('categories')
        if(oldCat == null){
            SecureStore.setItemAsync('categories', JSON.stringify(this.state.name))
        }else{
            oldCat = JSON.parse(oldCat)
        let newCat = [...oldCat, this.state.name]
        SecureStore.setItemAsync('categories', JSON.stringify(newCat))
        }
        
    }

    render() {
        return (
            <View style={styles.form}>
                <TextInput
                    underlineColorAndroid="#2222aa"
                    placeholder="KATEGORIA"
                    onChangeText={(text) => this.setState({ name: text })}
                    style={styles.input}
                />

                <Button
                    title="Dodaj"
                    onPress={() => this.saveCategory()}
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
    }
});

//make this component available to the app
export default NewCategory;

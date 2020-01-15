import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, TouchableOpacity, Linking} from 'react-native';

class currencyConverter extends Component<Props> {
    constructor (props){
        super(props)
        this.state = {
            currencyFrom: "",
            currencyTo: "",
            result: 0
        }
    }

    makeRequest = async() => {
        var url = "1"
    }

    componentDidMount(){
        this.makeRequest
    }

    render(){
        return(
            <View>
                <Text>Salud</Text>
            </View>
        )
    }

}

export default currencyConverter

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1E1E1E',
    }
})
import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Alert, TouchableOpacity, Linking} from 'react-native';
class home extends Component {

    constructor(props){
        super(props)
        this.state = {
            dataSource: [],
            isLoading: true
        }
    }

      componentDidMount(){
        this.makeRequest()
    }

    makeRequest = async () => {
        var url = "https://economia.awesomeapi.com.br/all/USD-BRL,EUR-BRL,BTC-BRL"
        axios.get(url)
        .then(response => {
            var tempDataUSD = [response.data.USD]
            var tempDataEUR = [response.data.EUR]
            var tempDataBTC = [response.data.BTC]
            var fullData = [...tempDataUSD, ...tempDataEUR, ...tempDataBTC]
            this.setState({dataSource: fullData, isLoading:false})
            console.log(this.state.dataSource[1].code)
        })
        .catch(err =>{
            alert(`Não foi possível os dados${err}`)
        })
    }


    FlatListHeader = () => {
        return (
          <View elevation={1} 
            style={{
              height: 100,
              width: "97%",
              margin: 5,
              backgroundColor: "#1E1E1E",
              border: 4.9,
              borderColor: "black",
              alignSelf: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 16,
              },
              shadowOpacity: 20,
              shadowRadius: 7.49
            }}
          >
            <Text style={{  textShadowColor: 'black', color: "#E8E8E8", textShadowOffset: { width: 1, height: 3 },textShadowRadius: 10, fontSize: 40, fontWeight: '800', flex: 1, alignSelf: "center", paddingTop: 30, fontSize: 40}}>Valores(Compra)</Text>
          </View>
        );
      }

      FlatListItemSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              marginTop: 12,
              marginBottom: 12,
              marginStart:5, 
              marginEnd: 5,
              width: "100%",
              backgroundColor: "#000",
            }}
          />
        );
      }
    
    render(){
        if(this.state.isLoading){
            return( 
              <View style={styles.container}>
                <ActivityIndicator size="large" style={styles.loadingActivity}/>
              </View>
            ) 
          }
        return(
        <View style={styles.container}>
        <FlatList
          ListHeaderComponent = { this.FlatListHeader }   
          ItemSeparatorComponent = { this.FlatListItemSeparator }
          data={this.state.dataSource}
          keyExtractor = {(item, index) => index.toString()}
          onEndReachedThreshold={0.25}
          onEndReached={({ distanceFromEnd }) => {
          }}
          renderItem={({ item }) => 
          <View style={styles.horizontalContainer}>
              <TouchableOpacity style={styles.TouchableOpacity} onPress={() => Alert.alert('INFORMAÇÕES DE HOJE',`Máximo: R$${item.high}\nMínimo R$${item.low}\nVariação: R$${item.varBid}(${item.pctChange}%)`)}>
              <Text style={styles.textNameCurrency}>{item.name}({item.code})</Text>
              <Text style={styles.textValueCurrency}>R$ {item.bid}</Text>
              </TouchableOpacity>
          </View>
        }
          
        />
      </View>
            )
        }
    }



export default home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E',
        paddingStart: 10,
        paddingEnd: 10,
        paddingTop: 25
    },
    TouchableOpacity:{
        width:'100%'
    },
    horizontalContainer: {
        backgroundColor: "#1E1E1E",
        flexDirection: 'row',
        height: 50,
        width: '100%',
    },
    textNameCurrency: {
        color: "#E8E8E8",
        fontWeight: "bold",
        fontSize: 20,
        width:'100%'
    },
    textValueCurrency: {
        color: "#E8E8E8",
        width:'50%'
    }
})
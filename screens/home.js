import React, { Component } from 'react';
import axios from 'axios';
import moment from "moment";
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Alert, TouchableOpacity, Image, Button} from 'react-native';
class home extends Component {

    constructor(props){
        super(props)
        this.state = {
            dataSource: [],
            isLoading: true,
            bidOrAsk: 'Compra'
        }
    }

      componentDidMount(){
        this.makeRequest()
    }

    handleClick = () => {
      if(this.state.bidOrAsk == 'Compra'){
        this.setState({bidOrAsk: 'Venda'})
      }else{
        this.setState({bidOrAsk: 'Compra'})
      }
    }

    makeRequest = async () => {
        var url = "https://economia.awesomeapi.com.br/all"
        axios.get(url)
        .then(response => {
            var fullData = [response.data.BTC, response.data.AUD,response.data.CAD,response.data.USD,response.data.USDT, response.data.EUR, response.data.JPY,response.data.GBP, response.data.LTC, response.data.ARS]
            for(let i = 0; i < fullData.length; i++){
              fullData[i].create_date = moment(new Date(fullData[i].timestamp * 1000)).format('DD/MM/YYYY hh:MM');
            }
            this.setState({dataSource: fullData, isLoading:false})
        })
        .catch(err =>{
            alert(`Não foi possível os dados${err}`)
        })
    }


    FlatListHeader = () => {
      if(this.state.bidOrAsk == 'bid'){
        return (
          <View elevation={1} 
            style={{
              height: 120,
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
            <Text style={{  textShadowColor: 'black', color: "#E8E8E8", textShadowOffset: { width: 1, height: 3 },textShadowRadius: 10, fontSize: 40, fontWeight: '800', flex: 1, alignSelf: "center", paddingTop: 30, fontSize: 40}}>Valores </Text>
          </View>
        )}else{
          return(
          <View elevation={1} 
            style={{
              height: 120,
              width: "97%",
              margin: 5,
              backgroundColor: "#121212",
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
            <Text style={{textShadowColor: 'black', color: "#fff", opacity:0.8, textShadowOffset: { width: 1, height: 3 },textShadowRadius: 10, fontSize: 40, fontWeight: '800', flex: 1, alignSelf: "center", paddingTop: 30, fontSize: 40}}> {this.state.bidOrAsk} </Text>
          </View>
          )}
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
          this.state.bidOrAsk == 'Compra' ?
          <View style={styles.horizontalContainer}>
            <TouchableOpacity style={styles.TouchableOpacity} onPress={() => Alert.alert('INFORMAÇÕES DE HOJE',`Máximo: R$${item.high}\nMínimo R$${item.low}\nVariação: R$${item.varBid}(${item.pctChange}%)\nValor de venda:R$${item.ask}\nÚltima atualização: ${item.create_date}`)}>
              <Text style={styles.textNameCurrency}>{item.name}({item.code})</Text>
              <View
                style={{
                height: 20,
                width: "0.25%",
                backgroundColor: "#000",
                }}
              />
              <Text style={styles.textValueCurrency}>R${item.bid}</Text>
            </TouchableOpacity>
          </View> :
          <View style={styles.horizontalContainer}>
          <TouchableOpacity style={styles.TouchableOpacity} onPress={() => Alert.alert('INFORMAÇÕES DE HOJE',`Máximo: R$${item.high}\nMínimo R$${item.low}\nVariação: R$${item.varBid}(${item.pctChange}%)\nValor de venda:R$${item.ask}\nÚltima atualização: ${item.create_date}`)}>
            <Text style={styles.textNameCurrency}>{item.name}({item.code})</Text>
            <View
              style={{
              height: 20,
              width: "0.25%"
              }}
            />
            <Text style={styles.textValueCurrency}>R${item.ask}</Text>
          </TouchableOpacity>
        </View>
        }
        />
        <Button onPress={this.handleClick} title={`Visualizando valor de ${this.state.bidOrAsk}. Clique para alterar`}/>
      </View>
            )
        }
    }



export default home

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
      paddingStart: 10,
      paddingEnd: 10,
      paddingTop: 25,
      paddingBottom:5
    },
    TouchableOpacity:{
        width:'100%',
        flexDirection:'row'
    },
    horizontalContainer: {
        backgroundColor: "#121212",
        flexDirection:'row',
        flex:1,
        height: 25,
        width: '100%',
    },
    textNameCurrency: {
        color: "#E8E8E8",
        opacity: 0.8,
        fontWeight: "bold",
        fontSize: 20,
        width:'55%'
    },
    textValueCurrency: {
        color: "#E8E8E8",
        fontWeight: "bold",
        opacity: 0.8,
        width:'39%',
        fontSize:15,
        paddingStart:20
    }
})
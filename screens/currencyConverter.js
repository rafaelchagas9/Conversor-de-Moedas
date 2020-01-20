import React, { Component } from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity, Image, Picker, Button} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { ThemeColors } from 'react-navigation';


class currencyConverter extends Component<Props> {
    
    constructor (props){
        super(props)
        this.state = {
            currencyFrom: 0,
            currencyTo: 0,
            valueFrom: 0,
            valueTo:0,
            datasource: [],
            result: 0,
        }
    }
    

    makeRequest = async() => {
        var url = "https://economia.awesomeapi.com.br/all"
        axios.get(url)
        .then(response => {
            var fullData = [response.data.BTC, response.data.AUD,response.data.CAD,response.data.USD,response.data.USDT, response.data.EUR, response.data.JPY,response.data.GBP, response.data.LTC, response.data.ARS]
            this.setState({dataSource: fullData, isLoading:false})
            
        })
        .catch(err =>{
            alert(`Não foi possível os dados${err}`)
        })
    }

    componentDidMount(){
        this.makeRequest()
    }

    handleTextFrom = (text) =>{
       this.setState({valueFrom: text})
    }

    handleTextTo = (text) =>{
        this.setState({valueTo: text})
    }

    handleClick = () => {
        this.calculate()
    }

    calculate = () => {
        var exchangeRate = 0
        var rateTo = 0
        var rateFrom = 0
        // If para verificar se o Real está presente na conversão
        if(this.state.currencyFrom == 10 || this.state.currencyTo == 10){
            if (this.state.currencyFrom == 10){
                rateTo = this.state.dataSource[this.state.currencyTo].bid
                exchangeRate = 1/rateTo
            }else{
                rateFrom = this.state.dataSource[this.state.currencyFrom].bid
                exchangeRate = rateFrom
            }
        }else{
        var rateFrom = this.state.dataSource[this.state.currencyFrom].bid
        var rateTo = this.state.dataSource[this.state.currencyTo].bid
        exchangeRate = rateFrom/rateTo
        }
        var valueAfterExchange = this.state.valueFrom*exchangeRate
        this.setState({result: valueAfterExchange.toFixed(3)})
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.horizontalContainer}>
                    <Picker
                    selectedValue={this.state.currencyFrom}
                    style={{height: 50, width: '40%', color:'#fff'}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({currencyFrom: itemValue})
                    }>
                    <Picker.Item label="Bitcoin" value={0} />
                    <Picker.Item label="Dólar Australiano" value={1} />
                    <Picker.Item label="Dólar Canadense" value={2} />
                    <Picker.Item label="Dólar Comercial" value={3} />
                    <Picker.Item label="Dólar Turismo" value={4} />
                    <Picker.Item label="Euro" value={5} />
                    <Picker.Item label="Iene Japonês" value={6} />
                    <Picker.Item label="Libra esterlina" value={7} />
                    <Picker.Item label="Litecoin" value={8} />
                    <Picker.Item label="Peso Argentino" value={9} />
                    <Picker.Item label="Real Brasileiro" value={10} />

                    </Picker>
                    <Icon style={styles.icon} name="arrow-right" size={40} color="#E8E8F8" />

                    <Picker
                    selectedValue={this.state.currencyTo}
                    style={{height: 50, width: '40%', color:'#fff'}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({currencyTo: itemValue})
                    }>
                    <Picker.Item label="Bitcoin" value={0} />
                    <Picker.Item label="Dólar Australiano" value={1} />
                    <Picker.Item label="Dólar Canadense" value={2} />
                    <Picker.Item label="Dólar Comercial" value={3} />
                    <Picker.Item label="Dólar Turismo" value={4} />
                    <Picker.Item label="Euro" value={5} />
                    <Picker.Item label="Iene Japonês" value={6} />
                    <Picker.Item label="Libra esterlina" value={7} />
                    <Picker.Item label="Litecoin" value={8} />
                    <Picker.Item label="Peso Argentino" value={9} />
                    <Picker.Item label="Real Brasileiro" value={10} />
                    </Picker>
                </View>
                <View style={styles.secondHorizontalContainer}>
                    <TextInput onChangeText={this.handleTextFrom} style={styles.inputFrom} placeholder='Insira o valor' keyboardType='decimal-pad'/>
                    <Text style={styles.textTo}>{this.state.result}</Text>
                </View>
                <View style={styles.thirdHorizontalContainer}>
                    <TouchableOpacity
                    style={styles.buttonConversion}
                    onPress={this.handleClick}
                    >
                        <Text style={{color:'#E8E8E8', textAlign:'center',alignSelf:'center'}}>Converter</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}

export default currencyConverter

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingStart:10,
      paddingTop:20,
      backgroundColor: '#121212',
    },
    horizontalContainer:{
        paddingTop:20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondHorizontalContainer:{
        paddingTop:5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    thirdHorizontalContainer:{
        paddingTop:20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonConversion:{
        backgroundColor: '#000000',
        width: '25%',
        height: 35,
        justifyContent: 'center'
    },
    inputFrom:{
        color: '#fff',
        width: '35%',
        height:30,
        backgroundColor: '#262626',
        textAlign: 'center'
    },
    textTo:{
        color: '#fff',
        height:30,
        width: '35%',
        marginStart:100,
        fontSize:23,
        backgroundColor: '#262626',
        textAlign: 'center',
    },
    icon:{
        alignSelf: 'center',
        marginTop:30,
        marginStart:20,
        marginEnd:20
    }
})
import {Body, Container, Header, Left, Right, Title} from 'native-base';
import React, {Component} from 'react';
import {TextInput, View, TouchableOpacity, Text, Alert} from 'react-native';
import Axios from 'axios';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import AwesomeAlert from 'react-native-awesome-alerts';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: false,
      StatusNik: false,
      keyword: '',
      nama: '',
      harga: '',
      service: '',
      alamat: '',
      sender: '',
      track_history: '',
    };
  }

  _search = async () => {
    // console.log("oke")
    this.setState({
      StatusNik: false,
      isloading: false,
      nama: '',
      harga: '',
      service: '',
      alamat: '',
      sender: '',
      track_history: '',
    });
    // console.log(this.state.keyword)
    const key = this.state.keyword ;
    if(key=='' || key ==" "){
      alert("kosong goblo!")
      return false
    }
    const url = "https://content-main-api-production.sicepat.com/public/check-awb" ;
    const newUrl = url+"/"+key ;

    // console.log(newUrl , key)
    // return false;
    // 000493671139
     Axios.get(newUrl)
        .then(res => {
          // console.log(res.data.sicepat.status.code)
          // console.log(res.data.status.code)
          // return false;

          if(res.data.sicepat.status.code!=200){
            Alert.alert(res.data.sicepat.status.description + " <br> datanya kaga ada tolol! , kodenya salah beg0000!")

            
            this.setState({
              isloading: false,
           });

          }else{
            const nama = res.data.sicepat.result.receiver_name;
            const harga = res.data.sicepat.result.totalprice;
            const service = res.data.sicepat.result.service;
  
            const alamat = res.data.sicepat.result.receiver_address;
            const sender = res.data.sicepat.result.sender;
            const track_history = res.data.sicepat.result.track_history;
            // const service = res.data.sicepat.result.service;
          
              this.setState({
                  StatusNik: true,
                  nama: nama,
                  harga: harga,
                  service:service,
                  alamat: alamat,
                  sender: sender,
                  track_history: track_history,
                  isloading: false,
              });

          }

          
  

          // this.setState({ persons });
        })
    
  };

  handleChange = key => val => {
    this.setState({[key]: val});
  };

  render() {
    console.log(this.state.track_history)

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Cek Resi Sicepat Express!</Title>
          </Body>
          <Right />
        </Header>
        <View
          style={{marginTop: 10, marginHorizontal: 10, flexDirection: 'row'}}>
          <TextInput
            keyboardType="numeric"
            style={{width: '80%', borderWidth: 0.8, borderColor: '#333'}}
            placeholder="Kode Resi / Nomor Resi"
            onChangeText={this.handleChange('keyword')}
            value={this.state.keyword}
            onSubmitEditing={this._search}
          />
          <TouchableOpacity
            style={{
              marginLeft: 10,
              flex: 1,
              backgroundColor: '#002663',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={this._search}>
            <Text style={{color: 'white'}}>CEK</Text>
          </TouchableOpacity>
        </View>
        <OrientationLoadingOverlay
          visible={this.state.isloading}
          color="white"
          indicatorSize="large"
          messageFontSize={18}
          message="Loading..."
        />

        {this.state.StatusNik ? (
          <View style={{marginTop: 10, backgroundColor: '#caccd1'}}>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text style={{width: '35%'}}>Nomor resi</Text>
              <Text style={{width: '5%'}}>:</Text>
              <Text>{this.state.keyword}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text style={{width: '35%'}}>Nama Penerima</Text>
              <Text style={{width: '5%'}}>:</Text>
              <Text>{this.state.nama}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text style={{width: '35%'}}>Nama Sender</Text>
              <Text style={{width: '5%'}}>:</Text>
              <Text>{this.state.sender}</Text>
            </View>
            
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text style={{width: '35%'}}>Alamat Penerima</Text>
              <Text style={{width: '5%'}}>:</Text>
              <Text>{this.state.alamat}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text style={{width: '35%'}}>Harga</Text>
              <Text style={{width: '5%'}}>:</Text>
              <Text>{this.state.harga}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text style={{width: '35%'}}>Service</Text>
              <Text style={{width: '5%'}}>:</Text>
              <Text>{this.state.service}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                marginTop: 10,
                marginBottom: 10,
              }}>

            {this.state.track_history.map((item) => {
              return (
              <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text key={item.id}>
                  <Text style={{width: '35%'}}>Track: </Text>
                  <Text style={{width: '5%'}}>:</Text>
                  <Text>{item.status}</Text>
              </Text>
          </View> )

              ;
            })}
              {/* <Text style={{width: '35%'}}>Track</Text>
              <Text style={{width: '5%'}}>:</Text> */}
              {/* <Text>{this.state.track_history}</Text> */}
            </View>
          </View>
        ) : (
          <View></View>
        )}
      </Container>
    );
  }
}

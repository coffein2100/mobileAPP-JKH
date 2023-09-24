import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';

export default function Welcome({navigation}) {

  return (
    <SafeAreaView style={{flex:1, backgroundColor: '#fff'}}>
      <View style={styles.header}>
      <Image style={styles.welcomeimg} source={require('../img/welcomeimg.jpg')}  />
      </View>
    <View style={styles.footer}>
      <View style={styles.footerComponent}>
        <Text style={styles.footermaintext}>МОЙ ЖКХ</Text>
        <Image style={{height:27, width: 27, marginLeft:58, top:60}} source={require('../img/welcomecheck.png')}  />
        <Text style={styles.footerlisttext}>Учет показаний счетчиков</Text>
        <Image style={{height:27, width: 27, marginLeft:58, top:52}} source={require('../img/welcomecheck.png')}  />
        <Text style={styles.footerlisttext2}>Список объектов для учета</Text>
        <Image style={{height:27, width: 27, marginLeft:58, top:45}} source={require('../img/welcomecheck.png')}  />
        <Text style={styles.footerlisttext3}>История платежей</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Rooms')}>
        <Text style={styles.footerbottom}>ВЕСТИ УЧЕТ ПРОСТО!</Text>
        </TouchableOpacity>
      </View>
    </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header:{
    marginTop:50,
    padding:0,
  },
  welcomeimg:{
    width:'100%',
    height: '70%'
  },
  footer:{
    position: 'absolute',
    bottom:0,
    backgroundColor: '#B4DBA6',
    height: 350,
    width:'100%',
    borderTopStartRadius:25,
    borderTopEndRadius:25,
  },
  footerComponent:{
    flex:1,
    flexDirection: 'column',
    width: 280,
    height: 260,
    justifyContent: 'flex-start',
  },
  footermaintext:{
    fontSize: 36,
    fontWeight: 'bold',
    color: '#7E7D7D',
    top: 30,
    marginLeft: 'auto',
    textAlign: 'center',
  },
  footerlisttext: {
    fontSize: 20,
    fontWeight: '700',
    color: '#7E7D7D',
    top: 32,
    left:60,
    marginLeft: 'auto',
    textAlign: 'center',
  },
  footerlisttext2: {
    fontSize: 20,
    fontWeight: '700',
    color: '#7E7D7D',
    top: 23,
    left:72,
    marginLeft: 'auto',
    textAlign: 'center',
  },
  footerlisttext3: {
    fontSize: 20,
    fontWeight: '700',
    color: '#7E7D7D',
    top: 17,
    left:-12,
    marginLeft: 'auto',
    textAlign: 'center',
  },
  footerbottom: {
    fontSize: 20,
    fontWeight: '700',
    color: '#7E7D7D',
    top: 56,
    left:0,
    marginLeft: 'auto',
    textAlign: 'center',
    width: 290,
    height: 61,
    padding:18,
    backgroundColor:'#7E7D7D',
    borderRadius:24,
    color:'#fff',
    marginLeft:55,
  },
});

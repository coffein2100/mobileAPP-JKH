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
        <Image style={{height:27, width: 27,  top:60}} source={require('../img/welcomecheck.png')}  />
        <Text style={styles.footerlisttext}>Учет показаний счетчиков</Text>
        <Image style={{height:27, width: 27,  top:52}} source={require('../img/welcomecheck.png')}  />
        <Text style={styles.footerlisttext2}>Список объектов для учета</Text>
        <Image style={{height:27, width: 27,  top:45}} source={require('../img/welcomecheck.png')}  />
        <Text style={styles.footerlisttext3}>История платежей</Text>
        <TouchableOpacity style={{alignItems:'center',}} onPress={() => navigation.navigate('Rooms')}>
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
    padding:5,
    position: 'absolute',
    bottom:0,
    backgroundColor: '#B4DBA6',
    height: 350,
    width:'100%',
    borderTopStartRadius:25,
    borderTopEndRadius:25,
    alignItems:'center',
  },
  footerComponent:{
    flex:1,
    flexDirection: 'column',
    /* width: 280,
    height: 260, */
    justifyContent: 'flex-start',
    padding:0,
    margin:0,
    
  },


  footermaintext:{
    fontSize: 36,
    fontWeight: 'bold',
    color: '#7E7D7D',
    top: 30,
    textAlign: 'center',
  },
  footerlisttext: {
    fontSize: 20,
    fontWeight: '700',
    color: '#7E7D7D',
    top: 32,
    marginLeft:40,
    textAlign: 'left',
    
  },
  footerlisttext2: {
    fontSize: 20,
    fontWeight: '700',
    color: '#7E7D7D',
    top: 23,
    marginLeft:40,
    textAlign: 'left',
    
  },
  footerlisttext3: {
    fontSize: 20,
    fontWeight: '700',
    color: '#7E7D7D',
    top: 17,
    marginLeft:40,
    textAlign: 'left',
    
  },
  footerbottom: {
    fontSize: 20,
    fontWeight: '700',
    color: '#7E7D7D',
    top: 56,
    left:0,
    textAlign: 'center',
    width: 290,
    height: 61,
    padding:18,
    backgroundColor:'#7E7D7D',
    borderRadius:24,
    color:'#fff',
    
  },
});

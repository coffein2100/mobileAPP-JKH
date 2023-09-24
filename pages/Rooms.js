import React from 'react';
import {useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, FlatList, Modal, TextInput, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RoomAdd from './FormRoomsAdd';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Rooms({navigation}) {


  const getroomsListFromUserDevice = async () => {
    try {
      const roomsList = await AsyncStorage.getItem('roomsList');
      if(roomsList !=null){
        setRooms(JSON.parse(roomsList));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveroomsListTouserDevice = async roomsList => {
    try {
      const stringifyroomsList = JSON.stringify(roomsList);
      await AsyncStorage.setItem('roomsList', stringifyroomsList);
    } catch (e) {
      console.log(e);
      // saving error
    }
  }

function IsNumeric(num) {
  return ((num >=0 || num < 0)&& (parseInt(num)==num) );
}


    const [roomsList, setRooms] = useState([
        /* {id:1, nameRoom:"my", adress: "test1", numberRegistered:0, square: "35,5" },
        {id:2, nameRoom:"parent", adress: "test", numberRegistered:3, square: "45,5" }, */
      ]);

      useEffect(()=> {
        getroomsListFromUserDevice();
      },[])
      useEffect(()=> {
        saveroomsListTouserDevice(roomsList);
      }, [roomsList]);

      const [addmodalWindow, setaddModalWindow] = useState(false); //запуск формы добавления квартиры
      const [editmodalWindow, seteditModalWindow] = useState(false);
      /* const [textInputName, setTextInputName] = useState('');
      const [textInputAdress, setTextInputAdress] = useState(''); */
      const [textInputRegister, setTextInputRegister] = useState('');
      /* const [textInputSquare, setTextInputSquare] = useState(''); */
 
    const RoomItem = ({room}) => {
      
        return <View style={styles.listRoom}>
                <View style={{flex:1}}>
                <Text style={{fontWeight: 700, fontSize:16, color: '#000000'}} >
                Имя: {room?.nameRoom} 
                </Text >
                <Text style={{fontWeight: 700, fontSize:12, color: '#000000'}}>
                Адрес: {room?.adress}
                </Text>
                <Text style={{fontWeight: 700, fontSize:12, color: '#000000'}}>
                Прописано: {room?.numberRegistered}
                </Text>
                <Text style={{fontWeight: 700, fontSize:16, color: '#000000'}}>
                Площадь: {room?.square}
                </Text>
                </View>
                <TouchableOpacity style={styles.actionIcon} onPress={()=>    editRoom(room?.id) }>
                <Icon name="edit" size={25} color={'#fff'}/>
                </TouchableOpacity> 
                <TouchableOpacity style={[styles.actionIcon, {backgroundColor:'#FA8072'}]} onPress={()=> deleteRoom(room?.id)}>
                <Icon name="delete" size={25} color={'#fff'}/>
                </TouchableOpacity>
        </View>
    }

    

    const deleteRoom = (roomId) => { //удалить комнату
        const newRooms = roomsList.filter(item => item.id != roomId);
        setRooms(newRooms);
      };

      const editRoom = (roomId) => { 
         if(textInputRegister === "" || !IsNumeric(textInputRegister) ){
          Alert.alert('Упс! Что-то пошло не так', 'Поле не может быть пустым или заполненно неверно.Количество людей может быть только целым числом. В поле указано '+ '"' + textInputRegister + '"'  ); //проверка поля на пустоту
        }else{ 
        const newRooms = roomsList.map((item)=>{
          if(item.id == roomId){
            return {...item, numberRegistered:textInputRegister};
          }
            return item;
        });
        setRooms(newRooms);
        /* setTextInputName("");
        setTextInputAdress(""); */
        setTextInputRegister("");
       /*  setTextInputSquare("");  */ 
      }}
      
    

      const addRoom = (room) => {
        setRooms((list) => {
            room.id = Math.random().toString();
            
          return [
            room,
            ...list
          ]
        });
       
      }


    return (
        <SafeAreaView
        style={{flex:1, backgroundColor: '#fff'}}>

        <Modal visible={editmodalWindow}>
        <View style={{flex:1, marginTop:30,}}>
            <View style={{alignItems:'center'}}>
        <TouchableOpacity style={[styles.actionIcon,{backgroundColor: '#FA8072',marginBottom:20, borderRadius:15,}]} onPress={()=> seteditModalWindow(false)}>
        <Icon name="close" size={30} color={'#fff'} />
        </TouchableOpacity>
        </View>
          <Text style={{fontWeight: 700, fontSize: 18, color: '#7E7D7D', textAlign: 'center', marginBottom:20,}}> Редактирование недвижимости</Text>
          <Text style={{fontWeight: 700, fontSize: 14, color: '#7E7D7D', textAlign: 'center', marginBottom:20,marginLeft:20, marginRight:20}}> 
          Для редактирования недвижимости заполните обязательно все поля, после чего нажмите на значок редактирования напротив той записи, которую хотите изменить
          </Text>
          {/* <TextInput placeholder="Изменить имя" style={styles.input}
          value={textInputName}
          
          onChangeText={(text)=> setTextInputName(text)}/>
          <TextInput placeholder="Изменить адрес" style={styles.input}
          value={textInputAdress}
          onChangeText={(text)=> setTextInputAdress(text)}/> */}
          <TextInput placeholder="Изменить количество прописанных людей" style={styles.input}
          value={textInputRegister}
          onChangeText={(text)=> setTextInputRegister(text)}/>
          {/* <TextInput placeholder="Изменить площадь" style={styles.input}
          value={textInputSquare}
          onChangeText={(text)=> setTextInputSquare(text)}/> */}

        </View>
      </Modal>    

       

        <Modal visible={addmodalWindow}>
        <View style={{flex:1, marginTop:30,}}>
            <View style={{alignItems:'center'}}>
        <TouchableOpacity style={[styles.actionIcon,{backgroundColor: '#FA8072',marginBottom:20, borderRadius:15,}]} onPress={()=> setaddModalWindow(false)}>
        <Icon name="close" size={30} color={'#fff'} />
        </TouchableOpacity>
        </View>
          <Text style={{fontWeight: 700, fontSize: 18, color: '#7E7D7D', textAlign: 'center'}}> Добавление новой недвижимости</Text>
          <RoomAdd addRoom={addRoom}/>
        </View>
      </Modal>


      <View style={styles.header}>
        <Text style={{fontWeight: 700, fontSize: 20, color: '#7E7D7D',top:-4}}>МОЙ ЖКХ</Text>
        <TouchableOpacity onPress={()=> seteditModalWindow(true)}>
        <Text style={styles.headerButton}>Изм.</Text>
        </TouchableOpacity> 
        <TouchableOpacity onPress={()=> setaddModalWindow(true)}>
        <Text style={styles.headerButton}>Добавить недвижимость</Text>
        </TouchableOpacity>
      </View>

      <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{padding:20, paddingBottom:100}}
       data={roomsList}
       renderItem={({item}) => < RoomItem room={item}/>}
      />

      
      <View style={styles.footer}>
      <TouchableOpacity>
        <Image style={{width:63, height:55}} resizeMode='contain' source={require('../img/rooms-active.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Chetchiki')}>
        <Image style={{width:40, height:46}} resizeMode='contain' source={require('../img/schet.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('History')}>
        <Image style={{width:45, height:50}} resizeMode='contain' source={require('../img/history.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Payments')}>
        <Image style={{width:37, height:47}} resizeMode='contain' source={require('../img/pay.png')} />
        </TouchableOpacity>
      </View>

        </SafeAreaView>
        );
    }

    const styles = StyleSheet.create({
        header: {
            height:95,
            padding: 20,
            flexDirection: 'row',
            alignItems: 'flex-end', //выравнивание по центру
            justifyContent: 'space-between',
            backgroundColor: '#B4DBA6',
          },
        headerButton:{
            fontWeight: '700',
            fontSize: 10, 
            color: '#7E7D7D',
            padding:10,
            backgroundColor: '#D9D9D9',
            borderRadius:5,
            borderColor:'#fff',
            borderWidth:1,
        },
        footeradd:{
          position: 'absolute',
          bottom:70,
          height:70,
          width:'100%',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          backgroundColor: '#00F',
          justifyContent: 'space-between',
        },
        footer: {
            position: 'absolute',
            bottom:0,
            height:70,
            width:'100%',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            backgroundColor: '#B4DBA6',
            justifyContent: 'space-between',
          },
          listRoom: {
            padding:20,
            backgroundColor: '#D9D9D9',
            flexDirection: 'row',
            elevation:12,
            borderRadius:7,
            marginVertical:10,
          },
          actionIcon: {
            height:30,
            width:30,
            alignItems: 'center',
            backgroundColor: '#00BB00',
            justifyContent:'center',
            marginLeft:10,
            marginRight:10,
            borderRadius:3,
            
          },
          input:{
            borderWidth:1,
            marginTop:15,
            padding:10,
            borderColor: 'silver',
            borderRadius:5,
            marginLeft:20,
            marginRight:20,
          },
          
    });
import React from 'react';
import {useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, FlatList, Modal, TextInput, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RoomAdd from './FormRoomsAdd';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';

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

  const countReg = [
    { label: '0', value: '0' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' },
    { label: 'Более 10', value: 'Более 10' },
  ];

  const [value, setValue] = useState(null);
  
function IsNumeric(num) {
  return ((num >=0)&& (parseInt(num)==num) );
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
         if(value === null /* || !IsNumeric(textInputRegister) */ ){
          Alert.alert('Упс! Что-то пошло не так', 'Поле не может быть пустым. Для изменения количества прописанных нажмите кнопку изменить и выберите значение, после чего повторно нажмите на карандаш.' ); //проверка поля на пустоту
        }else{ 
        const newRooms = roomsList.map((item)=>{
          if(item.id == roomId){
            return {...item, numberRegistered:value};
          }
            return item;
        });
        setRooms(newRooms);
        /* setTextInputName("");
        setTextInputAdress(""); */
        setValue(null);
       /*  setTextInputSquare("");  */ 
      }}
      
    

      const addRoom = (room) => {
        setRooms((list) => {
            room.id = Math.random().toString();
            room.numberRegistered=value;
          return [
            room,
            ...list
          ]
        });
        setaddModalWindow(false);
        setValue(null);
      }


    return (
        <SafeAreaView
        style={{flex:1, backgroundColor: '#fff'}}>

        <Modal visible={editmodalWindow}>
        <View style={{flex:1, marginTop:30,alignItems:'center',position:'relative'}}>
            <View style={{position:'absolute', left:0}}>
        <TouchableOpacity style={[styles.actionIcon,{backgroundColor: '#fff', width:40, height:40,}]} onPress={()=> seteditModalWindow(false)}>
        <Icon name="arrow-back" size={40}  color={'#B4DBA6'} />
        </TouchableOpacity>
        </View>
          <Text style={{fontWeight: 700, fontSize: 18, color: '#7E7D7D', textAlign: 'center', marginBottom:20,marginTop:40 }}> Редактирование недвижимости</Text>
          <Text style={{fontWeight: 700, fontSize: 14, color: '#7E7D7D', textAlign: 'center',/*  marginBottom:20,  */marginLeft:20, marginRight:20,  width:'81%',}}> 
          Для редактирования недвижимости заполните обязательно все поля, после чего нажмите назад, далее на значок редактирования напротив той записи, которую хотите изменить
          </Text>
          {/* <TextInput placeholder="Изменить имя" style={styles.input}
          value={textInputName}
          
          onChangeText={(text)=> setTextInputName(text)}/>
          <TextInput placeholder="Изменить адрес" style={styles.input}
          value={textInputAdress}
          onChangeText={(text)=> setTextInputAdress(text)}/> */}
          
          {/* <TextInput placeholder="Изменить площадь" style={styles.input}
          value={textInputSquare}
          onChangeText={(text)=> setTextInputSquare(text)}/> */}

        <Dropdown
        style={[styles.dropdown,{marginLeft:'auto', marginRight:'auto', width:'81%'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={countReg}
        search
        labelField="label"
        valueField="value"
        placeholder="Изменить количество прописанных"
        searchPlaceholder="Поиск..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
        />
       
        
      

        </View>
        
        

      </Modal>    

       

        <Modal visible={addmodalWindow}>
        <View style={{flex:1, marginTop:30,alignItems:'stretch',}}>
            <View style={{position:'absolute', left:0}}>
        <TouchableOpacity style={[styles.actionIcon,{backgroundColor: '#fff',marginBottom:20, borderRadius:15,width:40, height:40, marginLeft:5}]} onPress={()=> setaddModalWindow(false)}>
        <Icon name="arrow-back" size={40} color={'#B4DBA6'} />
        </TouchableOpacity>
        </View>
          <Text style={{fontWeight: 700, fontSize: 18, color: '#7E7D7D', textAlign: 'center',marginTop:40}}> Добавление новой недвижимости</Text>
          <Dropdown
        style={[styles.dropdown,{marginLeft:'auto', marginRight:'auto', width:'81%'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={countReg}
        search
        labelField="label"
        valueField="value"
        placeholder="Указать количество прописанных"
        searchPlaceholder="Поиск..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
        />
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
            width:'80%',
          },
          dropdown: {
            margin: 16,
            height: 50,
            borderBottomColor: 'gray',
            borderBottomWidth: 0.5,
          },
          icon: {
            marginRight: 5,
          },
          placeholderStyle: {
            fontSize: 16,
          },
          selectedTextStyle: {
            fontSize: 16,
          },
          iconStyle: {
            width: 20,
            height: 20,
          },
          inputSearchStyle: {
            height: 40,
            fontSize: 16,
          },
    });
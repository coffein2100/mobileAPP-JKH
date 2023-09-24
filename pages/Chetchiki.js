import React from 'react';
import {useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, FlatList, Modal, TextInput, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ChetchikiAdd from './FormChetchikiAdd';
import { Dropdown } from 'react-native-element-dropdown';


import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Chetchiki({navigation}) {

  const getcounterListFromUserDevice = async () => {
    try {
      const counterList = await AsyncStorage.getItem('counterList');
      if(counterList !=null){
        setСounter(JSON.parse(counterList));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const savecounterListTouserDevice = async counterList => {
    try {
      const stringifycounterList = JSON.stringify(counterList);
      await AsyncStorage.setItem('counterList', stringifycounterList);
    } catch (e) {
      console.log(e);
      // saving error
    }
  }

 



    const [counterList, setСounter] = useState([
        /* {id:1, nameRooms:"my", nameCounter: "Газовый счетчик", datePoverka: '12-05-2023', regCounter: "11111-01" },
        {id:2, nameRooms:"my", nameCounter: "Электрический счетчик", datePoverka: '18-05-2023', regCounter: "11112-012" },
        {id:3, nameRooms:"parent", nameCounter: "Горячая вода", datePoverka:'18-12-2023', regCounter: "22222-02" },
        {id:4, nameRooms:"test", nameCounter: "Горячая вода", datePoverka:'18-12-2123', regCounter: "22222-02" }, */
      ]);

      useEffect(()=> {
        getcounterListFromUserDevice();
      },[])
      useEffect(()=> {
        savecounterListTouserDevice(counterList);
      }, [counterList]);

   /*  const [value, setValue] = useState(null); */
    const [addmodalWindow, setaddModalWindow] = useState(false);
    const [editmodalWindow, seteditModalWindow] = useState(false);
    const [textInputPoverka, setTextInputPoverka] = useState('');
    const [textInputNameRoom, setInputNameRoom] = useState('');


    const deleteCounter = (counterId) => { //удалить счетчик
        const newCounter = counterList.filter(item => item.id != counterId);
        setСounter(newCounter);
      };


    const СounterItem = ({counter}) => {
      if( counter?.nameRooms == textInputNameRoom){
        return <View style={styles.listСounter}>
                <View style={{flex:1}}>
                <Text style={{fontWeight: 700, fontSize:14, color: '#000000'}}>
                Название счетчика: {counter?.nameCounter}
                </Text>
                <Text style={{fontWeight: 700, fontSize:16, color: '#000000'}}>
                Дата поверки: {counter?.datePoverka}
                </Text>
                <Text style={{fontWeight: 700, fontSize:12, color: '#000000'}}>
                Регистрационный номер: {counter?.regCounter}
                </Text>
                </View>
                <TouchableOpacity style={styles.actionIcon}  onPress={()=>  editCounter(counter?.id) } >
                <Icon name="edit" size={25} color={'#fff'}/>
                </TouchableOpacity> 
                <TouchableOpacity style={[styles.actionIcon, {backgroundColor:'#FA8072'}]} onPress={()=> deleteCounter(counter?.id)}>
                <Icon name="delete" size={25} color={'#fff'}/>
                </TouchableOpacity>
        </View>
    }
    return  
  };

    const addChetchiki = (counter) => {
      setСounter((list) => {
        counter.id = Math.random().toString();
        return [
          counter,
          ...list
        ]
      });
      
    }

//^(0[1-9]|[12][0-9]|3[01])[-](0[1-9]|1[012])[-]((19|20)\\d\\d)$


    const editCounter = (counterId) => { 

      const reg = new RegExp("^((2000|2400|2800|(19|2[0-9])(0[48]|[2468][048]|[13579][26]))-02-29)$" 
      + "|^((0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-(19|2[0-9])[0-9]{2})$");
     
      if(textInputPoverka ==''|| !reg.test(textInputPoverka)){
       Alert.alert('Упс! Что-то пошло не так', 'Поле не может быть пустым или заполненно неверно.Формат ввода дд-мм-гггг. В поле указано '+ '"' + textInputPoverka + '"'  ); //проверка поля на пустоту
     }else{ 
     const newCounter = counterList.map((item)=>{
       if(item.id == counterId){
         return {...item, datePoverka:textInputPoverka};
       }
         return item;
     });
     setСounter(newCounter);
    
     setTextInputPoverka("");
   
   }}

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
          <Text style={{fontWeight: 700, fontSize: 18, color: '#7E7D7D', textAlign: 'center', marginBottom:20,}}> Редактирование счетчика</Text>
          <Text style={{fontWeight: 700, fontSize: 14, color: '#7E7D7D', textAlign: 'center', marginBottom:20,marginLeft:20, marginRight:20}}> 
          Для редактирования заполните обязательно все поля, после чего нажмите на значок редактирования напротив той записи, которую хотите изменить
          </Text>
          
          <TextInput placeholder="Изменить дату поверки" style={styles.input}
          value={textInputPoverka}
          required
          onChangeText={(text)=> setTextInputPoverka(text)}/>
          
        </View>
      </Modal>   




        <Modal visible={addmodalWindow}>
        <View style={{flex:1, marginTop:30,}}>
        <View style={{alignItems:'center'}}>
        <TouchableOpacity style={[styles.actionIcon,{backgroundColor: '#FA8072',marginBottom:20, borderRadius:15,}]} onPress={()=> setaddModalWindow(false)}>
        <Icon name="close" size={30} color={'#fff'} />
        </TouchableOpacity>
        </View>
          <Text style={{fontWeight: 700, fontSize: 18, color: '#7E7D7D', textAlign: 'center'}}> Добавление счетчика</Text>
          <ChetchikiAdd addChetchiki={addChetchiki}/>
        </View>
      </Modal>



        <View style={styles.header}>
        <Text style={{fontWeight: 700, fontSize: 20, color: '#7E7D7D',top:-4}}>МОЙ ЖКХ</Text>
        <TouchableOpacity onPress={()=> seteditModalWindow(true)}>
        <Text style={styles.headerButton}>Изм.</Text>
        </TouchableOpacity> 
        <TouchableOpacity onPress={()=> setaddModalWindow(true)}>
        <Text style={styles.headerButton}>Добавить счетчик</Text>
        </TouchableOpacity>
        </View>

        <TextInput placeholder="Введите имя недвижимости" style={styles.input}
        value={textInputNameRoom}
        onChangeText={(text)=> setInputNameRoom(text)}/>
       {/*  <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={roomData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Выберите недвижимость"
        searchPlaceholder="Поиск..."
        value={value}
        
        onChange={item => {
          nameSetValue(item.value);
          //counterRooms(item.value)
          console.log(value);
        }}
        
      /> */}
        

        <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding:20, paddingBottom:100}}
        data={counterList}
        renderItem={({item}) => < СounterItem counter={item}/>}
        />
          




        <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Rooms')}>
        <Image style={{width:63, height:55}} resizeMode='contain' source={require('../img/rooms.png')} />
        </TouchableOpacity>
        <TouchableOpacity >
        <Image style={{width:40, height:46}} resizeMode='contain' source={require('../img/schet-active.png')} />
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
      listСounter: {
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
        padding:5,
        borderColor: 'silver',
        borderRadius:5,
        marginLeft:20,
        marginRight:20,
      },
      dropdown: {
        margin: 20,
        height: 50,
        borderBottomColor:'grey',
        borderBottomWidth: 0.5,
        
      },
      
      placeholderStyle: {
        fontSize: 14,
        marginLeft:10,
      },
      selectedTextStyle: {
        fontSize: 14,
        marginLeft:10,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 14,
      },
});
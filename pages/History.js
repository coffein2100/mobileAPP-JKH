import React from 'react';
import {useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, FlatList, Modal, TextInput, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HistoryAdd from './FormHistoryAdd';
import { DatePickerInput  } from 'react-native-paper-dates';
import {
  // en,
  // nl,
  // pl,
  enGB,
  registerTranslation,
} from 'react-native-paper-dates';
import { date } from 'yup';

registerTranslation('en-GB', enGB);


export default function History({navigation}) {

    const gethistoryListFromUserDevice = async () => {
        try {
          const historyList = await AsyncStorage.getItem('historyList');
          if(historyList !=null){
            sethistory(JSON.parse(historyList));
          }
        } catch (error) {
          console.log(error);
        }
      };
    
      const savehistoryListTouserDevice = async historyList => {
        try {
          const stringifyhistoryList = JSON.stringify(historyList);
          await AsyncStorage.setItem('historyList', stringifyhistoryList);
        } catch (e) {
          console.log(e);
          // saving error
        }
      }


    function IsNumeric(num) {
        return ((num >=0)&& (parseInt(num)==num) );
      }

    const [addmodalWindow, setaddModalWindow] = useState(false);
    const [editmodalWindow, seteditModalWindow] = useState(false);
    const [textInputHistory, setTextInputHistory] = useState('');
    const [textInputNameRoom, setInputNameRoom] = useState('');
    const [textInputNameChetchik, setInputNameChetchik] = useState('');
    const [inputDate, setInputDate] = useState(new Date());
    var options = { year: 'numeric', month: 'numeric', day: 'numeric' };

    const [historyList, sethistory] = useState([
        /* {id:1, nameRooms:"test", nameChetchik:'gaz', date: '12-05-2023', readmeter: "5", flow: '0' },
        {id:2, nameRooms:"test", nameChetchik:'electro', date: '12-06-2023', readmeter: "10", flow: '5' },
        {id:3, nameRooms:"test", nameChetchik:'electro', date: '12-09-2023', readmeter: "30", flow: '20' },
        {id:4, nameRooms:"test2", nameChetchik:'water', date: '12-05-2023', readmeter: "15", flow: '10' },
        {id:5, nameRooms:"test2", nameChetchik:'gaz', date: '12-06-2023', readmeter: "35", flow: '20' }, */  
      ]);

      useEffect(()=> {
        gethistoryListFromUserDevice();
      },[])
      useEffect(()=> {
        savehistoryListTouserDevice(historyList);
      }, [historyList]);

      const HistoryItem = ({history}) => {
        if( history?.nameRooms == textInputNameRoom && textInputNameChetchik == ''){
          return <View style={styles.listСounter}>
                  <View style={{flex:1}}>
                  <Text style={{fontWeight: 700, fontSize:14, color: '#000000'}}>
                  Счетчик: {history?.nameChetchik}
                  </Text>
                  <Text style={{fontWeight: 700, fontSize:14, color: '#000000'}}>
                  Дата: {history?.date}
                  </Text>
                  <Text style={{fontWeight: 700, fontSize:16, color: '#000000'}}>
                  Показания прибора: {history?.readmeter}
                  </Text>
                  <Text style={{fontWeight: 700, fontSize:12, color: '#000000'}}>
                  Расход: {history?.flow}
                  </Text>
                  </View>
                  <TouchableOpacity style={styles.actionIcon}   onPress={()=>  editHistory(history?.id) } >
                  <Icon name="edit" size={25} color={'#fff'}/>
                  </TouchableOpacity> 
                  <TouchableOpacity style={[styles.actionIcon, {backgroundColor:'#FA8072'}]}  onPress={()=> deleteHistory(history?.id)} >
                  <Icon name="delete" size={25} color={'#fff'}/>
                  </TouchableOpacity>
          </View>
      }

       if( history?.nameRooms == textInputNameRoom && history?.nameChetchik == textInputNameChetchik ) {
        return <View style={styles.listСounter}>
        <View style={{flex:1}}>
        <Text style={{fontWeight: 700, fontSize:14, color: '#000000'}}>
        Счетчик: {history?.nameChetchik}
        </Text>
        <Text style={{fontWeight: 700, fontSize:14, color: '#000000'}}>
        Дата: {history?.date}
        </Text>
        <Text style={{fontWeight: 700, fontSize:16, color: '#000000'}}>
        Показания прибора: {history?.readmeter}
        </Text>
        <Text style={{fontWeight: 700, fontSize:12, color: '#000000'}}>
        Расход: {history?.flow}
        </Text>
        </View>
        <TouchableOpacity style={styles.actionIcon}   onPress={()=>  editHistory(history?.id) } >
        <Icon name="edit" size={25} color={'#fff'}/>
        </TouchableOpacity> 
        <TouchableOpacity style={[styles.actionIcon, {backgroundColor:'#FA8072'}]}  onPress={()=> deleteHistory(history?.id)} >
        <Icon name="delete" size={25} color={'#fff'}/>
        </TouchableOpacity>
        </View>
      } 
      return  
    };


    const addHistory = (history) => {
      if (inputDate!=''){
        sethistory((list) => {
          
            history.id = Math.random().toString();
            history.date = inputDate.toLocaleDateString("ru-RU");
          return [
            history,
            ...list
          ]
        });
        setaddModalWindow(false);
        setInputDate(new Date());}
        else {
          {Alert.alert('Упс! Что-то пошло не так', 'Дата обязательна к заполнению. Необходимо ввести данные повторно.')}
        }
      }

    const deleteHistory = (historyId) => { //удалить историю
        const newHistory = historyList.filter(item => item.id != historyId);
        sethistory(newHistory);
      };

      const editHistory = (historyId) => {             
        if(textInputHistory ==''|| !IsNumeric(textInputHistory)){
         Alert.alert('Упс! Что-то пошло не так', 'Поле не может быть пустым или заполненно неверно.Формат ввода 5.0 или 5. В поле указано '+ '"' + textInputHistory + '"'  ); //проверка поля на пустоту
       }else{ 
       const newHistory = historyList.map((item)=>{
         if(item.id == historyId){
           return {...item, flow:textInputHistory};
         }
           return item;
       });
       sethistory(newHistory);
      
       setTextInputHistory("");
       
     }}

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
          <Text style={{fontWeight: 700, fontSize: 18, color: '#7E7D7D', textAlign: 'center', marginBottom:20,marginTop:40}}> Редактирование расходования ресурсов</Text>
          <Text style={{fontWeight: 700, fontSize: 14, color: '#7E7D7D', textAlign: 'center', marginBottom:20,marginLeft:20, marginRight:20,width:'81%',}}> 
          Для редактирования заполните обязательно все поля,после чего нажмите назад, далее нажмите на значок редактирования напротив той записи, которую хотите изменить
          </Text>
          
          <TextInput placeholder="Укажите расход ресурса" style={styles.input}
          value={textInputHistory}
          required
          onChangeText={(text)=> setTextInputHistory(text)}/>
          
        </View>
        </Modal>   

        <Modal visible={addmodalWindow}>
        <View style={{flex:1, marginTop:30,alignItems:'stretch',}}>
        <View style={{position:'absolute', left:0}}>
        <TouchableOpacity style={[styles.actionIcon,{backgroundColor: '#fff',marginBottom:20, borderRadius:15,width:40, height:40, marginLeft:5}]} onPress={()=> setaddModalWindow(false)}>
        <Icon name="arrow-back" size={40} color={'#B4DBA6'} />
        </TouchableOpacity>
        </View>
          <Text style={{fontWeight: 700, fontSize: 18, color: '#7E7D7D', textAlign: 'center',marginTop:40}}> Добавление показаний счетчика</Text>
          <View style={{width: '80%',marginLeft:'auto',marginRight:'auto', marginTop:15,marginTop:45,}}>
          <DatePickerInput
          label="Дата фиксации"
          value={inputDate}
          onChange={(d) => setInputDate(d)}
          style={{backgroundColor:'#B4DBA6'}}
          mode="flat"
          saveLabel="Сохранить"
          inputMode="start"
          presentationStyle="formSheet"
          />
          </View>
          <HistoryAdd addHistory={addHistory}/>
        </View>
      </Modal>

        <View style={styles.header}>
        <Text style={{fontWeight: 700, fontSize: 20, color: '#7E7D7D',top:-4}}>МОЙ ЖКХ</Text>
        <TouchableOpacity onPress={()=> seteditModalWindow(true)}>
        <Text style={styles.headerButton}>Изм.</Text>
        </TouchableOpacity> 
        <TouchableOpacity onPress={()=> setaddModalWindow(true)}>
        <Text style={styles.headerButton}>Добавить</Text>
        </TouchableOpacity>
        </View>

        <TextInput placeholder="Введите имя недвижимости" style={[styles.input, {width:'95%',marginLeft:'auto',marginRight:'auto',}]}
        value={textInputNameRoom}
        onChangeText={(text)=> setInputNameRoom(text)}/>

        <TextInput placeholder="Введите имя счетчика" style={[styles.input, {width:'95%',marginLeft:'auto',marginRight:'auto',}]}
        value={textInputNameChetchik}
        onChangeText={(text)=> setInputNameChetchik(text)}/>

        <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding:20, paddingBottom:100}}
        data={historyList}
        renderItem={({item}) => < HistoryItem history={item}/>}
        />

        <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Rooms')}>
        <Image style={{width:63, height:55}} resizeMode='contain' source={require('../img/rooms.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Chetchiki')}>
        <Image style={{width:40, height:46}} resizeMode='contain' source={require('../img/schet.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
        <Image style={{width:45, height:50}} resizeMode='contain' source={require('../img/history-active.png')} />
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
            padding:10,
            borderColor: 'silver',
            borderRadius:5,
            marginLeft:20,
            marginRight:20,
            width:'80%',
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
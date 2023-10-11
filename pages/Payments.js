import React from 'react';
import {useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, FlatList, Modal, TextInput, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PaymentsAdd from './FormPaymentsAdd';
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

export default function Payments({navigation}) {

    const getpayListFromUserDevice = async () => {
        try {
          const payList = await AsyncStorage.getItem('payList');
          if(payList !=null){
            setpay(JSON.parse(payList));
          }
        } catch (error) {
          console.log(error);
        }
      };
    
      const savepayListTouserDevice = async payList => {
        try {
          const stringifypayList = JSON.stringify(payList);
          await AsyncStorage.setItem('payList', stringifypayList);
        } catch (e) {
          console.log(e);
          // saving error
        }
      }


    function IsNumeric(num) {
        return ((num >0)&& (parseFloat(num)==num) );
      }
    const [addmodalWindow, setaddModalWindow] = useState(false);
    const [editmodalWindow, seteditModalWindow] = useState(false);
    const [textInputSum, setTextInputSum] = useState('');
    const [textInputNameRoom, setInputNameRoom] = useState('');
    const [textInputNameService, setInputNameService] = useState('');
    const [inputDate, setInputDate] = useState(new Date());
    var options = { year: 'numeric', month: 'numeric', day: 'numeric' };

    const [payList, setpay] = useState([
        /* {id:1, nameRooms:"test", date: '12-05-2023', service: "вывоз мусора", sum: '100.00' },
        {id:2, nameRooms:"test", date: '12-05-2023', service: "электричество", sum: '500.00' },
        {id:3, nameRooms:"test2", date: '12-05-2023', service: "газ", sum: '400.00' }, */
      ]);

      useEffect(()=> {
        getpayListFromUserDevice();
      },[])
      useEffect(()=> {
        savepayListTouserDevice(payList);
      }, [payList]);

      const addPayments = (pay) => {
        if (inputDate!=''){
        setpay((list) => {
            pay.id = Math.random().toString();
            pay.date = inputDate.toLocaleDateString("ru-RU");
          return [
            pay,
            ...list
          ]
        });
        setaddModalWindow(false);
        setInputDate(new Date())}
        else {
          {Alert.alert('Упс! Что-то пошло не так', 'Дата обязательна к заполнению. Необходимо ввести данные повторно.')}
        }
      }

      const deletePay = (payId) => { //удалить платеж
        const newPay = payList.filter(item => item.id != payId);
        setpay(newPay);
      };

      const editCounter = (payId) => { 

              
        if(textInputSum ==''|| !IsNumeric(textInputSum)){
         Alert.alert('Упс! Что-то пошло не так', 'Поле не может быть пустым или заполненно неверно.Формат ввода 37.50. Число должно быть больше 0. В поле указано '+ '"' + textInputSum + '"'  ); //проверка поля на пустоту
       }else{ 
       const newPay = payList.map((item)=>{
         if(item.id == payId){
           return {...item, sum:textInputSum};
         }
           return item;
       });
       setpay(newPay);
      
       setTextInputSum("");
     
     }}

      const PayItem = ({pay}) => {
        if( pay?.nameRooms == textInputNameRoom && textInputNameService == ''){
          return <View style={styles.listСounter}>
                  <View style={{flex:1}}>
                  <Text style={{fontWeight: 700, fontSize:14, color: '#000000'}}>
                  Дата платежа: {pay?.date}
                  </Text>
                  <Text style={{fontWeight: 700, fontSize:16, color: '#000000'}}>
                  Услуга: {pay?.service}
                  </Text>
                  <Text style={{fontWeight: 700, fontSize:12, color: '#000000'}}>
                  Сумма: {pay?.sum}
                  </Text>
                  </View>
                  <TouchableOpacity style={styles.actionIcon}  onPress={()=>  editCounter(pay?.id) } >
                  <Icon name="edit" size={25} color={'#fff'}/>
                  </TouchableOpacity> 
                  <TouchableOpacity style={[styles.actionIcon, {backgroundColor:'#FA8072'}]} onPress={()=> deletePay(pay?.id)}>
                  <Icon name="delete" size={25} color={'#fff'}/>
                  </TouchableOpacity>
          </View>
      }
      if( pay?.nameRooms == textInputNameRoom && pay?.service == textInputNameService){
        return <View style={styles.listСounter}>
                <View style={{flex:1}}>
                <Text style={{fontWeight: 700, fontSize:14, color: '#000000'}}>
                Дата платежа: {pay?.date}
                </Text>
                <Text style={{fontWeight: 700, fontSize:16, color: '#000000'}}>
                Услуга: {pay?.service}
                </Text>
                <Text style={{fontWeight: 700, fontSize:12, color: '#000000'}}>
                Сумма: {pay?.sum}
                </Text>
                </View>
                <TouchableOpacity style={styles.actionIcon}  onPress={()=>  editCounter(pay?.id) } >
                <Icon name="edit" size={25} color={'#fff'}/>
                </TouchableOpacity> 
                <TouchableOpacity style={[styles.actionIcon, {backgroundColor:'#FA8072'}]} onPress={()=> deletePay(pay?.id)}>
                <Icon name="delete" size={25} color={'#fff'}/>
                </TouchableOpacity>
        </View>
    }

      return  
    };
    

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
          <Text style={{fontWeight: 700, fontSize: 18, color: '#7E7D7D', textAlign: 'center', marginBottom:20,marginTop:40}}> Редактирование платежа</Text>
          <Text style={{fontWeight: 700, fontSize: 14, color: '#7E7D7D', textAlign: 'center', marginBottom:20,marginLeft:20, marginRight:20,width:'81%',}}> 
          Для редактирования заполните обязательно все поля, после чего нажмите назад, далее нажмите на значок редактирования напротив той записи, которую хотите изменить
          </Text>
          
          <TextInput placeholder="Изменить сумму платежа" style={styles.input}
          value={textInputSum}
          required
          onChangeText={(text)=> setTextInputSum(text)}/>
          
        </View>
      </Modal>   

      <Modal visible={addmodalWindow}>
      <View style={{flex:1, marginTop:30,alignItems:'stretch',}}>
        <View style={{position:'absolute', left:0}}>
        <TouchableOpacity style={[styles.actionIcon,{backgroundColor: '#fff',marginBottom:20, borderRadius:15,width:40, height:40, marginLeft:5}]} onPress={()=> setaddModalWindow(false)}>
        <Icon name="arrow-back" size={40} color={'#B4DBA6'} />
        </TouchableOpacity>
        </View>
          <Text style={{fontWeight: 700, fontSize: 18, color: '#7E7D7D', textAlign: 'center',marginTop:40}}> Добавление платежа</Text>
          <View style={{width: '80%',marginLeft:'auto',marginRight:'auto', marginTop:15,marginTop:45,}}>
          <DatePickerInput
          label="Дата платежа"
          value={inputDate}
          onChange={(d) => setInputDate(d)}
          style={{backgroundColor:'#B4DBA6'}}
          mode="flat"
          saveLabel="Сохранить"
          inputMode="start"
          presentationStyle="formSheet"
          />
          </View>
          
          <PaymentsAdd addPayments={addPayments}/>
        </View>
      </Modal>

        <View style={styles.header}>
        <Text style={{fontWeight: 700, fontSize: 20, color: '#7E7D7D',top:-4}}>МОЙ ЖКХ</Text>
        <TouchableOpacity onPress={()=> seteditModalWindow(true)}>
        <Text style={styles.headerButton}>Изм.</Text>
        </TouchableOpacity> 
        <TouchableOpacity onPress={()=> setaddModalWindow(true)}>
        <Text style={styles.headerButton}>Добавить платеж</Text>
        </TouchableOpacity>
        </View>

        <TextInput placeholder="Введите имя недвижимости" style={[styles.input, {width:'95%',marginLeft:'auto',marginRight:'auto',}]}
        value={textInputNameRoom}
        onChangeText={(text)=> setInputNameRoom(text)}/>

        <TextInput placeholder="Введите название услуги" style={[styles.input, {width:'95%',marginLeft:'auto',marginRight:'auto',}]}
        value={textInputNameService}
        onChangeText={(text)=> setInputNameService(text)}/>

        <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding:20, paddingBottom:100}}
        data={payList}
        renderItem={({item}) => < PayItem pay={item}/>}
        />


        <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Rooms')}>
        <Image style={{width:63, height:55}} resizeMode='contain' source={require('../img/rooms.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Chetchiki')}>
        <Image style={{width:40, height:46}} resizeMode='contain' source={require('../img/schet.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('History')}>
        <Image style={{width:45, height:50}} resizeMode='contain' source={require('../img/history.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
        <Image style={{width:37, height:47}} resizeMode='contain' source={require('../img/pay-active.png')} />
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
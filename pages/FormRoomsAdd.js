import React, {useState} from 'react';
import { StyleSheet, View, Button, TextInput, Alert, Text, TouchableOpacity } from 'react-native';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    nameRoom: Yup.string()
      .min(2, 'Слишком короткое название')
      .max(50, 'Слишко длинное название')
      .required('Введите название объекта'),
      adress: Yup.string()
      .min(10, 'Слишком короткий адрес')
      .max(50, 'Слишко длинный адрес')
      .required('Введите адрес объекта'),
      numberRegistered: Yup.number()
      .max(50, 'Слишко много жильцов')
      .required('обязательное числовое поле')
      .positive('число должно быть положительным')
      .typeError('значение должно целым числом 1, 2 и т.д.')
      .integer('значение должно целым числом 1, 2 и т.д.'),
      square: Yup.number()
      .max(10000, 'Слишко большая площадь')
      .required('обязательное числовое поле')
      .typeError('пример ввода:37.5')
      .positive('число должно быть положительным'),
      
      
  });

export default function RoomAdd({addRoom}) {

    return(
      <View >
          <Formik initialValues={{id: '', nameRoom:'', adress: '', numberRegistered: '', square:''}} validationSchema={SignupSchema} onSubmit={(values, action) => {
              addRoom(values);
              action.resetForm({addRoom});

             
          }}>
              {({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit})=> (                          //{(props)=> (

                  <View style={styles.form}>
                      <TextInput
                      style={styles.input}
                      value={values.nameRoom}
                       placeholder='введите название объекта'
                       onChangeText=
                       {handleChange('nameRoom')}/>
                        {
                            errors.nameRoom && (
                                <Text style={styles.errorTxt}>{errors.nameRoom}</Text>
                            )
                        }
                      <TextInput
                      style={styles.input}
                       value={values.adress}
                       multiline
                       placeholder='введите адрес'
                       onChangeText={handleChange('adress')} />
                        {
                            errors.adress && (
                                <Text style={styles.errorTxt}>{errors.adress}</Text>
                            )
                        }
                      <TextInput
                      style={styles.input}
                       value={values.numberRegistered}
                       placeholder='введите количество прописанных людей'
                       onChangeText={handleChange('numberRegistered')} />
                        {
                            errors.numberRegistered && (
                                <Text style={styles.errorTxt}>{errors.numberRegistered}</Text>
                            )
                        }
                      <TextInput
                      style={styles.input}
                       value={values.square}
                       placeholder='введите площадь недвижимости'
                       onChangeText={handleChange('square')} />
                        {
                            errors.square && (
                                <Text style={styles.errorTxt}>{errors.square}</Text>
                            )
                        }
                       <TouchableOpacity style={{ backgroundColor: isValid ? '#B4DBA6' : '#778899', marginTop:15}}
                       disabled={!isValid}
                       
                       onPress={handleSubmit}>
                       <Text style={styles.btnform}>ДОБАВИТЬ</Text>
                      </TouchableOpacity>
                  </View>
              )}
          </Formik>
      </View>
      
    );
  }
  
  
  const styles = StyleSheet.create({
    btnoblast:{
        flex:1,
        marginTop:15,},
    btnform:{
        paddingTop:8,
        textAlign:'center',
        height:40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        fontSize:16,
        color:'#fff',
    },
    errorTxt:{
        fontSize:14,
        color:'#FF0D10',
    },
  input: {
      borderWidth:1,
      marginTop:15,
      padding:10,
      borderColor: 'silver',
      borderRadius:5
  },
  form:{
    margin:20,
    justifyContent:'center',
    width:'90%',
    
  },
  });
import React, {useState} from 'react';
import { StyleSheet, View, Button, TextInput, Alert, Text, TouchableOpacity } from 'react-native';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {inputDate} from './History';

const SignupSchema = Yup.object().shape({
       flow: Yup.number()
       .positive('число должно быть положительным')
       .typeError('значение должно целым числом 1, 2 и т.д.')
       .integer('значение должно целым числом 1, 2 и т.д.'),
       /* date: Yup.date()
       .typeError('формат ввода дд-мм-гггг')
       .required('Введите дату фиксации показаний.Формат ввода дд-мм-гггг'),     */
       nameRooms:Yup.string()
       .min(2, 'Слишком короткое название')
       .max(50, 'Слишко длинное название')
       .required('Введите название объекта'),
       nameChetchik:Yup.string()
       .min(2, 'Слишком короткое название')
       .max(50, 'Слишко длинное название')
       .required('Введите имя счетчика'),
       readmeter: Yup.number()
       .required('обязательное числовое поле')
       .positive('число должно быть положительным')
       .typeError('значение должно целым числом 1, 2 и т.д.')
       .integer('значение должно целым числом 1, 2 и т.д.'),
  });

export default function HistoryAdd({addHistory}) {

    return(
      <View >
          <Formik initialValues={{id: '', nameRooms:'', date: '', readmeter: '', flow:'', nameChetchik:''}} validationSchema={SignupSchema} onSubmit={(values, action) => {
              addHistory(values);
              action.resetForm({addHistory});
          }}>
              {({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit})=> (                          //{(props)=> (

                  <View style={styles.form}>
                    <TextInput
                      style={styles.input}
                      value={values.nameRooms}
                       placeholder='введите название объекта'
                       onChangeText=
                       {handleChange('nameRooms')}/>
                        {
                            errors.nameRooms && (
                                <Text style={styles.errorTxt}>{errors.nameRooms}</Text>
                            )
                        }
                        <TextInput
                      style={styles.input}
                      value={values.nameChetchik}
                       placeholder='введите название счетчика'
                       onChangeText=
                       {handleChange('nameChetchik')}/>
                        {
                            errors.nameChetchik && (
                                <Text style={styles.errorTxt}>{errors.nameChetchik}</Text>
                            )
                        }
                      {/* <TextInput
                      style={styles.input}
                      value={values.date}
                       placeholder='введите дату фиксации показаний'
                       onChangeText=
                       {handleChange('date')}/>
                        {
                            errors.date && (
                                <Text style={styles.errorTxt}>{errors.date}</Text>
                            )
                        } */}
                      <TextInput
                      style={styles.input}
                       value={values.readmeter}
                       multiline
                       placeholder='введите показания счетчика'
                       onChangeText={handleChange('readmeter')} />
                        {
                            errors.readmeter && (
                                <Text style={styles.errorTxt}>{errors.readmeter}</Text>
                            )
                        }
                      <TextInput
                      style={styles.input}
                       value={values.flow}
                       placeholder='введите расход ресурса(необезательно)'
                       onChangeText={handleChange('flow')} />
                        {
                            errors.flow && (
                                <Text style={styles.errorTxt}>{errors.flow}</Text>
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
    marginTop:20,
    width:'80%',
    marginLeft:'auto',
    marginRight:'auto',
    
  },
  });
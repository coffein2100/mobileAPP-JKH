import React, {useState} from 'react';
import { StyleSheet, View, Button, TextInput, Alert, Text, TouchableOpacity } from 'react-native';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    service: Yup.string()
      .min(2, 'Слишком короткое название')
      .max(40, 'Слишко длинное название')
      .required('Введите название услуги'),
      date: Yup.date()
      .typeError('формат ввода дд-мм-гггг')
      .required('Введите дату платежа. Формат ввода дд-мм-гггг'),    
      nameRooms:Yup.string()
      .min(2, 'Слишком короткое название')
      .max(50, 'Слишко длинное название')
      .required('Введите название объекта'),
      sum: Yup.number()
      .max(1000000, 'Слишко большой платеж')
      .required('обязательное числовое поле. Пример ввода:37.50')
      .typeError('пример ввода:37.50')
      .positive('число должно быть положительным'),
  });

export default function PaymentsAdd({addPayments}) {

    return(
      <View >
          <Formik initialValues={{id: '', nameRooms:'', date: '', service: '', sum:''}} validationSchema={SignupSchema} onSubmit={(values, action) => {
              addPayments(values);
              action.resetForm({addPayments});

             
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
                      value={values.date}
                       placeholder='введите дату платежа'
                       onChangeText=
                       {handleChange('date')}/>
                        {
                            errors.date && (
                                <Text style={styles.errorTxt}>{errors.date}</Text>
                            )
                        }
                      <TextInput
                      style={styles.input}
                       value={values.service}
                       multiline
                       placeholder='введите название услуги'
                       onChangeText={handleChange('service')} />
                        {
                            errors.service && (
                                <Text style={styles.errorTxt}>{errors.service}</Text>
                            )
                        }
                      <TextInput
                      style={styles.input}
                       value={values.sum}
                       placeholder='введите сумму платежа'
                       onChangeText={handleChange('sum')} />
                        {
                            errors.sum && (
                                <Text style={styles.errorTxt}>{errors.sum}</Text>
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
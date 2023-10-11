import React, {useState} from 'react';
import { StyleSheet, View, Button, TextInput, Alert, Text, TouchableOpacity } from 'react-native';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    nameCounter: Yup.string()
      .min(2, 'Слишком короткое название')
      .max(40, 'Слишко длинное название')
      .required('Введите название счетчика'),
      /* datePoverka: Yup.date()
      .typeError('формат ввода дд-мм-гггг')
      .required('Введите дату поверки. Формат ввода дд-мм-гггг '), */
      regCounter: Yup.string()
      .min(2, 'Слишком короткий номер')
      .max(40, 'Слишко длинный номер')
      .required('Введите номер счетчика'),      
      nameRooms:Yup.string()
      .min(2, 'Слишком короткое название')
      .max(50, 'Слишко длинное название')
      .required('Введите название объекта'),
  });

export default function ChetchikiAdd({addChetchiki}) {

    return(
      <View >
          <Formik initialValues={{id: '', nameRooms:'', nameCounter: '', datePoverka: '', regCounter:''}} validationSchema={SignupSchema} onSubmit={(values, action) => {
              addChetchiki(values);
              action.resetForm({addChetchiki});

             
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
                      value={values.nameCounter}
                       placeholder='введите название счетчика'
                       onChangeText=
                       {handleChange('nameCounter')}/>
                        {
                            errors.nameCounter && (
                                <Text style={styles.errorTxt}>{errors.nameCounter}</Text>
                            )
                        }
                      {/* <TextInput
                      style={styles.input}
                       value={values.datePoverka}
                       multiline
                       placeholder='введите дату поверки'
                       onChangeText={handleChange('datePoverka')} />
                        {
                            errors.datePoverka && (
                                <Text style={styles.errorTxt}>{errors.datePoverka}</Text>
                            )
                        } */}
                      <TextInput
                      style={styles.input}
                       value={values.regCounter}
                       placeholder='введите регистрационный номер'
                       onChangeText={handleChange('regCounter')} />
                        {
                            errors.regCounter && (
                                <Text style={styles.errorTxt}>{errors.regCounter}</Text>
                            )
                        }
                      {/* <TextInput
                      style={styles.input}
                       value={values.square}
                       placeholder='введите площадь недвижимости'
                       onChangeText={handleChange('square')} />
                        {
                            errors.square && (
                                <Text style={styles.errorTxt}>{errors.square}</Text>
                            )
                        } */}
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
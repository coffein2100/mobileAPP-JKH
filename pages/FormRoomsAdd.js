import React, {useState} from 'react';
import { StyleSheet, View, Button, TextInput, Alert, Text, TouchableOpacity } from 'react-native';
import { Formik, Form, Field,useFormik  } from 'formik';
import * as Yup from 'yup';
import { Dropdown } from 'react-native-element-dropdown';

const SignupSchema = Yup.object().shape({
    nameRoom: Yup.string()
      .min(2, 'Слишком короткое название')
      .max(50, 'Слишко длинное название')
      .required('Введите название объекта'),
      adress: Yup.string()
      .min(10, 'Слишком короткий адрес')
      .max(50, 'Слишко длинный адрес')
      .required('Введите адрес объекта'),
      /*   numberRegistered: Yup.string()  */
      /* .min(0, 'значение должно быть от 0 и более')
      .max(50, 'Слишко много жильцов') */
      /*   .required('обязательное поле для заполнения'),   */
      /* .positive('число должно быть положительным') */
      /* .typeError('значение должно целым числом 1, 2 и т.д.')
      .integer('значение должно целым числом 1, 2 и т.д.'), */ 
      square: Yup.number()
      .max(10000, 'Слишко большая площадь')
      .required('обязательное числовое поле')
      .typeError('пример ввода:37.5')
      .positive('число должно быть от 0 и более'),
      
      
  });



export default function RoomAdd({addRoom}) {

/*   const countRegForm = [
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

  const [value, setValue] = useState(null); */

    return(
      <View >
          <Formik initialValues={{id: '', nameRoom:'', adress: '', numberRegistered: '', square:'',}} validationSchema={SignupSchema} onSubmit={(values, action) => {
              addRoom(values);
              action.resetForm({addRoom});
              
          }}>
              {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit,})=> (                          //{(props)=> (

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
                    {/*   <TextInput
                      style={styles.input}
                       value={values.numberRegistered}
                       placeholder='введите количество прописанных людей'
                       onChangeText={handleChange('numberRegistered')} />
                        {
                            errors.numberRegistered && (
                                <Text style={styles.errorTxt}>{errors.numberRegistered}</Text>
                            )
                        } */}

{/*         <Dropdown
        style={[styles.dropdown,{marginLeft:'auto', marginRight:'auto', width:'100%'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={countRegForm}
        search
        labelField="label"
        valueField="value"
        placeholder="Количество прописанных"
        searchPlaceholder="Поиск..."
        value={value}
        onChange={item => {
          setValue(item.value);
          console.log(value);
          values.numberRegistered=value;
        }}  */}
        

                          {/* {
                            errors.numberRegistered && (
                                <Text style={styles.errorTxt}>{errors.numberRegistered}</Text>
                            )
                        }   */}
         

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
    marginTop:20,
    width:'80%',
    marginLeft:'auto',
    marginRight:'auto',
    
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
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-web';
import { ref, set, update, onValue, remove, Database } from "firebase/database";
import {db} from './components/config';

export default function App() {


  const [nomeUsuario,setNome] = useState('');
  const [email,setEmail]= useState(''); 
function create(){
  set(ref(db, 'users/' + nomeUsuario
  ), {
    username: nomeUsuario,
    email: email
  }).then(()=>{
    //Registro Salvo 
    alert('Registrado');
  }).catch((error)=>{
    //Falha no registro
    alert(error);
  }) ;
};


function update(){
  set(ref(db, 'users/' + nomeUsuario
  ), {
    username: nomeUsuario,
    email: email
  }).then(()=>{
    //Registro Atualizado 
    alert('Registrado Atualizado');
  }).catch((error)=>{
    //Falha no registro
    alert(error);
  }) ;
};


function readData(){
  const starCountRef = ref(db, 'users/'+ nomeUsuario);
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
setEmail(data.email);
 
});


}

function deleteData(){
  remove(ref(db,'users/'+nomeUsuario));
  alert('Registro deletado');
}
  return (
    <View style={styles.container}>
      <Text>Firebase CRUD</Text>
      <TextInput value={nomeUsuario} onChangeText={(nomeUsuario)=> {setNome(nomeUsuario)}} placeholder='nomeUsuario' style={styles.textBoxes}></TextInput>
      <TextInput value={email} onChangeText={(email)=> {setEmail(email)}} placeholder='email' style={styles.textBoxes}></TextInput>

      <button onClick={create}> Enviar </button>
      <button onClick={update}> Atualizar </button>
      <button onClick={readData}> Procurar Email </button>
      <button onClick={deleteData}> Deletar Usuario </button>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textBoxes:{
    width:'90%',
    fontSize:18,
    padding:12,
    borderColor:'gray',
    borderWidth:0.2,
    borderRadius:10
  }
});

import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Picker } from 'react-native';
import { ref, set, update, onValue, remove } from "firebase/database";
import { db } from './components/config';

const estadosBrasileiros = [
  { estado: 'Acre', ddd: '68' },
  { estado: 'Alagoas', ddd: '82' },
  { estado: 'Amapá', ddd: '96' },
  { estado: 'Amazonas', ddd: '92' },
  { estado: 'Bahia', ddd: '71' },
  { estado: 'Ceará', ddd: '85' },
  { estado: 'Distrito Federal', ddd: '61' },
  { estado: 'Espírito Santo', ddd: '27' },
  { estado: 'Goiás', ddd: '62' },
  { estado: 'Maranhão', ddd: '98' },
  { estado: 'Mato Grosso', ddd: '65' },
  { estado: 'Mato Grosso do Sul', ddd: '67' },
  { estado: 'Minas Gerais', ddd: '31' },
  { estado: 'Pará', ddd: '91' },
  { estado: 'Paraíba', ddd: '83' },
  { estado: 'Paraná', ddd: '41' },
  { estado: 'Pernambuco', ddd: '81' },
  { estado: 'Piauí', ddd: '86' },
  { estado: 'Rio de Janeiro', ddd: '21' },
  { estado: 'Rio Grande do Norte', ddd: '84' },
  { estado: 'Rio Grande do Sul', ddd: '51' },
  { estado: 'Rondônia', ddd: '69' },
  { estado: 'Roraima', ddd: '95' },
  { estado: 'Santa Catarina', ddd: '48' },
  { estado: 'São Paulo', ddd: '11' },
  { estado: 'Sergipe', ddd: '79' },
  { estado: 'Tocantins', ddd: '63' },
];

export default function App() {
  const [nomeUsuario, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [ddd, setDdd] = useState('');  // Agora será um valor selecionado
  const [telefone, setTelefone] = useState('');
  const [logradouro, setLogradouro] = useState('');

  // Função para criar o usuário
  function create() {
    if (!nomeUsuario || !email || !ddd || !telefone || !logradouro) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    set(ref(db, 'users/' + nomeUsuario), {
      username: nomeUsuario,
      email: email,
      ddd: ddd,
      telefone: telefone,
      logradouro: logradouro,
    })
      .then(() => {
        // Registro salvo
        Alert.alert('Sucesso', 'Usuário registrado com sucesso!');
      })
      .catch((error) => {
        // Falha no registro
        Alert.alert('Erro', error.message);
      });
  }

  // Função para atualizar os dados do usuário
  function update() {
    if (!nomeUsuario || !email || !ddd || !telefone || !logradouro) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    update(ref(db, 'users/' + nomeUsuario), {
      username: nomeUsuario,
      email: email,
      ddd: ddd,
      telefone: telefone,
      logradouro: logradouro,
    })
      .then(() => {
        // Registro atualizado
        Alert.alert('Sucesso', 'Usuário atualizado com sucesso!');
      })
      .catch((error) => {
        // Falha na atualização
        Alert.alert('Erro', error.message);
      });
  }

  // Função para buscar os dados do usuário
  function readData() {
    const starCountRef = ref(db, 'users/' + nomeUsuario);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setEmail(data.email);
        setDdd(data.ddd);
        setTelefone(data.telefone);
        setLogradouro(data.logradouro);
      } else {
        Alert.alert("Erro", "Usuário não encontrado!");
      }
    });
  }

  // Função para deletar o usuário
  function deleteData() {
    remove(ref(db, 'users/' + nomeUsuario))
      .then(() => {
        Alert.alert('Sucesso', 'Usuário deletado com sucesso!');
      })
      .catch((error) => {
        Alert.alert('Erro', error.message);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>

      <TextInput
        value={nomeUsuario}
        onChangeText={setNome}
        placeholder="Nome de Usuário"
        style={styles.textBoxes}
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.textBoxes}
      />
      
      <Text style={styles.textLabel}>Selecione o DDD</Text>
      <Picker
        selectedValue={ddd}
        onValueChange={setDdd}
        style={styles.picker}
      >
        {estadosBrasileiros.map((estado, index) => (
          <Picker.Item key={index} label={`${estado.estado} (${estado.ddd})`} value={estado.ddd} />
        ))}
      </Picker>

      <TextInput
        value={telefone}
        onChangeText={setTelefone}
        placeholder="Telefone"
        style={styles.textBoxes}
        keyboardType="numeric"
      />
      <TextInput
        value={logradouro}
        onChangeText={setLogradouro}
        placeholder="Logradouro"
        style={styles.textBoxes}
      />

      <View style={styles.buttonsContainer}>
        <Button title="Cadastrar" onPress={create} color="#4CAF50" />
        <Button title="Atualizar" onPress={update} color="#FF9800" />
        <Button title="Buscar" onPress={readData} color="#2196F3" />
        <Button title="Deletar" onPress={deleteData} color="#F44336" />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  textBoxes: {
    width: '90%',
    fontSize: 18,
    padding: 14,
    borderColor: '#ccc',
    borderWidth: 1.5,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  picker: {
    width: '90%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1.5,
    borderRadius: 15,
    marginBottom: 20,
  },
  textLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  buttonsContainer: {
    width: '90%',
    marginTop: 20,
    gap: 15,
  },
});

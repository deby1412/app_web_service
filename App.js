import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TouchableOpacity, 
  ScrollView, SafeAreaView, StatusBar 
} from 'react-native';

export default function App() {
  const [resultado, setResultado] = useState('Selecione um método HTTP acima para testar a API do JSONPlaceholder.');

  async function testarGet() {
    try {
      setResultado('Carregando GET...');
      const resposta = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      const dados = await resposta.json();
      setResultado('GET Realizado com Sucesso:\n\n' + JSON.stringify(dados, null, 2));
    } catch (e) {
      setResultado('Erro ao executar o GET.');
    }
  }

  async function testarPost() {
    try {
      setResultado('Enviando POST...');
      const resposta = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          title: 'Estudando React Native',
          body: 'Aprendendo sobre Web Services e métodos HTTP na aula do Filipe.',
          userId: 1,
        }),
      });
      const dados = await resposta.json();
      setResultado('POST Realizado com Sucesso (Criado):\n\n' + JSON.stringify(dados, null, 2));
    } catch (e) {
      setResultado('Erro ao executar o POST.');
    }
  }

  async function testarPut() {
    try {
      setResultado('Enviando PUT...');
      const resposta = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          id: 1,
          title: 'Título Substituído (PUT)',
          body: 'Todo o conteúdo anterior foi substituído.',
          userId: 1,
        }),
      });
      const dados = await resposta.json();
      setResultado('PUT Realizado com Sucesso (Substituído):\n\n' + JSON.stringify(dados, null, 2));
    } catch (e) {
      setResultado('Erro ao executar o PUT.');
    }
  }

  async function testarPatch() {
    try {
      setResultado('Enviando PATCH...');
      const resposta = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          title: 'Apenas o Título Atualizado (PATCH)',
        }),
      });
      const dados = await resposta.json();
      setResultado('PATCH Realizado com Sucesso (Parcial):\n\n' + JSON.stringify(dados, null, 2));
    } catch (e) {
      setResultado('Erro ao executar o PATCH.');
    }
  }

  async function testarDelete() {
    try {
      setResultado('Enviando DELETE...');
      const resposta = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'DELETE',
      });
      
      if (resposta.ok) {
        setResultado('DELETE Realizado com Sucesso!\n\nO post ID 1 foi removido do servidor (Status HTTP: 200/204).');
      } else {
        setResultado('Falha ao remover o registo.');
      }
    } catch (e) {
      setResultado('Erro ao executar o DELETE.');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Web Services & HTTP</Text>
        <Text style={styles.headerSubtitle}>JSONPlaceholder</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Escolha o Método HTTP:</Text>

        <View style={styles.botoesContainer}>
          <TouchableOpacity style={[styles.botao, styles.btnGet]} onPress={testarGet}>
            <Text style={styles.textoBotao}>GET (Buscar)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.botao, styles.btnPost]} onPress={testarPost}>
            <Text style={styles.textoBotao}>POST (Criar)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.botao, styles.btnPut]} onPress={testarPut}>
            <Text style={styles.textoBotao}>PUT (Substituir)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.botao, styles.btnPatch]} onPress={testarPatch}>
            <Text style={styles.textoBotao}>PATCH (Atualizar Parcial)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.botao, styles.btnDelete]} onPress={testarDelete}>
            <Text style={styles.textoBotao}>DELETE (Remover)</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Retorno da Requisição:</Text>
        <View style={styles.resultadoBox}>
          <Text style={styles.resultadoTexto}>{resultado}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: '#262626',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#f0f0f0',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
  scrollContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#bbb',
    marginBottom: 10,
  },
  botoesContainer: {
    gap: 12,
    marginBottom: 24,
  },
  botao: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnGet: { backgroundColor: '#2f855a' },
  btnPost: { backgroundColor: '#3182ce' },
  btnPut: { backgroundColor: '#d69e2e' },
  btnPatch: { backgroundColor: '#805ad5' },
  btnDelete: { backgroundColor: '#e53e3e' },
  textoBotao: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  resultadoBox: {
    backgroundColor: '#262626',
    padding: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#333',
    minHeight: 150,
  },
  resultadoTexto: {
    color: '#68d391',
    fontFamily: 'monospace',
    fontSize: 13,
  },
});
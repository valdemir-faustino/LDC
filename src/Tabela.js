import React, { useState } from 'react';
import "./Tabela.css";
import { cpf as validarCpf } from 'cpf-cnpj-validator';

function TabelaDados() {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [nacionalidade, setNacionalidade] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [pai, setPai] = useState('');
  const [mae, setMae] = useState('');
  const [dados, setDados] = useState([]);

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleIdadeChange = (event) => {
    setIdade(event.target.value);
  };

  const handleNacionalidadeChange = (event) => {
    setNacionalidade(event.target.value);
  };

  const handleCpfChange = (event) => {
    setCpf(event.target.value);
  };

  const handleDataNascimentoChange = (event) => {
    setDataNascimento(event.target.value);

    // Calcula a idade com base na data de nascimento
    const dataAtual = new Date();
    const dataNasc = new Date(event.target.value);
    const diffAnos = Math.floor((dataAtual - dataNasc) / (1000 * 60 * 60 * 24 * 365));
    setIdade(diffAnos);
  };

  const handlePaiChange = (event) => {
    setPai(event.target.value);
  };

  const handleMaeChange = (event) => {
    setMae(event.target.value);
  };

  const handleInserirClick = () => {
    // Verifica se o CPF já existe nos dados existentes
    const cpfExists = dados.some((dado) => dado.cpf === cpf);
    if (cpfExists) {
      alert('CPF já existe na tabela. Insira um CPF único.');
      return;
    }

    // Verifica a validade do CPF inserido
    if (!validarCpf.isValid(cpf)) {
      alert('CPF inválido. Insira um CPF válido.');
      return;
    }

    const novoDado = { cpf, nome, idade, nacionalidade, dataNascimento, pai, mae };
    setDados([...dados, novoDado]);
    setNome('');
    setIdade('');
    setNacionalidade('');
    setCpf('');
    setDataNascimento('');
    setPai('');
    setMae('');
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Nacionalidade</th>
            <th>CPF</th>
            <th>Dt-Nascimento</th>
            <th>Pai</th>
            <th>Mae</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((dado, index) => (
            <tr key={dado.cpf}>
              <td>{dado.nome}</td>
              <td>{dado.idade}</td>
              <td>{dado.nacionalidade}</td>
              <td>{dado.cpf}</td>
              <td>{dado.dataNascimento}</td>
              <td>{dado.pai}</td>
              <td>{dado.mae}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <input
        type="text"
        value={nome}
        onChange={handleNomeChange}
        placeholder="Nome"
      />
      <input
        type="text"
        value={idade}
        onChange={handleIdadeChange}
        placeholder="Idade"
      />
      <input
        type="text"
        value={nacionalidade}
        onChange={handleNacionalidadeChange}
        placeholder="Naturalidade"
      />
      <input
        type="text"
        value={cpf}
        onChange={handleCpfChange}
        placeholder="CPF"
      />
      <input
        type="date"
        value={dataNascimento}
        onChange={handleDataNascimentoChange}
        placeholder="Dt-Nascimento"
      />
      <input
        type="text"
        value={pai}
        onChange={handlePaiChange}
        placeholder="Pai"
      />
      <input
        type="text"
        value={mae}
        onChange={handleMaeChange}
        placeholder="Mae"
      />
      <button onClick={handleInserirClick}>Cadastrar jogador</button>
    </div>
  );
}

export default TabelaDados;
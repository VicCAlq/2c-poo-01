/*
Assunto - Objetos e Métodos em JavaScript

Um objeto em JavaScript é uma estrutura que nos permite agrupar dados e 
funcionalidades relacionadas em uma única entidade. Diferente de outras 
linguagens, JavaScript não exige o uso de classes para criar objetos - podemos 
criá-los de forma direta e literal.

O princípio fundamental de um objeto é armazenar informações em pares de 
"chave: valor", onde a chave é o nome da propriedade e o valor pode ser qualquer 
tipo de dado: número, string, booleano, lista, outro objeto, ou até mesmo uma 
função.

A sintaxe básica para criar um objeto literal é:

const meuObjeto = {
  propriedade1: valor1,
  propriedade2: valor2
}

Vamos entender com exemplos práticos:

1. Criando um objeto simples com propriedades:

const pessoa = {
  nome: "Carlos",
  idade: 28,
  cidade: "São Paulo"
}

console.log(pessoa.nome)      // "Carlos"
console.log(pessoa.idade)     // 28

- O código acima cria um objeto pessoa com três propriedades
- Acessamos os valores usando a notação de ponto: objeto.propriedade

2. Criando um objeto com métodos (funções dentro do objeto):

const calculadora = {
  valorAtual: 0,
  
  somar: function(numero) {
    this.valorAtual = this.valorAtual + numero
  },
  
  subtrair: function(numero) {
    this.valorAtual = this.valorAtual - numero
  },
  
  obterValor: function() {
    return this.valorAtual
  }
}

calculadora.somar(10)
calculadora.somar(5)
calculadora.subtrair(3)
console.log(calculadora.obterValor())  // 12

- O código acima demonstra o conceito de "métodos": funções que pertencem a um 
  objeto
- Usamos "this" para referenciar o próprio objeto dentro de seus métodos
- "this.valorAtual" acessa a propriedade valorAtual do objeto calculadora

3. Entendendo o conceito de "this" (self para quem estudou Python):

const carro = {
  marca: "Toyota",
  modelo: "Corolla",
  ano: 2023,
  
  descrever: function() {
    return this.marca + " " + this.modelo + " " + this.ano
  },
  
  envelhecer: function() {
    this.ano = this.ano - 1
  }
}

console.log(carro.descrever())  // "Toyota Corolla 2023"
carro.envelhecer()
console.log(carro.descrever())  // "Toyota Corolla 2022"

- "this" funciona como uma referência ao próprio objeto (self para quem estudou Python)
- Dentro do método descrever(), this.marca é o mesmo que carro.marca
- Dentro do método envelhecer(), ao modificar this.ano, modificamos carro.ano

4. Métodos que interagem com múltiplas propriedades:

const contaBancaria = {
  titular: "Maria Silva",
  saldo: 1000,
  limiteCredito: 500,
  
  depositar: function(valor) {
    this.saldo = this.saldo + valor
    return "Depósito realizado. Novo saldo: " + this.saldo
  },
  
  sacar: function(valor) {
    const saldoDisponivel = this.saldo + this.limiteCredito
    
    if (valor <= saldoDisponivel) {
      this.saldo = this.saldo - valor
      return "Saque realizado. Novo saldo: " + this.saldo
    } else {
      return "Saldo insuficiente"
    }
  },
  
  consultarSaldo: function() {
    return this.titular + " possui saldo de R$" + this.saldo
  }
}

console.log(contaBancaria.consultarSaldo())
// "Maria Silva possui saldo de R$1000"

console.log(contaBancaria.depositar(500))
// "Depósito realizado. Novo saldo: 1500"

console.log(contaBancaria.sacar(1800))
// "Saque realizado. Novo saldo: -300"

console.log(contaBancaria.sacar(1000))
// "Saldo insuficiente" (excede saldo + limite)

- O método sacar() acessa múltiplas propriedades do objeto (saldo e limiteCredito)
- Usamos this para ler e modificar o estado interno do objeto

5. Objetos com propriedades que são outros objetos:

const empresa = {
  nome: "Tech Solutions",
  endereco: {
    rua: "Av. Principal",
    numero: 100,
    cidade: "Rio de Janeiro"
  },
  fundadores: ["Ana", "Bruno"],
  
  obterLocalizacao: function() {
    return this.nome + " fica em " + this.endereco.cidade
  },
  
  adicionarFundador: function(nome) {
    this.fundadores.push(nome)
  }
}

console.log(empresa.obterLocalizacao())
// "Tech Solutions fica em Rio de Janeiro"

empresa.adicionarFundador("Carlos")
console.log(empresa.fundadores)
// ["Ana", "Bruno", "Carlos"]

- Propriedades podem conter objetos aninhados (endereco)
- Propriedades podem conter arrays (fundadores)
- Métodos podem manipular essas estruturas complexas usando this

6. Criando objetos dinamicamente com funções fabrica:

function criarUsuario(nome, email) {
  return {
    nome: nome,
    email: email,
    dataCriacao: new Date(),
    
    alterarEmail: function(novoEmail) {
      this.email = novoEmail
    },
    
    obterInfo: function() {
      return this.nome + " - " + this.email
    }
  }
}

const usuario1 = criarUsuario("João", "joao@email.com")
const usuario2 = criarUsuario("Pedro", "pedro@email.com")

console.log(usuario1.obterInfo())  // "João - joao@email.com"
console.log(usuario2.obterInfo())  // "Pedro - pedro@email.com"

usuario1.alterarEmail("joao.novo@email.com")
console.log(usuario1.obterInfo())  // "João - joao.novo@email.com"

- Funções podem retornar objetos completos
- Cada chamada cria um objeto independente com suas próprias propriedades e 
  métodos
- Cada objeto tem seu próprio contexto de "this"

7. Métodos que retornam novos objetos:

const biblioteca = {
  livros: [],
  
  adicionarLivro: function(titulo, autor) {
    const novoLivro = {
      titulo: titulo,
      autor: autor,
      disponivel: true,
      
      emprestar: function() {
        if (this.disponivel) {
          this.disponivel = false
          return "Livro emprestado com sucesso"
        }
        return "Livro já está emprestado"
      },
      
      devolver: function() {
        this.disponivel = true
        return "Livro devolvido com sucesso"
      }
    }
    
    this.livros.push(novoLivro)
    return novoLivro
  },
  
  listarDisponiveis: function() {
    const disponiveis = []
    for (let i = 0; i < this.livros.length; i++) {
      if (this.livros[i].disponivel) {
        disponiveis.push(this.livros[i].titulo)
      }
    }
    return disponiveis
  }
}

const livro1 = biblioteca.adicionarLivro("O Senhor dos Anéis", "Tolkien")
const livro2 = biblioteca.adicionarLivro("1984", "Orwell")

console.log(livro1.emprestar())  // "Livro emprestado com sucesso"
console.log(livro1.emprestar())  // "Livro já está emprestado"
console.log(livro1.devolver())   // "Livro devolvido com sucesso"

console.log(biblioteca.listarDisponiveis())
// ["O Senhor dos Anéis", "1984"] (ambos disponíveis após devolução)

- Objetos podem criar e armazenar outros objetos
- Cada livro criado tem seus próprios métodos (emprestar, devolver)
- O método listarDisponiveis() acessa o array de livros do objeto biblioteca

8. Encadeamento de métodos (method chaining):

const construtorString = {
  valor: "",
  
  adicionar: function(texto) {
    this.valor = this.valor + texto
    return this  // Retorna o próprio objeto para permitir encadeamento
  },
  
  maiusculas: function() {
    this.valor = this.valor.toUpperCase()
    return this
  },
  
  obterValor: function() {
    return this.valor
  }
}

const resultado = construtorString
  .adicionar("Olá")
  .adicionar(" ")
  .adicionar("mundo")
  .maiusculas()
  .obterValor()

console.log(resultado)  // "OLÁ MUNDO"

- Retornar "this" permite encadear chamadas de métodos
- Cada método modifica o estado e retorna o objeto para a próxima operação

Pontos importantes sobre objetos e métodos:

- "this" sempre se refere ao objeto que está executando o método atual
- Métodos podem ler, modificar e adicionar propriedades ao objeto
- Objetos podem conter qualquer tipo de dado, incluindo outros objetos e arrays
- A notação de ponto (objeto.propriedade) é a forma mais comum de acesso
- Também podemos usar notação de colchetes: objeto["propriedade"]
- Métodos são funções associadas a um objeto e têm acesso ao seu estado interno
- Objetos literais são a forma mais direta de criar estruturas de dados em 
  JavaScript, sem necessidade de classes ou construtores complexos
*/

/*
Questões 01 a 12: Objetos
MÍNIMO NECESSÁRIO PARA NOTA MÁXIMA: 9 questões
*/

/* Questão 1
Crie um objeto chamado `aluno` com as seguintes propriedades:
- nome: string com seu nome
- idade: número com sua idade
- cidade: string com sua cidade
- curso: string com o nome do curso que está fazendo
Em seguida, armazene na variável resposta1 apenas o valor da propriedade nome do objeto aluno.
*/
// Escreva o código da solução abaixo:
let pessoa = {

  nome:"Henrique",
  idade: 16,
  cidade: "recife",
  curso: "programaçao"
}

export const resposta1 = pessoa.nome

  /* Questão 2
Crie um objeto chamado `produto` que represente um produto de uma loja com:
- nome: "Notebook"
- preco: 3500
- quantidadeEstoque: 15
- categoria: "Eletrônicos"
Em seguida, crie uma variável chamada `valorTotalEstoque` que calcule o valor total do estoque (preço × quantidade).
Armazene na variável resposta2 o valor total do estoque.
*/
// Escreva o código da solução abaixo:
let produto = { 
nome: "Notebook",
preco: 3500,
quantidadeEstoque: 15,
categoria: "Eletrônicos",
}
let valorTotaleEstoque = produto.preco * produto.quantidadeEstoque
  
export const resposta2 =(valorTotaleEstoque)


/* Questão 3
Crie um objeto chamado `filme` com as propriedades:
- titulo: "O Poderoso Chefão"
- ano: 1972
- diretor: "Francis Ford Coppola"
- genero: "Drama"
- disponivelStreaming: true
Em seguida, altere o valor da propriedade disponivelStreaming para false e adicione uma nova propriedade chamada `nota` com o valor 9.5.
Armazene na variável resposta3 um array contendo todas as chaves (nomes das propriedades) do objeto filme usando Object.keys().
*/
// Escreva o código da solução abaixo:
let filme = {
titulo: "O Poderoso Chefão",
ano: 1972,
diretor: "Francis Ford Coppola",
genero: "Drama",
disponivelStreaming: false,
nota: 9.5
}

export const resposta3 = Object.keys(filme)

/* Questão 4
Crie um objeto chamado `configuracoes` com as seguintes propriedades aninhadas:
- tema: { modo: "escuro", corPrincipal: "#333" }
- notificacoes: { email: true, push: false, sms: true }
- idioma: "pt-BR"
Armazene na variável resposta4 um novo objeto contendo apenas as configurações de notificação que estão ativadas (valor true).
O resultado deve ser um objeto no formato: { email: true, sms: true }
*/
// Escreva o código da solução abaixo:

export const resposta4 = false

/* Questão 5
Crie um objeto chamado `contador` com:
- valor: 0
- incrementar: método que aumenta valor em 1
- decrementar: método que diminui valor em 1
- obterValor: método que retorna o valor atual
Execute os seguintes passos:
1. Chame incrementar() 3 vezes
2. Chame decrementar() 1 vez
3. Armazene na variável resposta5 o resultado de obterValor()
*/
// Escreva o código da solução abaixo:

export const resposta5 = false

/* Questão 6
Crie um objeto chamado `termometro` com:
- temperaturaCelsius: 25
- converterParaFahrenheit: método que converte a temperatura atual de Celsius para Fahrenheit usando a fórmula: (C × 9/5) + 32
- definirTemperatura: método que recebe um valor e define temperaturaCelsius
- obterTemperatura: método que retorna a temperatura atual em Celsius com a string "°C"
Execute:
1. Chame converterParaFahrenheit() e guarde o resultado em uma variável tempF
2. Chame definirTemperatura(100)
3. Armazene na variável resposta6 um objeto no formato: { fahrenheit: tempF, celsius: resultado de obterTemperatura() }
*/
// Escreva o código da solução abaixo:

export const resposta6 = false

/* Questão 7
Crie um objeto chamado `carrinho` que represente um carrinho de compras com:
- itens: array vazio
- adicionarItem: método que recebe nome e preço, cria um objeto {nome, preco} e adiciona ao array itens
- calcularTotal: método que soma todos os preços dos itens e retorna o total
- quantidadeItens: método que retorna quantos itens existem no carrinho
Execute:
1. Adicione os itens: {nome: "Camiseta", preco: 50} e {nome: "Calça", preco: 120}
2. Armazene na variável resposta7 um objeto com: { total: resultado de calcularTotal(), quantidade: resultado de quantidadeItens() }
*/
// Escreva o código da solução abaixo:

export const resposta7 = false

/* Questão 8
Crie um objeto chamado `jogador` que represente um personagem de jogo com:
- nome: "Herói"
- vida: 100
- nivel: 1
- experiencia: 0
- atacar: método que recebe dano e diminui a vida (não deixe a vida ficar negativa, mínimo é 0)
- ganharExperiencia: método que recebe xp e adiciona à experiência. Se experiência >= 100, aumenta nivel em 1 e zera experiencia
- status: método que retorna uma string: "[nome] - Nível [nivel] - Vida: [vida] - XP: [experiencia]"
Execute:
1. Chame atacar(30)
2. Chame ganharExperiencia(50)
3. Chame ganharExperiencia(60) (isso deve fazer subir de nível)
4. Armazene na variável resposta8 o resultado de status()
*/
// Escreva o código da solução abaixo:

export const resposta8 = false

export const ingredientes = [ 
  "farinha", "ovos", "leite", "açúcar", "manteiga", "chocolate", 
  "fermento", "sal", "queijo", "presunto", "tomate", "cebola", 
  "alho", "óleo", "frango" 
]

/* Questão 9
Utilize a lista de ingredientes acima para as próximas questões

Crie um objeto chamado `receitaBolo` que represente uma receita de bolo de chocolate com:
- nome: "Bolo de Chocolate"
- porcoes: 8
- ingredientes: array com os ingredientes necessários (use apenas da lista acima)
- tempoPreparo: 45 (minutos)
- tempoForno: 30 (minutos)
- listarIngredientes: método que retorna uma string com todos os ingredientes separados por vírgula
- calcularTempoTotal: método que retorna tempoPreparo + tempoForno
Armazene na variável resposta9 o resultado de calcularTempoTotal().
*/
// Escreva o código da solução abaixo:

export const resposta9 = false

/* Questão 10
Usando a mesma lista de ingredientes do exercício anterior (farinha, ovos, leite, açúcar, manteiga, chocolate, fermento, sal, queijo, presunto, tomate, cebola, alho, óleo, frango).

Crie um objeto chamado `receitaOmelete` que represente uma receita de omelete com:
- nome: "Omelete de Queijo"
- porcoes: 1
- ingredientes: array com os ingredientes necessários (use apenas da lista acima)
- tempoPreparo: 5 (minutos)
- tempoCozimento: 5 (minutos)
- adicionarIngrediente: método que recebe um ingrediente e adiciona ao array (verifique se o ingrediente está na lista permitida antes de adicionar)
- calcularTempoTotal: método que retorna tempoPreparo + tempoCozimento
Execute:
1. Adicione o ingrediente "salsicha" (não deve ser adicionado pois não está na lista)
2. Adicione o ingrediente "presunto" (deve ser adicionado)
3. Armazene na variável resposta10 um objeto com: { tempoTotal: resultado de calcularTempoTotal(), quantidadeIngredientes: tamanho do array de ingredientes }
*/
// Escreva o código da solução abaixo:

export const resposta10 = false

/* Questão 11
Usando a mesma lista de ingredientes dos exercícios anteriores.

Crie um objeto chamado `livroReceitas` que funcione como um livro de receitas com:
- receitas: array vazio
- adicionarReceita: método que recebe um objeto receita e adiciona ao array
- buscarReceitaPorNome: método que recebe um nome e retorna a receita encontrada ou null se não existir
- listarTodasReceitas: método que retorna um array com apenas os nomes de todas as receitas
- filtrarPorIngrediente: método que recebe um ingrediente e retorna todas as receitas que contêm esse ingrediente

Primeiro, crie dois objetos de receita:
- `strogonoff`: nome "Strogonoff de Frango", ingredientes: frango, cebola, alho, manteiga, creme de leite (use apenas ingredientes da lista: frango, cebola, alho, manteiga), tempo: 40 minutos
- `macarrao`: nome "Macarrão com Queijo", ingredientes: macarrão não está na lista, então use: queijo, manteiga, sal, tempo: 20 minutos

Adicione ambas ao livro de receitas usando adicionarReceita().
Armazene na variável resposta11 o resultado de filtrarPorIngrediente("manteiga") (deve retornar as receitas que usam manteiga).
*/
// Escreva o código da solução abaixo:

export const resposta11 = false

/* Questão 12
Usando a mesma lista de ingredientes dos exercícios anteriores.

Crie um objeto chamado `cozinheiro` que represente um chef com:
- nome: string (defina no momento da criação)
- especialidade: string (defina no momento da criação)
- receitasCriadas: array vazio
- criarReceita: método que recebe nome da receita, array de ingredientes e tempo, cria um objeto receita e adiciona a receitasCriadas. Use apenas ingredientes da lista permitida, ignorando os que não estão.
- verificarPossibilidade: método que recebe um array de ingredientes disponíveis na cozinha e retorna um array com os nomes das receitas que podem ser feitas (que têm todos os ingredientes necessários disponíveis)
- contarReceitas: método que retorna quantas receitas foram criadas

Execute:
1. Crie a receita "Pão de Queijo" com: queijo, ovos, óleo (tempo: 30 minutos)
2. Crie a receita "Frango Assado" com: frango, alho, cebola, óleo, sal (tempo: 60 minutos)
3. Chame verificarPossibilidade(["ovos", "queijo", "óleo", "frango", "sal"]) - apenas Pão de Queijo pode ser feito (falta alho e cebola para o frango)
4. Armazene na variável resposta12 o resultado de contarReceitas()
*/
// Escreva o código da solução abaixo:

export const resposta12 = false

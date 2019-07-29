const { ApolloServer, gql } = require('apollo-server');

const usuarios = [{
  id: 1,
  nome: 'João Silva',
  email: 'jsilva@zemail.com',
  idade: 29
},
{
  id: 2,
  nome: 'Rafael Junior',
  email: 'rafajun@wemail.com',
  idade: 31
},
{
  id: 3,
  nome: 'Daniela Smith',
  email: 'danismi@uemail.com',
  idade: 24
}];

const typeDefs = gql`
  scalar Date

  type Produto {
    nome: String!
    preco: Float!
    desconto: Float
    precoComDesconto: Float
  }

  type Usuario {
    id: Int
    nome: String!
    email: String!
    idade: Int
    salario: Float
    vip: Boolean
  }

  # Entry points api
  type Query {
    ola: String!
    horaAtual: Date!
    usuarioLogado: Usuario
    produtoEmDestaque: Produto
    numerosMegaSena: [Int!]!
    usuarios: [Usuario]
    usuario(id: Int): Usuario 
  }
`;

const resolvers = {
  Produto: {
    precoComDesconto(produto) {
      if (produto.desconto) {
        return produto.preco * (1 - produto.desconto);
      } else {
        return produto.preco;
      }
    }
  },
  Usuario: {
    salario(usuario) {
      return usuario.salario_real;
    }
  },
  Query: {
    ola() {
      return 'Bom dia!';
    },
    horaAtual() {
      return new Date
    },
    usuarioLogado() {
      return {
        id: 1,
        nome: 'Ana da web',
        email: 'anadaweb@email.com',
        idade: 23,
        salario_real: 1234.56,
        vip: true
      }
    },
    produtoEmDestaque() {
      return {
        nome: 'Macbook',
        preco: 4890.89,
        desconto: 0.5
      }
    },
    numerosMegaSena() {
      const crescente = (a, b) => a - b;
      return Array(6).fill(0)
        .map(n => parseInt(Math.random() * 60 + 1))
        .sort(crescente);
    },
    usuarios() {
      return usuarios
    },
    usuario(_, { id }) {
      const sels = usuarios
        .filter(u => u.id === id);
      return sels ? sels[0] : null
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Server is running: ${url}`);
});
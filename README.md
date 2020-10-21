# Happy-NLW-03

<p align="center">
    <img alt="Happy" title="Happy" src=".github/logo.svg" />
</p>

<p align="center">
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#hammer-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#open_file_folder-utilização">Utilização</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>



## 🚀 Projeto
O **Happy** é um projeto que visa facilitar visitas aos orfanatos próximos a você 💜 

Este é um projeto desenvolvido durante a **[Next Level Week](https://nextlevelweek.com/)**, realizada pela **[@Rocketseat](https://github.com/Rocketseat)** durante os dias 12 a 18 de Outubro de 2020.

O projeto é dividido entre as seguintes partes:


- :bar_chart: **API**
  - Backend da Aplicação. O servidor processa as requisições e retorna os dados em formato JSON.

- 💻 **Web (:construction: Em desenvolvimento :construction:)**
  - Frontend. Renderiza as páginas do site, versão desktop

- :iphone: **Mobile (:construction: Em desenvolvimento :construction:)**
  - Versão do site para dispositivos móveis.



## :hammer: Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [SQLite](https://www.sqlite.org/index.html)
- [React](https://reactjs.org)
- [React Native](https://facebook.github.io/react-native/)
- [Expo](https://expo.io/)



## :open_file_folder: Utilização


### :package: Clonando o App:

```bash
# Clonar o repositório
$ git clone https://github.com/Alessandro1918/Happy-NLW-03
```


### :arrow_forward: Rodando o App:

- :bar_chart: API

```sh
  $ cd backend
  
  # Dependencies install.
  $ yarn # or npm install
  
  # Create tables in the database file
  $ yarn typeorm migration:run # or npm run typeorm migration:run
  
  # API start
  $ yarn dev # or npm run dev

  # Adress
  $ http://localhost:3333
```

- :computer: Web app

```sh
  $ cd web
  
  # Dependencies install.
  $ yarn # or npm install
  
  # Running web app
  $ yarn start # or npm start

  # Adress
  $ http://localhost:3000
```

- :iphone: Mobile app

```sh
  $ cd mobile
  
  # Dependencies install.
  $ yarn # or npm install
  
  # Running mobile app
  $ yarn start # or npm start
```



## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

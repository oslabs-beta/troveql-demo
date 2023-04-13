<div align="center">
  <img src='./assets/TroveQL-black.svg' style="width:100%;">
  <h1>TroveQL DEMO APP</h1>
  <p>TroveQL DEMO App is a simple web app with a GraphQL API on its Express.js server using the TroveQL cache library to showcase TroveQL and its performance metrics desktop application, TroveMetrics, in action.</p>
  
  <img src="https://img.shields.io/badge/GraphQl-E10098?style=for-the-badge&logo=graphql&logoColor=white">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white">
  <img src="https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white">
  <img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white">
  <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white">
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white">
</div>

## Get Started
#### Clone this repository
```bash
git clone https://github.com/oslabs-beta/troveql-demo.git
```
#### Set up a PostgreSQL database using ElephantSQL
1. Go to [ElephantSQL](https://www.elephantsql.com/), sign in to your account, and create a new database instance. Select the free tier as 'Tiny Turtle'. The instance's name and datacenter are up to you.
2. Copy the URI in the newly created database instance's DETAILS tab.
3. Check that you have [PostgresQL](https://www.postgresql.org/download/) installed. You can run `psql --version` on your command line to check.

#### Set up your .env file
1. From the root directory, navigate to the /server folder.
2. Create a .env file in the server directory and add the following:
```javascript
PG_URI=//insert your postgresql URI here
``` 

#### Download TroveMetrics
Go to the <a href="https://www.troveql.io/" target="_blank" rel="noopener noreferrer">TroveQL website</a> and download the desktop application for your OS (macOS, Windows, Linux).

#### Install all the dependencies
Install npm dependencies by running `npm install` on your command line in the /client, /server, and root folders.

#### Run the demo
1. Navigate back to the root directory.
2. Run the following command to start the demo:
```bash
npm start
```
3. You can see demo running on http://localhost:8080/ now. Click around and open your downloaded TroveMetrics desktop application to see the TroveQL cache in action!

#### (Optional) Configure your instance of TroveQL
In the index.ts file in the /server folder, you can customize the TroveQL cache configuration:
```javascript
const capacity = 5; // size limit of your cache
const graphQLAPI = 'http://localhost:4000/graphql'; // your GraphQL URL endpoint
const useTroveMetrics = true; // (optional) if you would like to use TroveMetrics - default is false
const mutations = {}; // (optional) object where key/value pairs are mutation types/object types mutated (ex. { addMovie: 'movie', editMovie: 'movie', deleteMovie: 'movie' })
const cache = new TroveQLCache(capacity, graphQLAPI, useTroveMetrics, mutations);
```
To learn more about TroveQL's cache configruation options, visit <a href="https://github.com/oslabs-beta/troveql">TroveQL's GitHub page</a>.

## Download TroveQL library
Visit the <a target="_blank" rel="noopener noreferrer" href="https://www.troveql.io/">TroveQL website</a> to get more information and watch a video demo of TroveQL and TroveMetrics.

Thank you so much!

## Authors
Alex Klein - [GitHub](https://github.com/a-t-klein) | [LinkedIn](https://www.linkedin.com/in/alex-t-klein-183aa758/)
<br>
Erika Jung - [GitHub](https://github.com/erikahjung) | [LinkedIn](https://www.linkedin.com/in/erikahjung)
<br>
Sam Henderson - [GitHub](https://github.com/samhhenderson) | [LinkedIn](https://www.linkedin.com/in/samuel-h-henderson/)
<br>
Tricia Yeh - [GitHub](https://github.com/triciacorwin) | [LinkedIn](https://www.linkedin.com/in/tricia-yeh/)
<br>
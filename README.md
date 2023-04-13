<div align="center">
  <img src='./assets/TroveQL-black.svg' style="width:100%;">
  <h1>TroveQL DEMO APP</h1>
  <p>TroveQL DEMO App is a simple app using GraphQL APIs and TroveQL cache library on Express.js server to demonstrate the performance of TroveQL cache in action and how the cache interacts with GraphQL queries through TroveMetrics dashboard.</p>
  
  <p>
  <img src="https://img.shields.io/badge/GraphQl-E10098?style=for-the-badge&logo=graphql&logoColor=white">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white">
  <img src="https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white">
  <img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white">
  <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white">
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white">

</div>



## Get Started
#### Clone this repository
```javascript
git clone https://github.com/oslabs-beta/troveql-demo.git
```
#### Set up a PostgreSQL database using ElephantSQL
1. Go to [ElephantSQL](https://www.elephantsql.com/), register or sign in to your account and create a new database instance. Select the free tier as 'Tiny Turtle'. Instance's name and datacenter are up to you.

2. Copy the URL in newly created database instance's DETAILS tab.

3. Make sure you have PostgresQL [installed](https://www.postgresql.org/download/). You can run `psql --version` in your terminal to check.

#### Download TroveMetrics
Go to <a href="https://www.troveql.io/" target="_blank" rel="noopener noreferrer">our TroveQL website</a> and download the desktop application for your OS (macOS, Windows, Linux). Use TroveMetrics to monitor the performance of your cache and GraphQL API on Demo App's server.

#### Install all the dependencies
Install npm dependencies by running npm install in your terminal.

#### Set up your .env file
1. From the root directory, direct to server directory in your cloned Demo repo by running `cd server` in your terminal.
2. Create a .env file in the server directory and input the following:
```javascript
PG_URI= //insert your postgresql URL here
``` 

#### Run the demo
1. Go back from server directory to root directory by running `cd ..` in your terminal

2. Run the command below to start the demo:

```javascript
npm start
```
3. You can see demo running on http://localhost:8080/ now. Click around and open the downloaded metrics to see the interaction between demo site with TroveMetrics!


#### (Optional) Configure TroveQL

In index.ts at server directory, you can alos customize TroveQL cache configuration
```javascript
const capacity = 5; // size limit of your cache
const graphQLAPI = 'http://localhost:4000/graphql'; // your graphQL URL endpoint
const useTroveMetrics = true; // (optional) if you would like to use TroveMetrics - default is false
const mutations = {}; // (optional) object where key/value pairs are mutation types/object types mutated (ex. { addMovie: 'movie', editMovie: 'movie', deleteMovie: 'movie' })
const cache = new TroveQLCache(capacity, graphQLAPI, useTroveMetrics, mutations);
```
To learn more about TroveQL cache configruation, visit <a href="https://github.com/oslabs-beta/troveql">TroveQL github page</a>.
 


## Download TroveQL library
Visit <a target="_blank" rel="noopener noreferrer" href="https://www.troveql.io/">our website</a> to get more information and watch a demo of TroveQL and TroveMetrics, its performance monitoring application.

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
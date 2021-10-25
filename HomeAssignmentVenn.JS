// var { graphql, buildSchema } = require('graphql');
// /*// """Input payload for creating user"""
// input CreateNeighborhoodsInput {
//     neighborhood: String
//     disFromCenter: String
//     age: String
//     income:String
//     availabilityOfPublicTrans: String
//     populationDensity: String
//     priority: String
// }

// // """User type definition"""
// type CreateNeighborhoodPayload {
//     neighborhood: Neighborhood!
// }

// // """User type definition"""
// type CreateNeighborhoodsPayload {
//     neighborhoods: [Neighborhood]
// }


// type Mutation {
//   createNeighborhood(input: CreateNeighborhoodInput!): CreateNeighborhoodPayload
//   createNeighborhoods(input: [CreateNeighborhoodInput!]!): CreateNeighborhoodsPayload
// }

// type Query {
//     neighborhoods: [Neighborhoods!]!
// }

// // """User type definition"""
// type Neighborhood {
//     neighborhood: String
//     disFromCenter: String
//     age: String
//     income:String
//     availabilityOfPublicTrans: String
//     populationDensity: String
//     priority: String
// }
// */


// /*
// const Neighborhood = new GraphQLObjectType({
//     neighborhood: String,
//     disFromCenter: String,
//     age: String,
//     income:String,
//     availabilityOfPublicTrans: String,
//     populationDensity: String,
//     priority: String

// });
// */
// // Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Neighborhood{
//     neighborhood: String,
//     disFromCenter: String,
//     age: String,
//     income:String,
//     availabilityOfPublicTrans: String,
//     populationDensity: String,
//     priority: String

//   }
//   type Query {
//     neighborhoods: [Neighborhood!]!
//   }
// `);

// // The root provides a resolver function for each API endpoint
// const root = {
//     neighborhoods: () => {
//      return [{'neighborhood':'beautiful view','disFromCenter':'80','age':'10','income':'20000','availabilityOfPublicTrans':'0','populationDensity':'3.9','priority':''},{'neighborhood':'view','disFromCenter':'80','age':'25','income':'20000','availabilityOfPublicTrans':'0','populationDensity':'3.9','priority':''}];
//     }
  
// };

// // Run the GraphQL query '{ hello }' and print out the response
// graphql(schema, '{ neighborhoods }', root).then((response) => {
//   console.log(response);
// });

var { ValidationPipe } = require('@nestjs/common');
// import { ValidationPipe } from '@nestjs/common';
const { NestFactory } = require('@nestjs/core');
// import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();


//get data- array of objects=> 
function getData(){
    const neighborhoods = [{'neighborhood':'beautiful view','disFromCenter':'80','age':'10','income':'20000','availabilityOfPublicTrans':'0','populationDensity':'3.9','priority':''},{'neighborhood':'view','disFromCenter':'80','age':'25','income':'20000','availabilityOfPublicTrans':'0','populationDensity':'3.9','priority':''}];
    calcScore(neighborhoods);
    chooseWinner(neighborhoods);
    console.log(neighborhoods);
}

getData();

//get score-
    //getScoreOfDisFromCenter
    //getScoreOfAge- div to groups- ages + score (less then 20, 10 scores ;20-30, 9 scores; 30-40, 8 scores; 40-50, 7; 50-60, 6; 60-70, 5; 70+,4)
    //add priority to the array- 10 to 100, 100 it's the best

function calcScore(neighborhoods){
    let scoreOfEachParam = {};
    for (let i = 0; i < neighborhoods.length; i++) {
        scoreOfEachParam.scoreAge = calcScoreOfAge(neighborhoods[i].age);
        scoreOfEachParam.scoreDisFromCenter = calcScoreOfDisFromCenter(neighborhoods[i].disFromCenter);
        scoreOfEachParam.scoreIncome = calcScoreOfIncome(neighborhoods[i].income);//(0-5000, 2; 5000-10000, 4; 10000-15000, 6;15000-20000, 8; 20000+ 10)
        scoreOfEachParam.scoreAvailabilityOfPublicTrans = calcScoreAvailabilityOfPublicTrans(neighborhoods[i].availabilityOfPublicTrans, 0, 5, 5,);//(10, 0; 2, 5; 0(low), 10);
        scoreOfEachParam.scorePopulationDensity = calcPopulationDensity(neighborhoods[i].populationDensity,30,30,1);//(less 30, 1 ; 30-60 ; 60-90 ; 90-120 ; 120-150 ; 150-180 ; 180-210; 210-240 ; 240-270 ; 270+, 10)
    
        neighborhoods[i].priority = calcPriority(scoreOfEachParam);
    }
}


/*function calcParamScore(param, paramStart, paramDelta, ScoreDelta){
    let score = 10;
    while(param >= paramStart && (score > 0 && score <= 10)){
        paramStart += paramDelta;
        score -= ScoreDelta;
        console.log("score " + score + " paramStart " + paramStart);
    } 
    return score;
}*/

function calcScoreOfAge(age){
    let score = 10;
    let ageJump = 20;
    while(age >= ageJump && score > 4){
        ageJump += 10;
        score--;
    } 
    return score;
}

function calcScoreOfDisFromCenter(disFromCenter){//0-5, 0; 5-10, 2; 10-15, 4 ; 15-20, 6; 20-25, 8; 30+,10
    let score = 0;
    let disJump = 5;
    while(disFromCenter >= disJump && score < 10){
        disJump += 5;
        score += 2;
    }
    return score;
}

function calcScoreAvailabilityOfPublicTrans(availabilityOfPublicTrans){//5 (Very High) 2; 4 High 4; 3 Medium, 6; 2 Low, 8; 1 Very Low, 10
    let score = 10;
    let paramStart = 1;
    while(availabilityOfPublicTrans > paramStart && score > 2){
        paramStart += 1;
        score -= 2;
    } 
    return score;
}

function calcScoreOfIncome(income){
    let score = 0;
    let paramStart = 0;
    while(income >= paramStart && score < 10){
        paramStart += 5000;
        score += 2;
    }
    return score;
}

function calcPopulationDensity(populationDensity){
    let score = 0;
    let paramStart = 0;
    while(populationDensity >= paramStart && score < 10){
        paramStart += 30;
        score ++;
    }
    return score;
}
function calcPriority(scoreOfEachParam){
    let priority = 0;
    for (const key in scoreOfEachParam) {
        priority += scoreOfEachParam[key];
    }
    return priority;
}
//choose winner
function chooseWinner(neighborhoods){
    neighborhoods.sort(compare);
}

function compare( a, b ) {
  if ( a.priority < b.priority ){
    return -1;
  }
  if ( a.priority > b.priority ){
    return 1;
  }
  return 0;
}


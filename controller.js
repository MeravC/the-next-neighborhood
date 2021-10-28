const neighborhoodsService = require('./service');

async function getScoredNeighborhoods(req, res){
    try {
        const neighborhoods = await neighborhoodsService.getAll();
        
        if (neighborhoods.length > 0){
            const neighborhoodParamsScore = calcScore(neighborhoods);
            console.log(neighborhoodParamsScore);
            const neighborhoodPriorityList = neighborhoodParamsScore.map(elem => calcPriority(elem));// === const n2 = n.map(calcPriority)
            let theWinner = chooseWinner(neighborhoodPriorityList);
            console.log("The next neighborhood- " + theWinner.neighborhoodName + " with priority " + theWinner.priority);

        } else {
            console.log(`No neighborhoods records found`);
            return res.status(404)
        }
    } catch (err){
        console.log(`[getScoredNeighborhoods] Failed: ${err.message}`);
        return res.status(500);
    }
}
getScoredNeighborhoods();

function calcScore(neighborhoods, parameters){
    return neighborhoods.map( neighborhood => {
        return {
            neighborhoodName: neighborhood.neighborhood,        
            scoreAge: calcScoreOfAge(neighborhood.age),
            scoreDisFromCenter: calcScoreOfDisFromCenter(neighborhood.disFromCenter),
            scoreIncome: calcScoreOfIncome(neighborhood.income),
            scoreAvailabilityOfPublicTrans: calcScoreAvailabilityOfPublicTrans(neighborhood.availabilityOfPublicTrans),
            scorePopulationDensity: calcPopulationDensity(neighborhood.populationDensity),
        }
    });
}

function calcScoreOfAge(age){//less then 20, 10 scores ;20-30, 9 scores; 30-40, 8 scores; 40-50, 7; 50-60, 6; 60-70, 5; 70+,4
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

function calcScoreOfIncome(income){//(0-5000, 2; 5000-10000, 4; 10000-15000, 6;15000-20000, 8; 20000+ 10)
    let score = 0;
    let paramStart = 0;
    while(income >= paramStart && score < 10){
        paramStart += 5000;
        score += 2;
    }
    return score;
}

function calcPopulationDensity(populationDensity){//(less 30, 1 ; 30-60 ; 60-90 ; 90-120 ; 120-150 ; 150-180 ; 180-210; 210-240 ; 240-270 ; 270+, 10)
    let score = 0;
    let paramStart = 0;
    while(populationDensity >= paramStart && score < 10){
        paramStart += 30;
        score ++;
    }
    return score;
}
function calcPriority(scoreObj){
    let priority = 0;
    for (const key in scoreObj) {
        if (key !== 'neighborhoodName')
            priority += scoreObj[key];
    }
    return { priority, neighborhoodName: scoreObj.neighborhoodName };
}

function chooseWinner(neighborhoods){
    return neighborhoods.sort(compare)[0];
}


function compare( a, b ) {
  if ( a.priority < b.priority ){
    return 1;
  }

  if ( a.priority > b.priority ){
    return -1;
  }

  return 0;
}


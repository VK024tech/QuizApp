


function totalNo(array, value){
    let num = 0
    for (let i of array){
        if(i===value){
            num++
        }
    }
    return num;
}


userInputArray = JSON.parse(localStorage.getItem("quizData"))
console.log(userInputArray)

const totalCorrect = totalNo(userInputArray,'Correct')
const totalInCorrect = totalNo(userInputArray,'incorrect')
const totalTimeOut = totalNo(userInputArray,'out of time')

const totalEarned = totalCorrect 
const totalLost = totalInCorrect + totalTimeOut 
const totalQues = totalCorrect + totalInCorrect + totalTimeOut


const totalScore = document.querySelector('.total-score')
const incorrectPercent = document.querySelector('.incorrect-percent')
const correctPercent = document.querySelector('.correct-percent')

totalScore.innerText = totalEarned+'/'+totalQues
const rightPercent = Math.floor((totalEarned/totalQues)*100)
correctPercent.innerText = rightPercent+'%'

const wrongPercent = Math.floor((totalLost/totalQues)*100)
incorrectPercent.innerText = wrongPercent+'%'


const correctMeter = document.querySelector('.correct-answer')
// correctMeter.style.maxWidth = rightPercent+'%'




const buttonRetry = document.querySelector('.retry')
buttonRetry.addEventListener('click',()=>{
    location.assign("index-02.html")
    localStorage.removeItem(quizData)
})





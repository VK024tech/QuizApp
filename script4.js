function totalNo(array, value) {
  let num = 0;
  for (let i of array) {
    if (i === value) {
      num++;
    }
  }
  return num;
}

userInputArray = JSON.parse(localStorage.getItem("quizData"));
console.log(userInputArray);

const totalCorrect = totalNo(userInputArray, "Correct");
const totalInCorrect = totalNo(userInputArray, "incorrect");
const totalTimeOut = totalNo(userInputArray, "out of time");

const totalEarned = totalCorrect
const totalLost = totalInCorrect + totalTimeOut;
const totalQues = totalCorrect + totalInCorrect + totalTimeOut;

const totalScore = document.querySelector(".total-score");
const incorrectPercent = document.querySelector(".incorrect-percent");
const correctPercent = document.querySelector(".correct-percent");

totalScore.innerText = totalEarned + "/" + totalQues;
const rightPercent = Math.floor((totalEarned / totalQues) * 100);
correctPercent.innerText = rightPercent + "%";

const wrongPercent = Math.floor((totalLost / totalQues) * 100);
incorrectPercent.innerText = wrongPercent + "%";

const correctMeter = document.querySelector(".correct-answer");
correctMeter.style.maxWidth = rightPercent + "%";

const buttonRetry = document.querySelector(".retry");
buttonRetry.addEventListener("click", () => {
  localStorage.removeItem("quizData");
  location.assign("index-02.html");
});

const taglineDynamic = document.querySelector(".tagline");
if (totalEarned === totalQues) {
  taglineDynamic.innerText = "Perfect score! You're a true master!";
} else if (totalEarned >= 20) {
  taglineDynamic.innerText = "Near perfection! You've shown remarkable skill.";
} else if (totalEarned >= 15) {
  taglineDynamic.innerText = "You're getting there! Keep practicing.";
} else if (totalEarned >= 10) {
  taglineDynamic.innerText = "Not bad! You're on the right track.";
} else if (totalEarned >= 5) {
  taglineDynamic.innerText = "Every attempt is a step forward. Keep trying!";
} else {
  taglineDynamic.innerText =
    "Don't worry, learning is a journey. Let's try again!";
}

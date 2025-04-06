// Start-screen//
const playButton = document.querySelector(".start");

if (playButton) {
  playButton.addEventListener("click", () => {
    location.assign("index-02.html");
  });
}

///////////////////////////////////////////////////////////////////////////

let indexx = 0;
let data;
let isMute = false;
let intervalId;
let optionArray;
let userInputArray = [];
let storedData;

//////////////////////Data Fetch///////////////////////////////////////////////
fetchdata()
 async function fetchdata(){
  const response = await fetch("https://opentdb.com/api.php?amount=25&category=18&type=multiple")
  .then((response) => response.json())
  .then((fetchedData) => {
    data = fetchedData;
    loadQuestion();
  })
  .catch((error) => {
    console.error("Not able to fetch data from api");
  });
 }
///////////////initialise  and Load Question///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

function loadQuestion() {
  /////////////initialise///////

  if (localStorage.getItem("quizData")) {
    storedData = JSON.parse(localStorage.getItem("quizData"));
    // console.log(storedData.length)
    if (storedData.length > 0) {
      indexx = storedData.length;
    } else {
      indexx = 0;
    }
  } else {
    indexx = 0;
  }

  if (intervalId) {
    clearInterval(intervalId);
    startTimer();
  } else {
    startTimer();
  }

  const correctAns = document.querySelector(".correctCheckmark");
  if (correctAns) {
    let parentE = correctAns.parentElement;
    parentE.style.borderColor = "";
    parentE.style.backgroundColor = "";
    correctAns.remove();
  }

  const wrongAns = document.querySelector(".wrongCheckmark");
  if (wrongAns) {
    let parentE = wrongAns.parentElement;
    parentE.style.borderColor = "";
    parentE.style.backgroundColor = "";
    wrongAns.remove();
  }

  document.body.classList.remove("time10", "time30");
  const countdownTimer = document.querySelector(".timer");
  countdownTimer.classList.remove("timer30", "timer10");

  //////////////// Load question//////////////////////////////////////////////////

  if (indexx < data.results.length) {
    const totalQue = document.querySelector(".questions");
    totalQue.innerText = `${indexx + 1}/${data.results.length}`;

    const question = document.querySelector(".Current-question");
    question.innerText = data.results[indexx].question;

    const optionOne = document.querySelector(".option-1");
    const optionTwo = document.querySelector(".option-2");
    const optionThree = document.querySelector(".option-3");
    const optionFour = document.querySelector(".option-4");

    // /shuffle array

    // optionArray = shuffleArray([
    //   data.results[indexx].correct_answer,
    //   ...data.results[indexx].incorrect_answers,
    // ]);
    // console.log(optionArray);
    let incorr = data.results[indexx].incorrect_answers;
    let corr = data.results[indexx].correct_answer;
    optionArray = [...incorr, corr];

    // optionArray = [1, 2, 3, 4];
    // console.log(optionArray);
    optionArray = shuffleArray(optionArray);
    // console.log(shuffleArray(optionArray));

    optionOne.innerText = optionArray[0];
    optionTwo.innerText = optionArray[1];
    optionThree.innerText = optionArray[2];
    optionFour.innerText = optionArray[3];
  } else {
    clearInterval(intervalId);
    // console.log("finished");
    location.assign("index-03.html");
  }
}

///////////Shuffle Array//////////////////////////////////////////////////

// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     let j = Math.floor(Math.random() * (i + 1));
//     [array[i], (array[j] = array[j]), array[i]];
//   }
//   return array;
// }

function shuffleArray(array) {
  let newarray = array.sort((a, b,c,d) => 0.5 - Math.random());
  return newarray
}
//////////////Start Timer//////////////////////////////////////////////////

function startTimer() {
  clearInterval(intervalId);

  const countdownTimer = document.querySelector(".timer");

  const startingMinutes = 1;
  let time = startingMinutes * 60;

  intervalId = setInterval(() => {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;
    countdownTimer.innerHTML = `${minutes}:${seconds}`;

    time = time < 0 ? 0 : time;

    if (time <= 10) {
      document.body.classList.add("time10");
      countdownTimer.classList.add("timer10");
    } else if (time <= 30) {
      document.body.classList.add("time30");
      countdownTimer.classList.add("timer30");
    }

    if (time === 0) {
      handleAnswer(null);
      setTimeout(() => {
        document.body.classList.remove("time10", "time30");
        countdownTimer.classList.remove("timer30", "timer10");
      }, 2000);
    }
    time--;
  }, 1000);
}

////////////////////////////handle answer///////////////////////////////////

function handleAnswer(selectedOption) {
  // console.log(storedData.length||0)
  clearInterval(intervalId);
  if (
    selectedOption === data.results[indexx].correct_answer ||
    selectedOption === null
  ) {
    if (selectedOption === null) {
    //   console.log("time out");
      setTimeout(() => {
        if (localStorage.getItem("quizData")) {
          if (storedData.length) {
            userInputArray = JSON.parse(localStorage.getItem("quizData"));
            userInputArray.push("out of time");
            localStorage.setItem("quizData", JSON.stringify(userInputArray));
            // console.log("saved");
          }
        } else {
          userInputArray.push("out of time");
          localStorage.setItem("quizData", JSON.stringify(userInputArray));
        //   console.log("setitem");
        }

        indexx++;
        loadQuestion();
      }, 2000);
    } else {
      setTimeout(() => {
        // console.log("correct");

        if (localStorage.getItem("quizData")) {
          if (storedData.length) {
            userInputArray = JSON.parse(localStorage.getItem("quizData"));
            userInputArray.push("Correct");
            localStorage.setItem("quizData", JSON.stringify(userInputArray));
            // console.log("saved");
          }
        } else {
          userInputArray.push("Correct");
          localStorage.setItem("quizData", JSON.stringify(userInputArray));
        //   console.log("setitem");
        }
        indexx++;
        loadQuestion();
      }, 2000);
    }
  } else {
    // console.log("incorrect");
    setTimeout(() => {
      if (localStorage.getItem("quizData")) {
        if (storedData.length) {
          userInputArray = JSON.parse(localStorage.getItem("quizData"));
          userInputArray.push("incorrect");
          localStorage.setItem("quizData", JSON.stringify(userInputArray));
        //   console.log("saved");
        }
      } else {
        userInputArray.push("incorrect");
        localStorage.setItem("quizData", JSON.stringify(userInputArray));
        // console.log("setitem");
      }
      indexx++;
      loadQuestion();
    }, 2000);
  }
}

//////////////////////////Mute Functionality///////////////////////////////////

function toggleMute() {
  const volumeButton = document.querySelector(".volume");
  if (volumeButton.src === "./Volume_ON.svg") {
    volumeButton.src = "./Mute.svg";
    isMute = true;
  } else {
    volumeButton.src = "./Volume_ON.svg";
    isMute = false;
  }
}

const volumeButton = document.querySelector(".volume");
volumeButton.addEventListener("click", toggleMute);

/////////////////////////////OptionSelecter//////////////////////////////////////

const multipleOptions = document.querySelector(".options");
// multipleOptions.addEventListener("click", (event) => {
//   if (event.target.classList.contains("option")) {
//     handleAnswer(event.target.innerHTML);
//   }
// });

//////////////////////////////Audio and visual q//////////////////////////////////////////////

multipleOptions.addEventListener("mouseover", (event) => {
  if (event.target.classList.contains("option")) {
    const hoverSound = new Audio("./Hover.wav");
    hoverSound.currentTime = 0;
    hoverSound.play();
    hoverSound.muted = isMute;
  }
});

multipleOptions.addEventListener("click", (event) => {
  if (event.target.classList.contains("option")) {
    // handleAnswer(event.target.innerHTML);
    const selectedOption = event.target.innerHTML;
    const correctSound = new Audio("./correct.mp3");
    const incorrectSound = new Audio("./incorrect.mp3");
    if (selectedOption == data.results[indexx].correct_answer) {
      let correctAns = document.createElement("img");
      correctAns.classList.add("correctCheckmark");
      correctAns.src = "/correct.svg";
      event.target.appendChild(correctAns);
      event.target.style.borderColor = "#35BD3A";
      event.target.style.backgroundColor = "#95EA99";
      correctSound.play();
      correctSound.muted = isMute;

      const optionElement = document.querySelectorAll(".option");

      optionElement.forEach((option) => {
        option.classList.add("disable");
      });
      handleAnswer(selectedOption);

      setTimeout(() => {
        optionElement.forEach((option) => {
          option.classList.remove("disable");
        });
      }, 2000);
    } else {
      let wrongAns = document.createElement("img");
      wrongAns.classList.add("wrongCheckmark");
      wrongAns.src = "./wrong.svg";
      event.target.appendChild(wrongAns);
      event.target.style.borderColor = "#FF5A5A";
      event.target.style.backgroundColor = "#FFA2A2";
      const answer = optionArray.indexOf(data.results[indexx].correct_answer);
      const correctOption = multipleOptions.children[answer];
      let correctAns = document.createElement("img");
      correctAns.classList.add("correctCheckmark");
      correctAns.src = "./correct.svg";
      correctOption.appendChild(correctAns);
      correctOption.style.borderColor = "#35BD3A";
      incorrectSound.play();
      incorrectSound.muted = isMute;

      const optionElement = document.querySelectorAll(".option");
      optionElement.forEach((option) => {
        option.classList.add("disable");
      });

      handleAnswer(selectedOption);
      setTimeout(() => {
        optionElement.forEach((option) => {
          option.classList.remove("disable");
        });
      }, 2000);
    }
  }
});

// //////////////////initial reload/////////////////////
// function reloadPage(delay) {
//   setTimeout(function() {
//     window.location.reload();
//   }, delay);
// }

// reloadPage(2000);
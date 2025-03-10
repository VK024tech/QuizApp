// Start-screen//
const playButton = document.querySelector(".start");

if (playButton) {
  playButton.addEventListener("click", () => {
    location.assign("index-02.html");
  });
}

fetch("https://opentdb.com/api.php?amount=25&category=18&type=multiple")
  .then((response) => response.json())
  .then((data) => {
    // console.log(data.results.length)
    let indexx = 0

   


    const totalQue = document.querySelector(".questions");
    totalQue.innerText = `${indexx+1}/${data.results.length}`;

    // console.log(data.results);
    const question = document.querySelector(".Current-question");
    question.innerText = data.results[indexx].question;

    const optionOne = document.querySelector(".option-1");
    const optionTwo = document.querySelector(".option-2");
    const optionThree = document.querySelector(".option-3");
    const optionFour = document.querySelector(".option-4");

    ///shuffle array
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], (array[j] = array[j]), array[i]];
      }
      return array;
    }

    const optionArray = shuffleArray([
      data.results[indexx].correct_answer,
      ...data.results[indexx].incorrect_answers,
    ]);
    // console.log(optionArray);

    const multipleOptions = document.querySelector(".options");

    optionOne.innerText = optionArray[0];
    optionTwo.innerText = optionArray[1];
    optionThree.innerText = optionArray[2];
    optionFour.innerText = optionArray[3];

    ////audiologic
    const volumeButton = document.querySelector(".volume");
    const hoverSound = new Audio("http://127.0.0.1:5500/Hover.wav");
    const correctSound = new Audio("http://127.0.0.1:5500/correct.mp3");
    const incorrectSound = new Audio("http://127.0.0.1:5500/incorrect.mp3");
    multipleOptions.addEventListener("mouseover", (event) => {
      if (event.target.classList.contains("option")) {
        hoverSound.currentTime = 0;
        hoverSound.play();
      }
    });
    let isMute = false;
    volumeButton.addEventListener("click", () => {
      if (volumeButton.src === "http://127.0.0.1:5500/Volume_ON.svg") {
        volumeButton.src = "http://127.0.0.1:5500/Mute.svg";
        hoverSound.muted = true;
        isMute = true;
      } else if (volumeButton.src === "http://127.0.0.1:5500/Mute.svg") {
        volumeButton.src = "http://127.0.0.1:5500/Volume_ON.svg";
        hoverSound.muted = false;
        isMute = false;
      }
    });

    // TimerLogic
    const countdownTimer = document.querySelector(".timer");

    const startingMinutes = 1;
    let time = startingMinutes * 60;

    function updateCountdown() {
      const minutes = Math.floor(time / 60);
      let seconds = time % 60;

      seconds = seconds < 10 ? "0" + seconds : seconds;
      countdownTimer.innerHTML = `${minutes}:${seconds}`;
      time--;
      time = time < 0 ? 0 : time;

      if (time < 10) {
        document.body.classList.add("time10");
        countdownTimer.classList.add("timer10");
      } else if (time < 30) {
        document.body.classList.add("time30");
        countdownTimer.classList.add("timer30");
      } else {
      }
    }

    const intervalId = setInterval(updateCountdown, 1000);

    // /button logic

    multipleOptions.addEventListener(
      "click",
      (event) => {
        clearInterval(intervalId);
        if (event.target.classList.contains("option")) {
          const selectedOption = event.target.innerHTML;
          if (selectedOption == data.results[indexx].correct_answer) {
            let correctAns = document.createElement("img");
            correctAns.src = "http://127.0.0.1:5500/correct.svg";
            event.target.appendChild(correctAns);
            event.target.style.borderColor = "#35BD3A";
            event.target.style.backgroundColor = "#95EA99";
            correctSound.play();
            correctSound.muted = isMute;

            if(indexx<data.results.length){
                indexx++
            }else{
                console.log('try')
            }
          } else {
            let wrongAns = document.createElement("img");
            wrongAns.src = "http://127.0.0.1:5500/wrong.svg";
            event.target.appendChild(wrongAns);
            event.target.style.borderColor = "#FF5A5A";
            event.target.style.backgroundColor = "#FFA2A2";
            const answer = optionArray.indexOf(data.results[indexx].correct_answer);
            const correctOption = multipleOptions.children[answer];
            let correctAns = document.createElement("img");
            correctAns.src = "http://127.0.0.1:5500/correct.svg";
            correctOption.appendChild(correctAns);
            correctOption.style.borderColor = "#35BD3A";
            incorrectSound.play();
            incorrectSound.muted = isMute;
          }
        }
      },
      { once: true }
    );
  });
// .catch(error){
// console.log('error message')
// }

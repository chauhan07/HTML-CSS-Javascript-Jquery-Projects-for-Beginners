// question list json

const quizData = {
  "quizName": "Indian History Quiz",
  "questions": [{
    "question": "Who was the first Prime Minister of India?",
    "options": ["Jawaharlal Nehru", "Sardar Patel", "Lal Bahadur Shastri", "Indira Gandhi"],
    "correctAnswer": "Jawaharlal Nehru"
  },
                {
                  "question": "When did the First War of Independence in India (also known as the Sepoy Mutiny) occur?",
                  "options": ["1857", "1947", "1905", "1920"],
                  "correctAnswer": "1857"
                },
                {
                  "question": "Which Mughal emperor built the Taj Mahal?",
                  "options": ["Shah Jahan", "Akbar", "Aurangzeb", "Babur"],
                  "correctAnswer": "Shah Jahan"
                },
                {
                  "question": "Who was the leader of the Non-Cooperation Movement during the Indian independence struggle?",
                  "options": ["Mahatma Gandhi", "Jawaharlal Nehru", "Bhagat Singh", "Sardar Patel"],
                  "correctAnswer": "Mahatma Gandhi"
                },
                {
                  "question": "Who was the first woman Prime Minister of India?",
                  "options": ["Indira Gandhi", "Sarojini Naidu", "Rajkumari Amrit Kaur", "Vijaya Lakshmi Pandit"],
                  "correctAnswer": "Indira Gandhi"
                },
                {
                  "question": "What was the original name of Chanakya, the ancient Indian scholar and advisor to Chandragupta Maurya?",
                  "options": ["Kautilya", "Ashoka", "Akbar", "Chandragupta"],
                  "correctAnswer": "Kautilya"
                },
                {
                  "question": "Who wrote the famous book 'Discovery of India'?",
                  "options": ["Jawaharlal Nehru", "Mahatma Gandhi", "Rabindranath Tagore", "Sardar Patel"],
                  "correctAnswer": "Jawaharlal Nehru"
                },
                {
                  "question": "The Harappan civilization is also known as?",
                  "options": ["Indus Valley Civilization", "Vedic Civilization", "Mauryan Civilization", "Gupta Civilization"],
                  "correctAnswer": "Indus Valley Civilization"
                },
                {
                  "question": "Who is considered the father of the Indian Constitution?",
                  "options": ["B.R. Ambedkar", "Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel"],
                  "correctAnswer": "B.R. Ambedkar"
                },
                {
                  "question": "Which Indian king is known for sending missions to Sri Lanka, Southeast Asia, and the Hellenistic world?",
                  "options": ["Ashoka", "Harsha", "Chandragupta Maurya", "Akbar"],
                  "correctAnswer": "Ashoka"
                },
                // {
                //     "question": "In which year did the Jallianwala Bagh massacre take place?",
                //     "options": ["1919", "1925", "1947", "1931"],
                //     "correctAnswer": "1919"
                // },
                // {
                //     "question": "Who was the first Governor-General of independent India?",
                //     "options": ["Lord Mountbatten", "C. Rajagopalachari", "Jawaharlal Nehru", "Sardar Patel"],
                //     "correctAnswer": "Lord Mountbatten"
                // },
                // {
                //     "question": "The Indian National Congress was founded in which year?",
                //     "options": ["1885", "1900", "1920", "1947"],
                //     "correctAnswer": "1885"
                // },
                // {
                //     "question": "Who was the first Indian woman to become the President of the United Nations General Assembly?",
                //     "options": ["Vijaya Lakshmi Pandit", "Sarojini Naidu", "Indira Gandhi", "Meira Kumar"],
                //     "correctAnswer": "Vijaya Lakshmi Pandit"
                // },
                // {
                //     "question": "Who was the author of the 'Arthashastra,' an ancient Indian treatise on statecraft, economic policy, and military strategy?",
                //     "options": ["Chanakya", "Ashoka", "Harsha", "Chandragupta Maurya"],
                //     "correctAnswer": "Chanakya"
                // },
                // {
                //     "question": "Which Indian freedom fighter is also known as the 'Nightingale of India'?",
                //     "options": ["Sarojini Naidu", "Rani Lakshmi Bai", "Bhagat Singh", "Annie Besant"],
                //     "correctAnswer": "Sarojini Naidu"
                // },
                // {
                //     "question": "The Quit India Movement, also known as the August Revolution, was launched in which year?",
                //     "options": ["1942", "1930", "1919", "1947"],
                //     "correctAnswer": "1942"
                // },
                // {
                //     "question": "Who was the last Mughal emperor of India?",
                //     "options": ["Bahadur Shah II", "Aurangzeb", "Shah Jahan", "Akbar"],
                //     "correctAnswer": "Bahadur Shah II"
                // },
                // {
                //     "question": "Which Indian leader is known for his role in the Green Revolution, transforming India's agriculture?",
                //     "options": ["M.S. Swaminathan", "C. Subramaniam", "Verghese Kurien", "K.C. Pant"],
                //     "correctAnswer": "M.S. Swaminathan"
                // }
               ]
}



var quiz_container = document.getElementById("quiz_container");
const quesList = quizData.questions;

// quiz html creating using js

var quizHtml = `
    <div class="quizHdng"><h1 class="hdng">${quizData.quizName}</h1></div>
        <div class="inner">`;

quesList.forEach((element, index) => {

  quizHtml += `
            <div class="ques" style="display:none" data-id="${index}">
                <div class="label">
                    ${index+1}. ${element.question}
                </div>
                <div class="allOptions">`;

  element.options.forEach(options => {
    quizHtml += `
                    <label class="option">
                        <input type="radio" value="${options}" name="answer${index}">
                        <span>${options}</span>
                    </label>`
  });
  quizHtml += `
                </div>
                <div class="nextBtn">`
  if ((quesList.length - 1) != index) {
    quizHtml += `<button data-id="${index}">Next</button>`
  } else {
    quizHtml += `<button>Submit</button>`
  }
  quizHtml += `</div>
        </div>`;
});

quizHtml += `</div>`;
quiz_container.innerHTML = quizHtml;
var allQuesItem = document.querySelectorAll(".ques");
allQuesItem[0].style.display = "block";

// next/submit button functionality | click event listner on all next and submit button
const selectedValue = [];
const selectedValueoption = [];
allNextBtn = document.querySelectorAll(".nextBtn button");
allNextBtn.forEach((element, index) => {
  element.addEventListener("click", function(e) {
    checkUserSelectedAnswer(e, index)
  });
});

function checkUserSelectedAnswer(event, i) {
  var radioAnswer = document.querySelectorAll(`input[name="answer${i}"]`);
  if ((quesList.length - 1) != i) {
    allQuesItem[i].style.display = "none";
    allQuesItem[i + 1].style.display = "block";
    // Loop through the radio buttons and find the selected one
    checkedAnswer(radioAnswer);
  } else {
    // console.log("reach to submit");
    // Loop through the radio buttons and find the selected one
    checkedAnswer(radioAnswer);
    resultDeclared(selectedValue, selectedValueoption);
  }
}

function checkedAnswer(radioAnswer) {
  var j = 0;
  for (var i = 0; i < radioAnswer.length; i++) {
    j++;
    if (radioAnswer[i].checked) {
      selectedValue.push(radioAnswer[i].value);
      selectedValueoption.push(i);
      j = 0;
      break; // Exit the loop when a checked radio button is found
    }
  }

  if (j == 4) {
    selectedValue.push("");
    selectedValueoption.push("");
  }
}

function resultDeclared(s_val, s_val_opt) {
  // console.log(s_val);
  // console.log(s_val_opt);
  var quizResult = '';
  var parentClass
  var notAttCount = 0,
      corrCount = 0,
      wrongCount = 0;
  quesList.forEach((element, index) => {


    if (s_val[index] == '') {
      parentClass = 'empty';
      notAttCount++;
    } else {
      if (s_val[index] == element.correctAnswer) {
        parentClass = 'correct';
        corrCount++;
      } else {
        parentClass = 'wrong';
        wrongCount++;
      }
    }

    quizResult += `
                <div class="ques ${parentClass}" data-id="${index}">
                    <div class="label">
                        ${index+1}. ${element.question}
                    </div>
                    <div class="allOptions">`;

    element.options.forEach(options => {
      quizResult += `
                        <label class="option">
                            <span>${options}</span>
                        </label>`
    });
    quizResult += `
                    </div>
                    <div class="answersBox">
                        <span>
                            <b>Correct Answer : </b> ${element.correctAnswer}
                        </span>
                        <span>
                            <b>Your Answer : </b> ${s_val[index]}
                        </span>
                    </div>
                </div>`;
  });

  var quizresulHdng = `<div>
        <h1 class="hdng">Result</h1>
        <div class="testResult">
            <div>
                <span>${quesList.length}</span>
                Total Question
            </div>
            <div>
                <span>${corrCount}</span>
                Correct
            </div>
            <div>
                <span>${wrongCount}</span>
                Incorrect
            </div>
            <div>
                <span>${notAttCount}</span>
                Not Attempted
            </div>
        </div>
        <div class="r_option">
            <span class="empty">Not Attempted</span>
            <span class="correct">Corect</span>
            <span class="wrong">Incorrect</span>
        </div>
    </div>`;

  document.querySelector(".quizHdng").innerHTML = quizresulHdng;
  document.querySelector("#quiz_container .inner").innerHTML = quizResult;
  document.querySelector(".quizBody").classList.add("result_page");
}
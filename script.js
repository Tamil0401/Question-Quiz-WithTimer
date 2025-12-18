const questions = [
  {
    q: "Which language runs in browser?",
    o: ["Java", "Python", "C", "JavaScript"],
    a: "JavaScript",
  },
  {
    q: "HTML stands for?",
    o: ["Hyper Text Markup Language", "High Text Machine", "Tool", "None"],
    a: "Hyper Text Markup Language",
  },
  {
    q: "CSS is used for?",
    o: ["Logic", "Styling", "DB", "Server"],
    a: "Styling",
  },
  { q: "JS variable keyword?", o: ["int", "var", "string", "float"], a: "var" },
  {
    q: "Which is not JS data type?",
    o: ["Number", "Boolean", "Float", "Undefined"],
    a: "Float",
  },
  { q: "Which operator checks type?", o: ["==", "=", "===", "!="], a: "===" },
  {
    q: "DOM stands for?",
    o: ["Document Object Model", "Data Object", "Design Object", "None"],
    a: "Document Object Model",
  },
  {
    q: "console.log() is used for?",
    o: ["Input", "Output", "Loop", "Condition"],
    a: "Output",
  },
  { q: "Which is loop?", o: ["for", "if", "switch", "break"], a: "for" },
  { q: "JS comments?", o: ["<!-- -->", "//", "**", "##"], a: "//" },
];

let index = 0;
let answers = Array(questions.length).fill(null);
let review = Array(questions.length).fill(false);

/* Timer */
let time = 600;
const timerEl = document.getElementById("timer");
const timer = setInterval(() => {
  let min = Math.floor(time / 60);
  let sec = time % 60;
  timerEl.textContent = `Time: ${min}:${sec < 10 ? "0" : ""}${sec}`;
  time--;
  if (time < 0) submitExam();
}, 1000);

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const paletteEl = document.getElementById("palette");

function loadQuestion() {
  questionEl.textContent = `Q${index + 1}. ${questions[index].q}`;
  optionsEl.innerHTML = "";

  questions[index].o.forEach((opt) => {
    optionsEl.innerHTML += `
            <li>
                <label>
                    <input type="radio" name="option" value="${opt}"
                    ${answers[index] === opt ? "checked" : ""}>
                    ${opt}
                </label>
            </li>`;
  });
  updatePalette();
}

function saveAnswer() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (selected) answers[index] = selected.value;
}

function nextQuestion() {
  saveAnswer();
  if (index < questions.length - 1) index++;
  loadQuestion();
}

function prevQuestion() {
  saveAnswer();
  if (index > 0) index--;
  loadQuestion();
}

function markReview() {
  review[index] = true;
  updatePalette();
}

function updatePalette() {
  paletteEl.innerHTML = "";
  questions.forEach((_, i) => {
    let btn = document.createElement("button");
    btn.textContent = i + 1;

    if (answers[i]) btn.classList.add("answered");
    if (review[i]) btn.classList.add("review");

    btn.onclick = () => {
      saveAnswer();
      index = i;
      loadQuestion();
    };
    paletteEl.appendChild(btn);
  });
}

function submitExam() {
  clearInterval(timer);
  document.getElementById("examArea").classList.add("hidden");
  document.getElementById("resultArea").classList.remove("hidden");

  let score = 0;
  let summary = "";

  questions.forEach((q, i) => {
    const correct = q.a === answers[i];
    if (correct) score++;

    summary += `
            <p class="${correct ? "correct" : "wrong"}">
                Q${i + 1}. ${q.q}<br>
                Your Answer: ${answers[i] || "Not Answered"}<br>
                Correct Answer: ${q.a}
            </p><hr>`;
  });

  let percent = (score / questions.length) * 100;
  let grade = percent >= 80 ? "A" : percent >= 60 ? "B" : "C";

  document.getElementById(
    "finalScore"
  ).textContent = `Score: ${score}/${questions.length}`;
  document.getElementById("percentage").textContent = `Percentage: ${percent}%`;
  document.getElementById("grade").textContent = `Grade: ${grade}`;
  document.getElementById("answerSummary").innerHTML = summary;
}

loadQuestion();

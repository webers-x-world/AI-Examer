/* ==========================================================================
   Kashiful Uloom Computer Class — Basic Computer Course
   Online MCQ Test — Exam Engine (Hinglish version + Answer Review)
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     Question bank (Hinglish). Technical/proper nouns (CPU, RAM, MS Word,
     shortcut keys like "Ctrl + B") are kept as-is since these are used
     the same way in Hindi/Hinglish speech.
     Each entry: { q, o: [4 options], k: index (0-3) of correct option }.
  ------------------------------------------------------------------ */
  const BANK = [
    { q: "Computer mein instructions ko process karne ke liye kaun jimmedar hota hai?", o: ["RAM", "CPU", "Monitor", "Keyboard"], k: 1 },
    { q: "CPU ka kaunsa unit arithmetic aur logical operations perform karta hai?", o: ["CU", "ALU", "RAM", "ROM"], k: 1 },
    { q: "Inme se kaunsa system software ka example hai?", o: ["MS Word", "MS PowerPoint", "Windows", "Calculator"], k: 2 },
    { q: "Computer band hone par kaunsi memory ka data delete ho jata hai?", o: ["ROM", "Hard Disk", "RAM", "SSD"], k: 2 },
    { q: "Inme se kaunsa ek output device hai?", o: ["Scanner", "Keyboard", "Mouse", "Monitor"], k: 3 },
    { q: "Operating system ka main purpose kya hota hai?", o: ["Sirf presentations banana", "Computer hardware aur software ko manage karna", "Sirf documents print karna", "Sirf websites browse karna"], k: 1 },
    { q: "Digital data ki sabse chhoti unit kaunsi hoti hai?", o: ["Byte", "Bit", "KB", "MB"], k: 1 },
    { q: "Files ko permanently store karne ke liye generally kya use hota hai?", o: ["RAM", "Cache", "SSD", "Register"], k: 2 },
    { q: "Select kiye gaye text ko bold karne ke liye kaunsa shortcut use hota hai?", o: ["Ctrl + B", "Ctrl + D", "Ctrl + M", "Ctrl + T"], k: 0 },
    { q: "MS Word mein commonly galat spell hue words ko automatically correct karne wala feature kaunsa hai?", o: ["AutoFormat", "AutoCorrect", "WordArt", "Mail Merge"], k: 1 },
    { q: "Kaunsi alignment text ko left aur right dono margins ke sath evenly align karti hai?", o: ["Left", "Right", "Center", "Justify"], k: 3 },
    { q: "Mail Merge ka purpose kya hai?", o: ["Do documents ko ek document mein merge karna", "Multiple recipients ke liye personalized documents banana", "Page ka color change karna", "Pictures insert karna"], k: 1 },
    { q: "Har page ke top ya bottom par text place karne ke liye kaunsa option use hota hai?", o: ["WordArt", "Header and Footer", "Text Box", "Page Border"], k: 1 },
    { q: "MS Word mein Find dialog box kaunsa shortcut open karta hai?", o: ["Ctrl + F", "Ctrl + H", "Ctrl + G", "Ctrl + K"], k: 0 },
    { q: "MS Word mein Ctrl + Enter press karne par kya hota hai?", o: ["Naya paragraph create hota hai", "Page break insert hota hai", "Document close ho jata hai", "Text center ho jata hai"], k: 1 },
    { q: "Automatically ordered list generate karne ke liye kaunsa feature use hota hai?", o: ["Bullets and Numbering", "WordArt", "Mail Merge", "Track Changes"], k: 0 },
    { q: "PowerPoint presentation ke basic individual page ko kya kehte hain?", o: ["Sheet", "Slide", "Document", "Frame"], k: 1 },
    { q: "Multiple slides ko arrange aur reorder karne ke liye mainly kaunsa view use hota hai?", o: ["Normal View", "Slide Sorter View", "Reading View", "Notes Page"], k: 1 },
    { q: "Kaunsa feature control karta hai ki ek slide dusri slide mein kaise change hoti hai?", o: ["Animation", "Transition", "Design", "Layout"], k: 1 },
    { q: "Slide ke andar objects par movement effects apply karne ke liye kaunsa feature use hota hai?", o: ["Transition", "Animation", "Theme", "Layout"], k: 1 },
    { q: "PowerPoint slideshow ko beginning se start karne ke liye kaunsa shortcut use hota hai?", o: ["F2", "F5", "F7", "F12"], k: 1 },
    { q: "PowerPoint mein current slide se slideshow start karne ke liye kaunsa shortcut use hota hai?", o: ["Shift + F5", "Ctrl + F5", "Alt + F5", "Shift + F7"], k: 0 },
    { q: "Kaunsa PowerPoint feature poori presentation mein same design style apply karne deta hai?", o: ["Slide Master", "Slide Sorter", "Animation Pane", "Notes"], k: 0 },
    { q: "Modern PowerPoint presentation ke sath commonly kaunsi file extension associate hoti hai?", o: [".docx", ".xlsx", ".pptx", ".txt"], k: 2 },
    { q: "Last action ko undo karne ke liye kaunsa shortcut use hota hai?", o: ["Ctrl + Y", "Ctrl + Z", "Ctrl + U", "Ctrl + X"], k: 1 },
    { q: "Bahut saare Microsoft Office applications mein kisi undone action ko redo/repeat karne ke liye kaunsa shortcut use hota hai?", o: ["Ctrl + Y", "Ctrl + R", "Ctrl + E", "Ctrl + W"], k: 0 },
    { q: "Sara content select karne ke liye kaunsa shortcut use hota hai?", o: ["Ctrl + S", "Ctrl + A", "Ctrl + L", "Ctrl + Q"], k: 1 },
    { q: "Document save karne ke liye commonly kaunsa shortcut use hota hai?", o: ["Ctrl + P", "Ctrl + D", "Ctrl + S", "Ctrl + Shift + S"], k: 2 },
    { q: "Document print karne ke liye kaunsa shortcut use hota hai?", o: ["Ctrl + P", "Ctrl + R", "Ctrl + Shift + P", "Alt + P"], k: 0 },
    { q: "Aapne galti se MS Word mein ek paragraph delete kar diya aur turant wapas lana chahte hain. Kaunsa shortcut use karenge?", o: ["Ctrl + Y", "Ctrl + Z", "Ctrl + X", "Ctrl + B"], k: 1 }
  ];

  const TOTAL_QUESTIONS = BANK.length; // 30
  const EXAM_DURATION_MS = 20 * 60 * 1000; // 20 minutes
  const STORAGE_KEY = 'kuc_exam_state_v1';
  const LETTERS = ['A', 'B', 'C', 'D'];

  /* ------------------------------------------------------------------
     DOM references
  ------------------------------------------------------------------ */
  const screenStart = document.getElementById('screen-start');
  const screenExam = document.getElementById('screen-exam');
  const screenResult = document.getElementById('screen-result');

  const overlayResume = document.getElementById('overlay-resume');
  const resumeNameEl = document.getElementById('resume-name');
  const resumeBtn = document.getElementById('resume-btn');

  const startForm = document.getElementById('start-form');
  const nameInput = document.getElementById('student-name');
  const startBtn = document.getElementById('start-btn');

  const studentNameDisplay = document.getElementById('student-name-display');
  const timerCard = document.getElementById('timer-card');
  const timerDisplay = document.getElementById('timer-display');

  const progressText = document.getElementById('progress-text');
  const progressFill = document.getElementById('progress-fill');
  const progressTrack = document.querySelector('.progress-track');

  const questionNumberEl = document.getElementById('question-number');
  const questionTextEl = document.getElementById('question-text');
  const optionsListEl = document.getElementById('options-list');
  const lockHintEl = document.getElementById('lock-hint');
  const nextBtn = document.getElementById('next-btn');

  const overlayConfirm = document.getElementById('overlay-confirm');
  const confirmCancelBtn = document.getElementById('confirm-cancel-btn');
  const confirmSubmitBtn = document.getElementById('confirm-submit-btn');

  const statusBanner = document.getElementById('status-banner');
  const statusTitleEl = document.getElementById('status-title');
  const statusDetailEl = document.getElementById('status-detail');
  const resultStudentNameEl = document.getElementById('result-student-name');
  const resultScoreEl = document.getElementById('result-score');
  const resultPercentageEl = document.getElementById('result-percentage');
  const statTotalEl = document.getElementById('stat-total');
  const statAttemptedEl = document.getElementById('stat-attempted');
  const statUnansweredEl = document.getElementById('stat-unanswered');
  const statCorrectEl = document.getElementById('stat-correct');
  const statWrongEl = document.getElementById('stat-wrong');
  const reviewListEl = document.getElementById('review-list');

  /* ------------------------------------------------------------------
     Runtime state
  ------------------------------------------------------------------ */
  let state = null;
  let timerInterval = null;
  let antiCheatAttached = false;
  let fsEngaged = false;

  /* ------------------------------------------------------------------
     Storage helpers
  ------------------------------------------------------------------ */
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return null;
      if (!Array.isArray(parsed.answers) || parsed.answers.length !== TOTAL_QUESTIONS) return null;
      return parsed;
    } catch (e) {
      return null;
    }
  }

  function saveState() {
    if (!state) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* storage unavailable — exam continues in-memory for this session */
    }
  }

  /* ------------------------------------------------------------------
     Screen visibility
  ------------------------------------------------------------------ */
  function showStart() {
    screenStart.classList.remove('hidden');
    screenExam.classList.add('hidden');
    screenResult.classList.add('hidden');
    overlayResume.classList.add('hidden');
    document.body.classList.remove('exam-active');
  }

  function showExam() {
    screenStart.classList.add('hidden');
    screenExam.classList.remove('hidden');
    screenResult.classList.add('hidden');
    overlayResume.classList.add('hidden');
    document.body.classList.add('exam-active');
  }

  function showResult() {
    screenStart.classList.add('hidden');
    screenExam.classList.add('hidden');
    screenResult.classList.remove('hidden');
    overlayResume.classList.add('hidden');
    document.body.classList.remove('exam-active');
  }

  function showResumeOverlay() {
    screenStart.classList.add('hidden');
    screenExam.classList.add('hidden');
    screenResult.classList.add('hidden');
    resumeNameEl.textContent = state.name;
    overlayResume.classList.remove('hidden');
  }

  function showConfirmModal() {
    overlayConfirm.classList.remove('hidden');
  }

  function hideConfirmModal() {
    overlayConfirm.classList.add('hidden');
  }

  /* ------------------------------------------------------------------
     Fullscreen helpers
  ------------------------------------------------------------------ */
  function requestFullscreenSafely() {
    const el = document.documentElement;
    const req = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
    if (!req) return;
    try {
      const result = req.call(el);
      if (result && typeof result.catch === 'function') {
        result.catch(function () { /* denied or unsupported here — continue without it */ });
      }
    } catch (e) { /* ignore */ }
  }

  function exitFullscreenSafely() {
    if (!document.fullscreenElement) return;
    const exit = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
    if (!exit) return;
    try {
      const result = exit.call(document);
      if (result && typeof result.catch === 'function') result.catch(function () {});
    } catch (e) { /* ignore */ }
  }

  /* ------------------------------------------------------------------
     Anti-cheating handlers
  ------------------------------------------------------------------ */
  function preventDefaultHandler(e) {
    e.preventDefault();
  }

  function onVisibilityChange() {
    if (document.hidden && state && state.status === 'in-progress') {
      finalizeExam('focus-lost');
    }
  }

  function onWindowBlur() {
    if (state && state.status === 'in-progress') {
      finalizeExam('focus-lost');
    }
  }

  function onFullscreenChange() {
    const isFs = !!document.fullscreenElement;
    if (isFs) {
      fsEngaged = true;
    } else if (fsEngaged && state && state.status === 'in-progress') {
      finalizeExam('focus-lost');
    }
  }

  function onKeyDown(e) {
    const key = e.key ? e.key.toLowerCase() : '';
    const ctrlOrCmd = e.ctrlKey || e.metaKey;

    if (e.key === 'F12') { e.preventDefault(); return; }
    if (ctrlOrCmd && e.shiftKey && (key === 'i' || key === 'j' || key === 'c')) { e.preventDefault(); return; }
    if (ctrlOrCmd && !e.shiftKey && (key === 'c' || key === 'x' || key === 'v' || key === 'a' || key === 'u' || key === 's' || key === 'p')) {
      e.preventDefault();
    }
  }

  function onBeforeUnload(e) {
    if (state && state.status === 'in-progress') {
      e.preventDefault();
      e.returnValue = '';
    }
  }

  function onPopState() {
    if (state && state.status === 'in-progress') {
      window.history.pushState(null, '', window.location.href);
    }
  }

  function attachAntiCheat() {
    if (antiCheatAttached) return;
    antiCheatAttached = true;
    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('blur', onWindowBlur);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);
    document.addEventListener('contextmenu', preventDefaultHandler);
    document.addEventListener('selectstart', preventDefaultHandler);
    document.addEventListener('copy', preventDefaultHandler);
    document.addEventListener('cut', preventDefaultHandler);
    document.addEventListener('paste', preventDefaultHandler);
    document.addEventListener('dragstart', preventDefaultHandler);
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('beforeunload', onBeforeUnload);
    window.addEventListener('popstate', onPopState);
    window.history.pushState(null, '', window.location.href);
  }

  function detachAntiCheat() {
    if (!antiCheatAttached) return;
    antiCheatAttached = false;
    document.removeEventListener('visibilitychange', onVisibilityChange);
    window.removeEventListener('blur', onWindowBlur);
    document.removeEventListener('fullscreenchange', onFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
    document.removeEventListener('contextmenu', preventDefaultHandler);
    document.removeEventListener('selectstart', preventDefaultHandler);
    document.removeEventListener('copy', preventDefaultHandler);
    document.removeEventListener('cut', preventDefaultHandler);
    document.removeEventListener('paste', preventDefaultHandler);
    document.removeEventListener('dragstart', preventDefaultHandler);
    document.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('beforeunload', onBeforeUnload);
    window.removeEventListener('popstate', onPopState);
  }

  /* ------------------------------------------------------------------
     NOTE: an earlier version of this file also watched
     window.outerWidth/innerWidth to guess at docked devtools. That
     heuristic is removed — browser zoom (Ctrl +/-, pinch-zoom, OS
     display scaling) changes those same values and was wrongly
     ending exams for students who simply zoomed the page. Devtools
     deterrence is still handled by blocking F12 / Ctrl+Shift+I / etc.
     in onKeyDown, and by the focus/visibility/fullscreen checks above.
  ------------------------------------------------------------------ */

  /* ------------------------------------------------------------------
     Timer
  ------------------------------------------------------------------ */
  function startTimer() {
    stopTimer();
    updateTimerDisplay();
    timerInterval = setInterval(updateTimerDisplay, 500);
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function updateTimerDisplay() {
    if (!state || state.status !== 'in-progress') return;
    const remaining = state.endsAt - Date.now();

    if (remaining <= 0) {
      timerDisplay.textContent = '00:00';
      finalizeExam('expired');
      return;
    }

    const totalSeconds = Math.ceil(remaining / 1000);
    const mm = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const ss = String(totalSeconds % 60).padStart(2, '0');
    timerDisplay.textContent = mm + ':' + ss;

    timerCard.classList.remove('timer-warning', 'timer-critical');
    if (remaining <= 60 * 1000) {
      timerCard.classList.add('timer-critical');
    } else if (remaining <= 5 * 60 * 1000) {
      timerCard.classList.add('timer-warning');
    }
  }

  /* ------------------------------------------------------------------
     Question rendering & answering
  ------------------------------------------------------------------ */
  function renderQuestion() {
    const idx = state.currentIndex;
    const item = BANK[idx];

    questionNumberEl.textContent = 'Sawaal ' + (idx + 1);
    questionTextEl.textContent = item.q;
    progressText.textContent = 'Sawaal ' + (idx + 1) + ' of ' + TOTAL_QUESTIONS;
    progressFill.style.width = (((idx + 1) / TOTAL_QUESTIONS) * 100) + '%';
    if (progressTrack) progressTrack.setAttribute('aria-valuenow', String(idx + 1));

    optionsListEl.innerHTML = '';
    const existingAnswer = state.answers[idx];

    item.o.forEach(function (optionText, i) {
      const row = document.createElement('button');
      row.type = 'button';
      row.className = 'option-row';
      row.setAttribute('role', 'radio');

      const letterSpan = document.createElement('span');
      letterSpan.className = 'option-letter';
      letterSpan.textContent = LETTERS[i];

      const textSpan = document.createElement('span');
      textSpan.className = 'option-text';
      textSpan.textContent = optionText;

      row.appendChild(letterSpan);
      row.appendChild(textSpan);

      if (existingAnswer !== null && existingAnswer !== undefined) {
        row.disabled = true;
        if (i === existingAnswer) {
          row.classList.add('selected');
          row.setAttribute('aria-checked', 'true');
        } else {
          row.classList.add('locked-out');
          row.setAttribute('aria-checked', 'false');
        }
      } else {
        row.setAttribute('aria-checked', 'false');
        row.addEventListener('click', function () { selectOption(i); });
      }

      optionsListEl.appendChild(row);
    });

    const isLast = idx === TOTAL_QUESTIONS - 1;
    nextBtn.textContent = isLast ? 'Exam Submit Karein' : 'Agla Sawaal';

    if (existingAnswer !== null && existingAnswer !== undefined) {
      nextBtn.disabled = false;
      lockHintEl.textContent = 'Aapka answer lock ho gaya hai, ab change nahi ho sakta.';
    } else {
      nextBtn.disabled = true;
      lockHintEl.textContent = 'Aage badhne ke liye ek option select karein. Select karte hi answer lock ho jayega.';
    }
  }

  function selectOption(i) {
    if (!state || state.status !== 'in-progress') return;
    const idx = state.currentIndex;
    if (state.answers[idx] !== null && state.answers[idx] !== undefined) return;
    state.answers[idx] = i;
    saveState();
    renderQuestion();
  }

  function advanceQuestion() {
    if (!state || state.currentIndex >= TOTAL_QUESTIONS - 1) return;
    state.currentIndex += 1;
    saveState();
    renderQuestion();
  }

  function attemptSubmit() {
    const unanswered = state.answers.filter(function (a) { return a === null || a === undefined; }).length;
    if (unanswered > 0) {
      showConfirmModal();
    } else {
      finalizeExam('completed');
    }
  }

  /* ------------------------------------------------------------------
     Scoring — includes a full per-question review (your answer vs
     the correct answer) so the result screen can show it.
  ------------------------------------------------------------------ */
  function computeResult() {
    let correct = 0;
    let wrong = 0;
    let attempted = 0;
    const review = [];

    for (let i = 0; i < TOTAL_QUESTIONS; i++) {
      const a = state.answers[i];
      const answered = a !== null && a !== undefined;
      const isCorrect = answered && a === BANK[i].k;

      if (answered) {
        attempted++;
        if (isCorrect) correct++; else wrong++;
      }

      review.push({
        index: i,
        question: BANK[i].q,
        selected: answered ? a : null,
        selectedText: answered ? BANK[i].o[a] : null,
        correctIndex: BANK[i].k,
        correctText: BANK[i].o[BANK[i].k],
        answered: answered,
        isCorrect: isCorrect
      });
    }

    const unanswered = TOTAL_QUESTIONS - attempted;
    const score = correct;
    const percentage = Math.round((score / TOTAL_QUESTIONS) * 100 * 100) / 100;

    return { attempted: attempted, unanswered: unanswered, correct: correct, wrong: wrong, score: score, percentage: percentage, review: review };
  }

  /* ------------------------------------------------------------------
     Finalization
  ------------------------------------------------------------------ */
  function finalizeExam(status) {
    if (!state || state.status !== 'in-progress') return;
    stopTimer();
    detachAntiCheat();
    exitFullscreenSafely();

    state.status = status;
    state.result = computeResult();
    state.endedAt = Date.now();
    saveState();

    renderResult();
    showResult();
  }

  function renderResult() {
    const r = state.result || computeResult();

    resultStudentNameEl.textContent = state.name;
    resultScoreEl.textContent = r.score + ' / ' + TOTAL_QUESTIONS;
    resultPercentageEl.textContent = r.percentage.toFixed(2) + '%';
    statTotalEl.textContent = String(TOTAL_QUESTIONS);
    statAttemptedEl.textContent = String(r.attempted);
    statUnansweredEl.textContent = String(r.unanswered);
    statCorrectEl.textContent = String(r.correct);
    statWrongEl.textContent = String(r.wrong);

    statusBanner.classList.remove('status-completed', 'status-expired', 'status-violation');

    let cls = 'status-completed';
    let title = 'Exam Complete';
    let detail = 'Aapne exam successfully complete kar liya hai.';

    switch (state.status) {
      case 'completed':
        cls = 'status-completed';
        title = 'Exam Complete';
        detail = 'Aapne exam successfully complete kar liya hai.';
        break;
      case 'expired':
        cls = 'status-expired';
        title = 'Time Khatam';
        detail = '20-minute ki time limit khatam ho gayi hai. Us waqt tak ke aapke answers save ho chuke hain.';
        break;
      case 'focus-lost':
        cls = 'status-violation';
        title = 'Focus Lost';
        detail = 'Aapka exam terminate kar diya gaya kyunki aap exam window se bahar chale gaye the.';
        break;
      case 'terminated':
        cls = 'status-violation';
        title = 'Exam Terminated';
        detail = 'Unauthorized browser/debugging activity detect hui hai.';
        break;
    }

    statusBanner.classList.add(cls);
    statusTitleEl.textContent = title;
    statusDetailEl.textContent = detail;

    renderReview(r.review);
  }

  /* ------------------------------------------------------------------
     Answer review — per question: correct / wrong / unanswered,
     with the student's answer and, when wrong or unanswered, the
     correct answer shown alongside it.
  ------------------------------------------------------------------ */
  function renderReview(review) {
    if (!reviewListEl) return;
    reviewListEl.innerHTML = '';

    review.forEach(function (item) {
      const row = document.createElement('div');
      let badgeClass = 'review-badge-correct';
      let badgeText = 'Sahi';

      if (!item.answered) {
        badgeClass = 'review-badge-unanswered';
        badgeText = 'Answer Nahi Diya';
      } else if (!item.isCorrect) {
        badgeClass = 'review-badge-wrong';
        badgeText = 'Galat';
      }

      row.className = 'review-item';

      const head = document.createElement('div');
      head.className = 'review-item-head';

      const qNum = document.createElement('span');
      qNum.className = 'review-item-number';
      qNum.textContent = 'Sawaal ' + (item.index + 1);

      const badge = document.createElement('span');
      badge.className = 'review-badge ' + badgeClass;
      badge.textContent = badgeText;

      head.appendChild(qNum);
      head.appendChild(badge);

      const qText = document.createElement('p');
      qText.className = 'review-item-question';
      qText.textContent = item.question;

      const answersWrap = document.createElement('div');
      answersWrap.className = 'review-item-answers';

      const yourAnswer = document.createElement('p');
      yourAnswer.className = 'review-answer-line';
      const yourLabel = document.createElement('span');
      yourLabel.className = 'review-answer-label';
      yourLabel.textContent = 'Aapka Jawab: ';
      yourAnswer.appendChild(yourLabel);
      const yourValue = document.createElement('span');
      yourValue.className = item.answered ? (item.isCorrect ? 'review-value-correct' : 'review-value-wrong') : 'review-value-muted';
      yourValue.textContent = item.answered ? item.selectedText : 'Koi answer nahi diya';
      yourAnswer.appendChild(yourValue);
      answersWrap.appendChild(yourAnswer);

      if (!item.answered || !item.isCorrect) {
        const correctAnswer = document.createElement('p');
        correctAnswer.className = 'review-answer-line';
        const correctLabel = document.createElement('span');
        correctLabel.className = 'review-answer-label';
        correctLabel.textContent = 'Sahi Jawab: ';
        correctAnswer.appendChild(correctLabel);
        const correctValue = document.createElement('span');
        correctValue.className = 'review-value-correct';
        correctValue.textContent = item.correctText;
        correctAnswer.appendChild(correctValue);
        answersWrap.appendChild(correctAnswer);
      }

      row.appendChild(head);
      row.appendChild(qText);
      row.appendChild(answersWrap);
      reviewListEl.appendChild(row);
    });
  }

  /* ------------------------------------------------------------------
     Starting / resuming the exam
  ------------------------------------------------------------------ */
  function startExam(name) {
    const now = Date.now();
    state = {
      name: name,
      startedAt: now,
      endsAt: now + EXAM_DURATION_MS,
      currentIndex: 0,
      answers: new Array(TOTAL_QUESTIONS).fill(null),
      status: 'in-progress',
      result: null
    };
    saveState();
    engageExam();
  }

  function engageExam() {
    studentNameDisplay.textContent = state.name;
    attachAntiCheat();
    requestFullscreenSafely();
    showExam();
    renderQuestion();
    startTimer();
  }

  /* ------------------------------------------------------------------
     Event wiring
  ------------------------------------------------------------------ */
  nameInput.addEventListener('input', function () {
    startBtn.disabled = nameInput.value.trim().length < 2;
  });

  startForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = nameInput.value.trim();
    if (name.length < 2) return;
    startExam(name);
  });

  resumeBtn.addEventListener('click', function () {
    engageExam();
  });

  nextBtn.addEventListener('click', function () {
    if (!state || state.status !== 'in-progress') return;
    if (state.currentIndex === TOTAL_QUESTIONS - 1) {
      attemptSubmit();
    } else {
      advanceQuestion();
    }
  });

  confirmCancelBtn.addEventListener('click', function () {
    hideConfirmModal();
  });

  confirmSubmitBtn.addEventListener('click', function () {
    hideConfirmModal();
    finalizeExam('completed');
  });

  /* ------------------------------------------------------------------
     Boot
  ------------------------------------------------------------------ */
  function init() {
    const saved = loadState();

    if (!saved) {
      showStart();
      return;
    }

    state = saved;

    if (state.status !== 'in-progress') {
      renderResult();
      showResult();
      return;
    }

    if (Date.now() >= state.endsAt) {
      // Deadline already passed while the page was closed/refreshed.
      finalizeExam('expired');
      return;
    }

    showResumeOverlay();
  }

  init();
})();

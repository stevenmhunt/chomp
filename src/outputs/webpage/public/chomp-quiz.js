
// get all of the quiz components on the page...
document.querySelectorAll('.chomp-quiz').forEach(function (e) {

    function getQuestionCount() {
        return e.querySelectorAll('.chomp-quiz-question').length;
    }

    function getHomeButton() {
        return e.querySelector('.chomp-quiz-home');
    }

    function getNextButton() {
        return e.querySelector('.chomp-quiz-next');
    }

    function setSelectedIndex(value) {
        const itemCount = getQuestionCount();
        if (value >= itemCount || value < 0) {
            throw new Error('Index is out of bounds!');
        }
        e.querySelectorAll('.chomp-quiz-question').forEach(function (v, i) {
            v.style.display = i === value ? 'block' : 'none';
        });
        e.setAttribute('data-selected', value.toString());        
        e.querySelectorAll('.chomp-quiz-answer').forEach(function (a) {
            a.classList.remove('chomp-quiz-correct');
            a.classList.remove('chomp-quiz-incorrect');
        });
        e.querySelector('.chomp-quiz-status').innerHTML = 'Question ' + (value + 1) + ' of ' + itemCount;
        getNextButton().style.display = (value >= (itemCount - 1)) ? 'none' : 'block';
    }

    function getSelectedIndex() {
        if (!e.getAttribute('data-selected')) {
            setSelectedIndex(0);
        }
        return parseInt(e.getAttribute('data-selected'), 10);
    }

    function next() {
        const index = getSelectedIndex();
        setSelectedIndex(index + 1);
    }

    function home() {
        setSelectedIndex(0);
    }

    function answer(e) {
        const actual = e.target.getAttribute('data-answer');
        const expected = e.target.parentElement.getAttribute('data-answer');
        e.target.parentElement.querySelectorAll('.chomp-quiz-answer').forEach(function (a) {
            a.classList.remove('chomp-quiz-correct');
            a.classList.remove('chomp-quiz-incorrect');
        });
        const isCorrect = (expected === actual);
        e.target.classList.add('chomp-quiz-' + (isCorrect ? 'correct' : 'incorrect'));
        if (isCorrect) {
            confetti();
        }
    }

    getHomeButton().addEventListener('click', home);
    getNextButton().addEventListener('click', next);
    e.querySelectorAll('.chomp-quiz-answer').forEach(function (a) {
        a.addEventListener('click', answer);
    });
    getSelectedIndex();
});
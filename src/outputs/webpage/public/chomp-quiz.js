
// get all of the quiz components on the page...
document.querySelectorAll('.chomp-quiz').forEach(function (e) {

    function getItemCount() {
        return e.querySelectorAll('.chomp-quiz-item').length;
    }

    function getBackButton() {
        return e.querySelector('.chomp-quiz-back');
    }

    function getNextButton() {
        return e.querySelector('.chomp-quiz-next');
    }

    function setSelectedIndex(value) {
        const itemCount = getItemCount();
        if (value >= itemCount || value < 0) {
            throw new Error('Index is out of bounds!');
        }
        e.querySelectorAll('.chomp-quiz-item').forEach(function (v, i) {
            v.style.display = i === value ? 'block' : 'none';
        });
        e.setAttribute('data-selected', value.toString());

        getBackButton().disabled = value === 0 ? 'disabled' : undefined;
        getNextButton().disabled = value === itemCount - 1 ? 'disabled' : undefined;
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

    function back() {
        const index = getSelectedIndex();
        setSelectedIndex(index - 1);
    }

    getBackButton().addEventListener('click', back);
    getNextButton().addEventListener('click', next);
    getSelectedIndex();
});
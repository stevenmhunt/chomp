const _ = require('lodash');
const path = require('path');
const { getBuildContext } = require('../../buildContext');
const { bootstrap, fontAwesome, confetti } = require('../../modules/webpage');
const { wrapHeaderFooter } = require('./helpers');

module.exports = async function webpageQuizOutput({ items, header, footer, key }) {
    const context = getBuildContext(key);

    // configure prerequisites:
    context.addModule(bootstrap);
    context.addModule(confetti);
    context.addModule(fontAwesome);
    context.addFile('./js/chomp-quiz.js', `filepath:${path.join(__dirname, './public/chomp-quiz.js')}`, 'script');
    context.addFile('./js/chomp-quiz.css', `filepath:${path.join(__dirname, './public/chomp-quiz.css')}`, 'stylesheet');

    // render output:
    function getAnswerListHtml(item) {
        return _.keys(item).filter(i => i.startsWith('answer') && i !== 'answer').map(k => `
        <div class="chomp-quiz-answer" data-answer="${k}">${item[k]}</div>
        `).join('');
    }
    const htmlItems = items.map(item => `
    <div class="chomp-quiz-question" data-answer="${item.answer}" style="display: none;">
        <div class="chomp-quiz-qtext">${item.question}</div>
        ${getAnswerListHtml(item)}
    </div>
    `).join('');

    const innerHtml = wrapHeaderFooter({ header, footer }, `
    <div class="chomp-quiz col">
        ${htmlItems}
        <div class="chomp-quiz-footer">
            <button class="btn btn-success btn-lg chomp-quiz-home">Start Over</button>
            <div class="chomp-quiz-status"></div>
            <button class="btn btn-primary btn-lg chomp-quiz-next">Next Question&nbsp;<i class="fa-solid fa-chevron-right"></i></button>
        </div>
    </div>`);
    return `<div class="col-lg-8 col-md-8 col-sm-8 container justify-content-center">${innerHtml}</div>`;
}
const path = require('path');
const { getBuildContext } = require('../../buildContext');
const { bootstrap } = require('../../modules/webpage');
const { renderHtmlItems, wrapHeaderFooter } = require('./helpers');

module.exports = async function webpageQuizOutput({ items, header, footer, key }) {
    const context = getBuildContext(key);

    // configure prerequisites:
    context.addModule(bootstrap);
    context.addFile('./js/chomp-quiz.js', `filepath:${path.join(__dirname, './public/chomp-quiz.js')}`, 'script');
    context.addFile('./js/chomp-quiz.css', `filepath:${path.join(__dirname, './public/chomp-quiz.css')}`, 'stylesheet');

    // render output:
    const quizTag = 'div class="chomp-quiz-item" style="display: none;"';
    const htmlItems = await renderHtmlItems(items, quizTag);
    const innerHtml = wrapHeaderFooter({ header, footer }, `
    <div class="chomp-quiz col">
        ${htmlItems}
        <div class="chomp-quiz-footer">
            <button class="btn btn-primary chomp-quiz-back">Back</button>
            <button class="btn btn-primary chomp-quiz-next">Next</button>
        </div>
    </div>`);
    return `<div class="col-lg-8 col-md-8 col-sm-8 container justify-content-center">${innerHtml}</div>`;
}
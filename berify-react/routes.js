const routes = require('next-routes');
module.exports = routes()
    .add('/', 'index')
    .add('/register/:type', 'Register')
    .add('/tracker', 'TrackerPage')
    .add('/faq', 'FAQPage')
    .add('/results', 'ResultPage')
    .add('/newcode', 'NewCodesPage')
    .add('/verify', 'VerifyPage')
    .add('/inks', 'InksPage');

const routes = require('next-routes');
module.exports = routes()
    .add('/', 'index')
    .add('/tracker', 'TrackerPage')
    .add('/faq', 'FAQPage')
    .add('/register', 'RegisterPage')
    .add('/results', 'ResultPage')
    .add('/newcode', 'NewCodesPage')
    .add('/verify', 'VerifyPage');

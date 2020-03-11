var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology: true,
    useNewUrlParser: true
};

mongoose.connect('mongodb+srv://BenAdmin:MyBenAdmin@2020@miam-jpk9b.mongodb.net/MYDOMOS?retryWrites=true&w=majority',
    options,
    function(error) {
        if (error) {
            console.log('*** DB ERROR:', error);
        } else {
            console.log('*** DB OK');
        }
    }
);

module.exports = mongoose;
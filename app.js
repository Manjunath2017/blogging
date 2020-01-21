// process.env.UV_THREADPOOL = 4;
// const cluster = require('cluster')

// if (cluster.isMaster) {
//     cluster.fork();
//     cluster.fork();
//     cluster.fork();
//     cluster.fork();
//     cluster.fork();
// } else 
// {
    const app = require('express')();

    const fileUpload = require('express-fileupload');
    app.use(fileUpload());

    const bodyParser = require('body-parser');

    // app.use(bodyParser.urlencoded({ extended: false }))
    // app.use(bodyParser.json());

    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

    app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({extended: true}));


    require('./models/posts'); //database schema using mongooseJs 
    require('./models/category'); //database schema using mongooseJs
    require('./models/comment'); //database schema using mongooseJs  

    const mongoose = require('./database/config');
    mongoose.connection.on('error', (err) => {
        console.log('mongodb server is turned OFF: \n sudo service mongod start' + err);
    });

    const routers = require('./routers/router');
    app.use('/', routers);

    
    var port = process.env.PORT || 5000;
    app.listen(port, (err) => {
        if (!err) {
            console.log(`server running on port ${port}`);
        } else {
            console.log(JSON.stringify(err));
        }
    });

// }

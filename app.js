var amqp = require('amqplib/callback_api');
var { RABBIT_MQ_URL } = './config.js'

amqp.connect(RABBIT_MQ_URL, function(err, conn) {
    conn.createChannel(function(err, ch) {
        var q = 'hello';
        var msg = 'Hello World 123!';
        ch.assertQueue(q, { durable: false });
        ch.sendToQueue(q, new Buffer(msg));
        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function() {
        conn.close();
        process.exit(0)
    }, 500);
});
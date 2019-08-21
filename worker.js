var amqp = require('amqplib/callback_api');
var { RABBIT_MQ_URL } = './config.js'



amqp.connect(RABBIT_MQ_URL, function(err, conn) {
    conn.createChannel(function(err, ch) {
        var q = 'hello';

        ch.assertQueue(q, { durable: false });
        ch.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        ch.consume(q, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, { noAck: true });
    });
});
const amqp = require("amqplib");
const {v4: uuidvv4} = require("uuid");

const uuid = uuidvv4();

const sampleRequest = {
    colors: 'g',
    types: ['legend', 'merfolk'],
    restrictions: ['rare']
}

const sendRequest = async () => {
    const connection = await amqp.connect('amqp://localhost');

    // create pipleline to rabbitMq
    const channel = await connection.createChannel();
    
    // remove after
    const q = await channel.assertQueue('serverToClientQ', {exclusive: true});

    console.log("Sending Request from client.");
    
    channel.sendToQueue('clientToServerQ', Buffer.from(JSON.stringify(sampleRequest)), {
        replyTo: q.queue,
        correlationId: uuid
    });

    console.log('sent: ', sampleRequest);

    channel.consume(q.queue, msg => {
        if (msg.properties.correlationId == uuid){
            console.log("received: %s", msg.content.toString())
            // wait for five seconds before closing
            setTimeout(() => {
                connection.close();
                process.exit(0);
            }, 500)
        }
    }, {noAck: true})
}

sendRequest();
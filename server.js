const amqp = require("amqplib");
const SCRYFALLAPI = 'https://api.scryfall.com/cards/search?q='
const colon = '%3A'

// returns query string from given request
function toQuery(z) {
    result = SCRYFALLAPI
    const zJson = JSON.parse(z)

    const colors = zJson['colors']
    const types = zJson['types']
    const restrictions = zJson['restrictions']

    if (colors.length > 0) {
        result += '+color' + colon + colors
    }

    if (types.length > 0) {
        for (let i = 0; i < types.length; i++) {
            result += '+type' + colon + types[i].toString()
        }
    }
    
    if (restrictions.length > 0) {
        for (let i = 0; i < restrictions.length; i++) {
            result += '+rarity' + colon + restrictions[i].toString()
        }
    }
    
    return result
}


const sendQuery = async () => {
    const connection = await amqp.connect('amqp://localhost');

    // create pipleline to rabbitMq
    const channel = await connection.createChannel();
    
    await channel.assertQueue('clientToServerQ');

    console.log("Server is ready. Waiting for requests.");

    channel.consume('clientToServerQ', msg => {
        const n = msg.content.toString();
        
        console.log("[X] Received: %s", n);

        const query = toQuery(n);

        channel.sendToQueue(msg.properties.replyTo, Buffer.from(query.toString()), {
            correlationId: msg.properties.correlationId
        });

        channel.ack(msg);

    }, {noACK: false})
}

sendQuery();
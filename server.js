const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });
const clients = {};

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        switch (data.type) {
            case 'join':
                clients[data.name] = ws;
                ws.name = data.name;
                break;
            case 'offer':
            case 'answer':
            case 'candidate':
                const target = clients[data.to];
                if (target) {
                    target.send(JSON.stringify({
                        type: data.type,
                        [data.type]: data[data.type],
                        from: ws.name
                    }));
                }
                break;
        }
    });

    ws.on('close', () => {
        delete clients[ws.name];
    });
});

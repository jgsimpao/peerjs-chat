$(document).ready(function() {
    const peer = new Peer();

    peer.on('open', function(id) {
        console.log('My peer ID is: ' + id);
    });
    
    const conn = peer.connect('dest-peer-id');

    conn.on('open', function() {
        // Send messages
        conn.send('Hello!');
    });

    peer.on('connection', function(conn) {
        // Receive messages
        conn.on('data', function(data) {
            console.log(data);
        });
    });
});

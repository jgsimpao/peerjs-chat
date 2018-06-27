$(document).ready(function() {
    const peer = new Peer({host:'peerjs-server-chat.herokuapp.com', secure:true, port:443});
    //const peer = new Peer();
    //const peer = new Peer({host: '/', port: '', path: '/app'});

    var conns = [];
    //var conn;

    peer.on('open', function(id) {
        $('#user-id').html(id);
    });
    
    $('#new-peer-btn').click(function() {
        //$('#peer-list').append('<h6 class="peer-id">' + $('#new-peer-id').val() + '</h6>');
        $('#peer-list').html($('#new-peer-id').val());
        /*
        $('.peer-id').each(function() {
            //const conn = peer.connect('dest-peer-id');
            conns.push(peer.connect($(this).val()));
            alert('conns.push: ' + $(this).val());
        });
        */
       /*
        conn = peer.connect($('#new-peer-id').val());
        alert('peer.connect: ' + $('#new-peer-id').val());
        */
    });
    
    // Send messages
    $('#new-message-btn').click(function() {
        $('#chat-window').append('<p class="chat-message">' + $('#new-message-text').val() + '</p>');
        /*
        conns.forEach(function(conn) {
            conn.on('open', function() {
                //conn.send('Hello!');
                conn.send($('#new-message-text').val());
                alert('conn.send: ' + $('#new-message-text').val());
            });
        });
        */
        const conn = peer.connect($('#peer-list').html());
        conn.on('open', function() {
            conn.send($('#new-message-text').val());
            alert('conn.send: ' + $('#new-message-text').val());
        });
    });

    // Receive messages
    peer.on('connection', function(conn) {
        conn.on('data', function(data) {
            //console.log(data);
            $('#chat-window').append('<p class="chat-message">' + data + '</p>');
            alert('$("#chat-window").append: ' + data);
        });
    });
});

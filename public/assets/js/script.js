$(document).ready(function() {
    const peer = new Peer();
    var peerIDs = [];
    
    peer.on('open', function(userID) {
        $('#user-id').html(userID);
    });
    
    $('#new-peer-btn').click(function() {
        $('#peer-list').append('<p class="peer-id">' + $('#new-peer-id').val() + '</p>');
        peerIDs.push($('#new-peer-id').val());
    });
    
    // Send messages
    $('#new-message-btn').click(function() {
        $('#chat-window').append('<p class="chat-message">' + $('#new-message-text').val() + '</p>');
        
        peerIDs.forEach(function(peerID) {
            var conn = peer.connect(peerID);

            conn.on('open', function() {
                conn.send($('#new-message-text').val());
            });
        });
    });

    // Receive messages
    peer.on('connection', function(conn) {
        conn.on('data', function(data) {
            $('#chat-window').append('<p class="chat-message">' + data + '</p>');
        });
    });
});

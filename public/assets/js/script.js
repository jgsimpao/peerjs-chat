$(document).ready(function() {
    const peer = new Peer();
    var userName = '';
    var userID = '';
    var peerIDs = [];

    $('#new-user-modal').modal({
        show: true,
        keyboard: false,
        backdrop: 'static'
    });

    $('#new-user-name').on('input', function(){
        userName = $('#new-user-name').val().trim();

        if (userName.length)
            $('#new-user-btn').prop('disabled', false);
        else
            $('#new-user-btn').prop('disabled', true);
    });

    peer.on('open', function(id) {
        userID = id;
    });

    $('#new-user-btn').click(function() {
        $('#user-name').html(userName);
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

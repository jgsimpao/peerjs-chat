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
        var newPeerID = $('#new-peer-id').val().trim();

        if (newPeerID.length) {
            if (peerIDs.includes(newPeerID)) {
                $('.new-peer-warning').show();
            } else {
                peerIDs.push(newPeerID);
                $('.new-peer-warning').hide();
                $('#peer-list').append('<p class="peer-id">' + newPeerID + ' <span class="peer-name"></span></p>');
            }
        }
    });
    
    // Send message to peers
    $('#new-message-btn').click(function() {
        var newMessage = $('#new-message-text').val().trim();

        if (newMessage.length) {
            peerIDs.forEach(function(peerID) {
                var conn = peer.connect(peerID);
    
                conn.on('open', function() {
                    conn.send({name: userName, id: userID, message: newMessage});
                });
            });

            $('#chat-window').append('<p class="chat-message"><strong>' + userName + ' [ID: ' + userID + ']:</strong><br>' + newMessage + '</p>');
        }
    });

    // Receive message from peers
    peer.on('connection', function(conn) {
        conn.on('data', function(data) {
            $('#chat-window').append('<p class="chat-message"><strong>' + data.name + ' [ID: ' + data.id + ']:</strong><br>' + data.message + '</p>');
            /*
            var index = peerIDs.findIndex(data.id);

            if (index > -1)
                $('.peer-name:eq(' + index + ')').html('[' + data.name + ']');
            */
        });
    });
});

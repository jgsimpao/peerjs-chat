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
        var newPeerID = $('#new-peer-id').val();

        if (peerIDs.includes(newPeerID)) {
            $('.alert').show();
        } else {
            peerIDs.push(newPeerID);
            $('#peer-list').append('<p class="peer-id">' + newPeerID + ' <span class="peer-name"></span></p>');
        }
    });

    $('.alert-close').click(function() {
        $('.alert').hide();
    });
    
    // Send messages
    $('#new-message-btn').click(function() {
        $('#chat-window').append('<p class="chat-message"><strong>' + userName + ' [ID: ' + userID + ']:</strong><br>' + $('#new-message-text').val() + '</p>');
        
        peerIDs.forEach(function(peerID) {
            var conn = peer.connect(peerID);

            conn.on('open', function() {
                conn.send({name: userName, id: userID, message: $('#new-message-text').val()});
            });
        });
    });

    // Receive messages
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

$(document).ready(function() {
    const peer = new Peer();
    const entities = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'};
    var userName = '';
    var userID = '';
    var peerIDs = [];

    function escapeHtml(text) {
        return text.replace(/[&<>"']/g, function(match) { return entities[match]; });
    }

    function validateInput(text) {
        if (text.trim().length)
            return true;
        
        return false;
    }

    $('#new-user-modal').modal({
        show: true,
        keyboard: false,
        backdrop: 'static'
    });

    $('#new-user-name').on('input', function(){
        userName = $('#new-user-name').val();

        if (validateInput(userName))
            $('#new-user-btn').prop('disabled', false);
        else
            $('#new-user-btn').prop('disabled', true);
    });

    peer.on('open', function(id) {
        userID = id;
    });

    $('#new-user-btn').click(function() {
        $('#user-name').html(escapeHtml(userName));
        $('#user-id').html(escapeHtml(userID));
    });

    $('#new-peer-btn').click(function() {
        var newPeerID = $('#new-peer-id').val();

        if (validateInput(newPeerID)) {
            if (peerIDs.includes(newPeerID)) {
                $('.new-peer-warning').show();
            } else {
                peerIDs.push(newPeerID);
                $('.new-peer-warning').hide();
                $('#peer-list').append('<p class="peer-id">' + escapeHtml(newPeerID) + ' <span class="peer-name"></span></p>');
            }
        }
    });
    
    // Send message to peers
    $('#new-message-btn').click(function() {
        var newMessage = $('#new-message-text').val();

        if (validateInput(newMessage)) {
            peerIDs.forEach(function(peerID) {
                var conn = peer.connect(peerID);
    
                conn.on('open', function() {
                    conn.send({name: userName, id: userID, message: newMessage});
                });
            });

            $('#chat-window').append('<p class="chat-message"><strong>' + escapeHtml(userName) + ' [ID: ' + escapeHtml(userID) + ']:</strong><br>' + escapeHtml(newMessage) + '</p>');
        }
    });

    // Receive message from peers
    peer.on('connection', function(conn) {
        conn.on('data', function(data) {
            $('#chat-window').append('<p class="chat-message"><strong>' + escapeHtml(data.name) + ' [ID: ' + escapeHtml(data.id) + ']:</strong><br>' + escapeHtml(data.message) + '</p>');
            /*
            var index = peerIDs.findIndex(data.id);

            if (index > -1)
                $('.peer-name:eq(' + index + ')').html('[' + data.name + ']');
            */
        });
    });
});

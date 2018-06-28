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
        text = text.trim();

        if (text.length)
            return text;
        
        return false;
    }

    // New User modal options
    $('#new-user-modal').modal({show: true, keyboard: false, backdrop: 'static'});

    // New User modal button enable/disable
    $('#new-user-name').on('input', function() {
        if (userName = validateInput($('#new-user-name').val()))
            $('#new-user-btn').prop('disabled', false);
        else
            $('#new-user-btn').prop('disabled', true);
    });

    // Retrieve user's Peer ID
    peer.on('open', function(id) {
        userID = id;
    });

    // Display user's Name and Peer ID
    $('#new-user-btn').click(function() {
        $('#user-name').html(escapeHtml(userName));
        $('#user-id').html(escapeHtml(userID));
    });

    // Add Peer ID to peer connections
    $('#new-peer-btn').click(function() {
        var newPeerID = '';

        if (newPeerID = validateInput($('#new-peer-id').val())) {
            if (peerIDs.includes(newPeerID) || newPeerID === userID) {
                $('.new-peer-duplicate').show();
                $('.new-peer-invalid').hide();
            } else {
                if (newPeerID.match(/^[A-Za-z0-9]{16}$/)) {
                    peerIDs.push(newPeerID);
                    $('#new-peer-id').val('');
                    $('.warning').hide();
                    $('#peer-list').append('<p class="peer-id">' + escapeHtml(newPeerID) + ' <span class="peer-name"></span></p>');
                } else {
                    $('.new-peer-invalid').show();
                    $('.new-peer-duplicate').hide();
                }
            }
        }
    });
    
    // Send message to peers
    $('#new-message-btn').click(function() {
        var newMessage = '';

        if (newMessage = validateInput($('#new-message-text').val())) {
            peerIDs.forEach(function(peerID) {
                var conn = peer.connect(peerID);
    
                conn.on('open', function() {
                    conn.send({name: userName, id: userID, message: newMessage});
                });
            });

            $('#new-message-text').val('');
            $('#chat-window').append('<p class="chat-message"><strong>' + escapeHtml(userName) + ' [ID: ' + escapeHtml(userID) + ']:</strong><br>' + escapeHtml(newMessage) + '</p>');
        }
    });

    // Receive message from peers
    peer.on('connection', function(conn) {
        conn.on('data', function(data) {
            $('#chat-window').append('<p class="chat-message"><strong>' + escapeHtml(data.name) + ' [ID: ' + escapeHtml(data.id) + ']:</strong><br>' + escapeHtml(data.message) + '</p>');
        });
    });
});

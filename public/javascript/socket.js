$(document).ready(function() {
    let socket = io();
    
    $('.chatInput').on('keypress', (e) => {
        let keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            e.preventDefault();
            
            let msg = $('.chatInput').val();
            socket.emit('sendNote', msg);

            return false;
        }
    });

    let note_base;

    socket.on('checkCount', (count) => {
        $('.userCount').html('Connected Users: ' + count.count);
    });
    socket.on('postNote', (msg) => {
        note_base = 
        `<div class="note">
            <div class="note-bar"></div>
            <div class="note-area">
                <div class="note-content">${msg}</div>
            </div>
        </div>`; 
        
        $('.textArea').append(note_base);
        $('.note').draggable({ scroll: true });
    })
});
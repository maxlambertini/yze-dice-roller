$(document).ready(function(){
    //connect to the socket server.
    var socket = io.connect('http://' + document.domain + ':' + location.port );
    var numbers_received = [];

    

    //receive details from server
    socket.on('rolled', function(msg) {
        console.log("Received number" + msg.number);
        //maintain a list of ten numbers
        if (numbers_received.length >= 10){
            numbers_received.shift()
        }          
        
        var sData = `<div><b>${msg.who}</b> rolled Attr: ${msg.attr} Skill: ${msg.skill} Gear ${msg.gear}</div>`;
        
        numbers_received.push(sData);
        numbers_string = '';
        for (var i = 0; i < numbers_received.length; i++){
            numbers_string = numbers_string + '<div>' + numbers_received[i].toString() + '</div>';
        }
        $('#log').html(numbers_string);
    });

    $("#btn").click(function() {
        const nick = $("#nick").val()
        const attr = $("#attr").val()
        const gear = $("#gear").val()
        const skill = $("#skill").val()

        socket.emit("roll", 
            {
                "nick":nick,
                "attr":attr,
                "gear":gear,
                "skill":skill
            }
        )
    })

    $("#btnPush").click(function() {
        const nick = $("#nick").val()
        const attr = $("#attr").val()
        const gear = $("#gear").val()
        const skill = $("#skill").val()

        socket.emit("rollPush", 
            {
                "nick":nick,
                "attr":attr,
                "gear":gear,
                "skill":skill
            }
        )
    })    

});
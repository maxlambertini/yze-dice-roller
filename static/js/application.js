$(document).ready(function(){
    //connect to the socket server.
    var socket = io.connect('//' + document.domain + ':' + location.port );
    var numbers_received = [];

    

    //receive details from server
    socket.on('rolled', function(msg) {
        //maintain a list of ten numbers
        var sData = `<div><b>${msg.who}</b> rolled</div><div>`
        if (msg.attr) sData+=`Attr: ${msg.attr} `
        if (msg.skill) sData+=`Skill: ${msg.skill} `
        if (msg.gear) sData+=`Gear ${msg.gear}</div>`;        
        sData+="</div>"
        numbers_received.push(sData);
        if (numbers_received.length >= 10){
            numbers_received.shift()
        }          
        
        var len = numbers_received.length-1
        numbers_string = '';
        for (var i = 0; i < numbers_received.length; i++){

            numbers_string = numbers_string + `<div class="result_line item_${i}">` + numbers_received[len-i].toString() + '</div>';
        }
        console.log(numbers_string);
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
class SnakeGame {
    
    constructor() {
        
        this.getPlayerData();
        
        if (cs.local('playerName')) { cs.select('#setName').value = cs.local('playerName'); }
        
        cs.select('#start').addEventListener('click', function () {
            
            if (cs.select('#setName').value) {
                
                cs.local('playerName', cs.select('#setName').value);
                
                setTimeout(function() { this.init(); }.bind(this), 500);
                    
                cs.toggleFullscreen('#Game');

                cs.select('#frontPanel').className = "hide";
            
            } else {alert("bir isim gir"); }
        
        }.bind(this), false); };
    
    init() {
        
        this.skor = 0;
        
        this.body = [];
        
        this.Length = 5;
        
        this.rota = "up";
        
        this.isDead = false;
        
        this.grid = cs.setGrid(40);
        
        this.time = { start : (new Date).getTime(), end : null };
        
        this.createSnake();
        
        this.createFeed();
        
        this.drawFeed();
        
        this.drawSnake();
        
        //> ANİMASYON HIZINI KONTROL ETMEK İÇİN.

        if (this.interval) { clearInterval(this.interval); };
        
        this.interval = setInterval(function() { this.action(); }.bind(this), 1000 / cs.select('#myRange').value); };
    
    action() {
        
        if ((cs.key.down === 37 || cs.swiped === 'left') && this.rota != 'right' ) { this.rota = 'left'; }

        else if ((cs.key.down === 38 || cs.swiped === 'up') && this.rota != 'down' ) { this.rota = 'up'; }

        else if ((cs.key.down === 39 || cs.swiped === 'right') && this.rota != 'left' ) { this.rota = 'right'; }

        else if ((cs.key.down === 40 || cs.swiped === 'down') && this.rota != 'up' ) { this.rota = 'down'; };
        
        
        switch(this.rota) {
                
            case 'left' : this.snx -= this.grid.size; break;
                
            case 'up' : this.sny -= this.grid.size; break;
                
            case 'right' : this.snx += this.grid.size; break;
                
            case 'down' : this.sny += this.grid.size; break; };

        
        
        //> YILANI İLERLET VE İLERLERKEN KENDİNİ YEDİMİ KONTROL ET
        
        for (let i = this.Length * 2 - 1; i > 1; i -= 1) {
            
            this.body[i] = this.body[i - 2];
            
            if (i === 2) { this.body[0] = this.snx; this.body[1] = this.sny; };
            
            //> YILAN KENDİNİ YEDİMİ KISMI
            
            if (i % 2 === 1 && this.sny === this.body[i] && this.snx === this.body[i - 1] ) { this.deadSnake(); }; };
        
        //> YILAN YEMİ YERSE
        
        if (this.body[0] == this.fdx && this.body[1] == this.fdy) {

            this.Length += 1;

            this.skor += parseInt(cs.select('#myRange').value);
            
            cs.select('#skor').className = "showSkor";

            cs.select('#skor').innerHTML = this.skor;
            
            setTimeout(function() { cs.select('#skor').className = "hideSkor"; }, 800);
            
            this.createFeed(); };
        
        cs.clear();
        
        this.drawSnake();
        
        this.drawFeed(); };
    
    createSnake(){
        
        this.body[0] = this.snx = parseInt(this.grid.width / 2, 10) * this.grid.size + this.grid.left;
        
        this.body[1] = this.sny = parseInt(this.grid.height / 2, 10) * this.grid.size + this.grid.top;
        
        for (let i = 2; i < this.Length * 2 - 1; i += 2) {
            
            this.body[i] = this.body[0];
            
            this.body[i + 1] = this.body[i - 1] + this.grid.size; }; };    
    
    createFeed () {
        
        //> İŞTE YEMİN YENİ KORDİNATLARI.
        
        this.fdx = cs.random(1, this.grid.width) * this.grid.size + this.grid.left;

        this.fdy = cs.random(1, this.grid.height) * this.grid.size + this.grid.top;
        
        //> KAZARA'da OLSA YEMİN YILAN ÜZERİNDE OLUŞMASINI İSTEMEYİZ.
        
        for (let i = this.Length * 2 - 1; i >= 0; i -= 2) {
            
            if (this.fdy === this.body[i] && this.fdx === this.body[i - 1] ) { this.createFeed(); }; }; };
    
    drawSnake() {
        
        cs.clear();
        
        cs.context.beginPath();
        
        cs.context.lineWidth = 1;
        
        cs.context.fillStyle = cs.context.strokeStyle = this.isDead ? "rgba(128,0,0,0.5)" : "rgba(128,128,128,0.5)";
        
        cs.context.shadowColor = "none";
        
        cs.context.shadowBlur = 30;

        for (var i = 0; i < this.body.length - 1; i += 2) {

            for (var i = 0; i < this.body.length; i += 2) {

                cs.context.rect(

                    this.body[i] - (this.grid.size / 2) + 4,

                    this.body[i + 1] - (this.grid.size / 2) + 4,

                    this.grid.size - 4,
                    
                    this.grid.size - 4); }; };
        
        cs.context.fill();
        
        cs.context.stroke();
        
        cs.context.closePath(); };
    
    drawFeed () {
        
        cs.context.beginPath();
        
        cs.context.lineWidth = 1;
        
        cs.context.fillStyle = cs.context.strokeStyle = "rgba(128,128,128,0.5)";
        
        // cs.context.shadowColor = "rgba(64,64,64,0.5)";
        
        cs.context.shadowBlur = 30;
        
        cs.context.arc(this.fdx, this.fdy, this.grid.size / 3, 0, Math.PI * 2, true);

        cs.context.fill();
        
        cs.context.stroke();

        cs.context.closePath(); };
    
    deadSnake() {
        
        this.isDead = true;
        
        var localData =
            
            '{"PlayerName":' + '"' + cs.select('#setName').value + '"' +
            
            ',"Skor":' + this.skor +
            
            ',"Length":' + this.Length +
            
            ',"Date":' + '"' + (new Date).toLocaleDateString() + '"' +
            
            ',"Level":' + cs.select('#myRange').value +
            
            ',"Time":' + ((new Date).getTime() - this.time.start) / 1000 +
            
            ',"Thema":"' + cs.select('#Game').className.split(" ")[2] + 
            
            '","Browser":"' + (new ClientJS).getBrowser() + 
            
            '","Platform":"'+ (new ClientJS).getOS() + '"}';
        
        // karşıya gönderilecek veri
        
        var payload = JSON.parse(this.IncomingData + ',' + localData + ']');
        
        var keysSorted = Object.keys(payload).sort(function(a,b){return payload[a]-payload[b]})
        
        console.log(keysSorted);

        $.ajax({

            url:"https://api.myjson.com/bins/q0mv8",

            type:"PUT",

            data: JSON.stringify(payload),

            contentType:"application/json; charset=utf-8",

            dataType:"json",

            success: function(data, textStatus, jqXHR) { console.table(data); this.getPlayerData(); }.bind(this) });
        
        clearInterval(this.interval);
        
        setTimeout(function () {

            cs.clear();

            cs.key.down = 38;
            
            cs.toggleFullscreen('#Game');

            cs.select('#frontPanel').className = "layout flex"; }.bind(this), 1000);
        
        
    
    };
    
    getPlayerData() {
        
        cs.select('#playlistContainer').innerHTML = "";
        
        $.get("https://api.myjson.com/bins/q0mv8", function(data, textStatus, jqXHR) {
            
            console.log(data);
            
            
            this.IncomingData = JSON.stringify(data).slice(0, JSON.stringify(data).length - 1 );
            
            for (var key in data) {
                
                let playerListContainer = document.createElement('li');
                
                playerListContainer.setAttribute('class', 'playListItem');
                
                playerListContainer.setAttribute('id', data[key]["PlayerName"]);

                let playerNameElement = document.createElement('div');

                playerNameElement.innerHTML = "<b>" + data[key]["PlayerName"] + "</b>";

                playerListContainer.appendChild(playerNameElement);

                let playerSkorElement = document.createElement('div');

                playerSkorElement.innerHTML = "Skor : " + data[key]["Skor"];

                playerListContainer.appendChild(playerSkorElement);

                let playerLengthElement = document.createElement('div');

                playerLengthElement.innerHTML = "Length : " + data[key]["Length"];

                playerListContainer.appendChild(playerLengthElement);

                let playerLevelhElement = document.createElement('div');

                playerLevelhElement.innerHTML = "Level : " + data[key]["Level"];

                playerListContainer.appendChild(playerLevelhElement);

                let playerTimehElement = document.createElement('div');

                playerTimehElement.innerHTML = "Time : " + data[key]["Time"];

                playerListContainer.appendChild(playerTimehElement);
                
                cs.select('#playlistContainer').appendChild(playerListContainer);
            }
        
        }.bind(this));
        
    }

}


Canvas.ready(function () {
    
    this.cs = new Canvas('canvas');
    
    this.snake = new SnakeGame();
    
    document.querySelector('#togle').addEventListener('click', function () {
        
        if (document.querySelector('#Game').className === 'layout flex dark') { cs.select('#Game').className = 'layout flex light'; }
        
        else if (document.querySelector('#Game').className === 'layout flex light') { cs.select('#Game').className = 'layout flex dark'; }
        
    }, false);
});
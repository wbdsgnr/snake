
if (!cs.swiped && !cs.key.down) { this.sny -= this.grid.size; }

else if ((cs.key.down === 37 || cs.swiped === "left") && this.rota != "right") { this.rota = "left"; this.snx -= this.grid.size; }

else if ((cs.key.down === 38 || cs.swiped === "up") && this.rota != "down") { this.rota = "up"; this.sny -= this.grid.size; }

else if ((cs.key.down === 39 || cs.swiped === "right") && this.rota != "left") {this.rota = "right"; this.snx += this.grid.size; }

else if ((cs.key.down === 40 || cs.swiped == "down") && this.rota != "up") { this.rota = "down"; this.sny += this.grid.size; }



































/**********************************************************************************************************************/



if(!cs.key.down && !cs.swiped) { this.snx -= this.grid.size; }

else if ((cs.key.down === 37 || cs.swiped === 'left') && this.rota != 'right' ) { this.rota = 'left'; this.snx -= this.grid.size; }

else if ((cs.key.down === 38 || cs.swiped === 'up') && this.rota != 'down' ) { this.rota = 'up'; this.sny -= this.grid.size; }

else if ((cs.key.down === 39 || cs.swiped === 'right') && this.rota != 'left' ) { this.rota = 'right'; this.snx += this.grid.size; }

else if ((cs.key.down === 40 || cs.swiped === 'down') && this.rota != 'up' ) { this.rota = 'down'; this.sny += this.grid.size; };





/**********************************************************************************************************************************/



        if ((cs.key.down === 37 || cs.swiped === 'left') && this.rota != 'right' ) { this.rota = 'left'; }

        else if ((cs.key.down === 38 || cs.swiped === 'up') && this.rota != 'down' ) { this.rota = 'up'; }

        else if ((cs.key.down === 39 || cs.swiped === 'right') && this.rota != 'left' ) { this.rota = 'right'; }

        else if ((cs.key.down === 40 || cs.swiped === 'down') && this.rota != 'up' ) { this.rota = 'down'; };
        
        
        switch(this.rota) {
                
            case 'left' : this.snx -= this.grid.size; break;
                
            case 'up' : this.sny -= this.grid.size; break;
                
            case 'right' : this.snx += this.grid.size; break;
                
            case 'down' : this.sny += this.grid.size; break; };






















        
        if ((this.body[0] <= this.grid.left && this.rota != "right") || (this.body[0] >= this.grid.right && this.rota != "left")) {
            
            if (this.body[0] <= this.grid.left && this.rota != "right") { this.snx = this.grid.right + this.grid.size }
            
            else if (this.body[0] >= this.grid.right && this.rota != "left") { this.snx = this.grid.left - this.grid.size }
        }
        
        if ((this.body[0] >= this.grid.right && this.rota != "left") || (this.body[1] >= this.grid.bottom && this.rota != "up")) {

            if (this.body[0] >= this.grid.right && this.rota != "left") { this.sny = this.grid.bottom + this.grid.size }

            else if(this.body[1] >= this.grid.bottom && this.rota != "up") { this.sny = this.grid.top - this.grid.size }
        }









import {returnDivisor} from './divisor.js' 


export class characterObject {
    constructor(startPt, endPt, frameDistance, gifs, w, h, name) {
        this.adj
        this.angle  
        this.calibration
        this.count = 0
        this.classLabel
        this.direction
        this.divisor
        this.divisorMultiplier
        this.gif = gifs 
        this.height = h
        this.currIndex 
        this.currQuad
        this.endPt = endPt 
        this.endAngle = undefined
        this.frameDistance = frameDistance 
        this.frameIndex
        this.inMotion = false 
        this.name = name
        this.opp  
        this.pathCount = 0
        this.pathInterrupted = false 
        this.pivot = 0 
        this.quadAdj
        this.quadAdjMultiplier
        this.quadAngle
        this.quadAngleMultiplier
        this.quadOpp
        this.quadOppMultiplier
        this.startPt = startPt   
        this.width = w
        this.xDist 
        this.yDist  
    }
    
    returnDivisor(x, y, z){
       return  returnDivisor(x, y, z)
    } 

    //separate path builder
    moveCharacter(){   
        
        this.calibration = this.frameDistance*1.2  

        if (this.pathInterrupted == false){
            this.classLabel = 'pathPoint'
        }

        else {
            this.classLabel = 'pathPoint' + this.pathCount
        }
 
        this.opp = Math.pow((this.endPt[0] - this.startPt[0]), 1)
        this.adj = Math.pow((this.endPt[1] - this.startPt[1]), 1)*(-1)
        this.angle = Math.abs(Math.atan(this.opp/this.adj) * 180/Math.PI)
        //char.hypo = Math.sqrt((char.opp*char.opp)+(char.adj*char.adj));   
         
        //QUAD 1 :
        if (this.endPt[1] <= this.startPt[1] && this.endPt[0] >= this.startPt[0]){

            console.log("quad 1 PIVOT")
            this.currQuad = 1//Define current quad number
            this.pivot = 0
            this.quadAngle = 38.5
            this.quadOpp = Math.round(this.frameDistance*Math.sin(this.quadAngle/(180/Math.PI)))//10px opp distance - 1 frame
            this.quadAdj = Math.round(this.frameDistance*Math.cos(this.quadAngle/(180/Math.PI)))//10px

            //if end point is between 0 and 38.5 degrees
            if ((this.angle >= 38.5) && (this.angle < 90)){

                this.direction = 'pivot'
                this.divisor = Math.abs(this.returnDivisor(this.startPt[1]-this.endPt[1],((this.startPt[1]-this.endPt[1])%this.quadOpp),this.quadOpp)) // divided
                this.xDist = this.startPt[0]
                this.yDist = this.startPt[1] - this.calibration

                //construct path diagonal until ....
                while (this.count < this.divisor){   
                    this.xDist += this.quadAdj
                    this.yDist -= this.quadOpp*4// if frame distance is 10, then multiply quadOpp by 2
                    //document.getElementById('bgMain').innerHTML += '<div id="' +  this.count + '" class="pathPoint" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>';
                    $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>')
                    this.count++
                    this.pivot++ 
                }  
                    
                //construct horizontal line
                while (this.xDist < this.endPt[0]){
                    this.count++;
                    this.xDist += this.frameDistance*2; // Multiply char.xDist x2 if horizontal
                    this.yDist -= 6 //Previously -=6
                    //document.getElementById('bgMain').innerHTML += '<div id="' +  this.count + '" class="pathPoint" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>';
                    $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                } 
                
                let j = 0;
                let k = 2;
                
                //stop path cycle 
                while (j<12){ 
                    j++;
                    this.count++;
                    this.xDist += this.frameDistance*k; // Multiply char.xDist x2 if horizontal
                    k = (k*.8);
                    this.yDist -= 6 //Previously -=6
                    this.startPt[0] = this.xDist;
                    this.startPt[1] = this.yDist;
                    //document.getElementById('bgMain').innerHTML += '<div id="' +  this.count + '" class="pathPoint" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>';
                    $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');

                } 

                //Reset start Points
                //document.getElementById('startPoint').css('left', this.endPt[0] + 'px');
                //document.getElementById('startPoint').css('top', this.endPt[1] + 'px');
                document.getElementById('startPoint').style.left = this.endPt[0] + 'px' 
                document.getElementById('startPoint').style.top = this.endPt[1] + 'px'

                if (this.endAngle == undefined){ 
                    this.animateCharacterWalk(this.pathCount)
                }

                //if char.endAngle is defined, rotate, then animate : if quad 1, then cabbit-rotate-0-quad1-1 to 4
                    
                else {  
                     this.rotateCharacter().then(()=>{   
                        this.animateCharacterWalk(this.pathCount); 
                    }); 
                }
            
            }
            
            //If the end point angle is between 38.5 and 90
            else if ((90-this.angle) >= 38.5 && (90-this.angle) < 90) {
            
                console.log("diagonal then up");
                this.xDist = this.startPt[0];
                this.yDist = this.startPt[1] - this.calibration;
                this.divisor = Math.abs(this.returnDivisor(this.startPt[0]-this.endPt[0],((this.startPt[0]-this.endPt[0])%this.quadAdj), this.quadAdj));

                //construct path diagonal until 
                while (this.count < this.divisor*2){  
                    this.xDist += this.quadAdj;  
                    this.yDist -= this.quadOpp*4; 
                    this.count++;
                    this.pivot++;
                    $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                }   

                //construct vertical path
                if (this.startPt[1]-this.endPt[1] <= (this.frameDistance*20)){
                    while(this.yDist > this.endPt[1]-(this.frameDistance*20)){
                        this.yDist -= this.calibration;
                        this.yDist -= 6
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                    } 
                }

                else if (this.startPt[1]-this.endPt[1] > (this.frameDistance*20) && this.startPt[1]-this.endPt[1] <= (this.frameDistance*40) ){
                    while(this.yDist > this.endPt[1]-(this.frameDistance*30)){
                        this.count++;
                        this.yDist -= this.calibration;
                        this.yDist -= 6
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                    } 
                }

                else if (this.startPt[1]-this.endPt[1] > (this.frameDistance*40) && this.startPt[1]-this.endPt[1] <= (this.frameDistance*60) ){
                    while(this.yDist > this.endPt[1]-(this.frameDistance*50)){
                         this.count++;
                        this.yDist -= this.calibration;
                        this.yDist -= 6
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                    } 
                }
                
                else if (this.startPt[1]-this.endPt[1] > (this.frameDistance*60) && this.startPt[1]-this.endPt[1] <= (this.frameDistance*80) ){
                    while(this.yDist > this.endPt[1]-(this.frameDistance*70)){
                         this.count++;
                        this.yDist -= this.calibration;
                        this.yDist -= 6
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                    } 
                }

                else if (this.startPt[1]-this.endPt[1] > (this.frameDistance*80) && this.startPt[1]-this.endPt[1] <= (this.frameDistance*100) ){
                    while(this.yDist > this.endPt[1]-(this.frameDistance*90)){
                         this.count++;
                        this.yDist -= this.calibration;
                        this.yDist -= 6
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                    } 
                } 
                
                let j = 0;
                let k = 2;
                
                //stop path cycle 
                while (j<12){
                    j++;
                    this.count++;
                    this.yDist -= this.frameDistance*k; // Multiply this.xDist x2 if horizontal
                    k = (k*.8);
                    this.yDist -= 6 //Previously -=6
                    this.startPt[0] = this.xDist;
                    this.startPt[1] = this.yDist;
                    $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                } 

                //Reset start Points
                document.getElementById('startPoint').style.left = this.endPt[0] + 'px' 
                document.getElementById('startPoint').style.top = this.endPt[1] + 'px'
                
                if (this.endAngle == undefined){
                    this.animateCharacterWalk(this.pathCount)
                } 

                else {  
                     this.rotateCharacter().then(()=>{   
                        this.animateCharacterWalk(this.pathCount); 
                    }); 
                }
                
            } 
        }

        //QUAD TWO
        else if (this.endPt[1]<=this.startPt[1]&&this.endPt[0]<=this.startPt[0]){
            
            console.log("quad 2"); 
            this.pivot = 0;
            this.quadAngle = 38.5;
            this.currQuad = 2;
            this.quadOpp = Math.round(this.frameDistance*Math.sin(this.quadAngle/(180/Math.PI)));//10px opp distance - 1 frame
            this.quadAdj = Math.round(this.frameDistance*Math.cos(this.quadAngle/(180/Math.PI)));//10px

            //if end point is between 38.5 and 0
            //this angle reference point is from 90 degrees
            if ((Math.abs(this.angle) > 38.5) && (Math.abs(this.angle) < 90)){
                //pivot
                console.log("PIVOT");
                this.divisor = Math.abs(this.returnDivisor(this.startPt[1]-this.endPt[1],((this.startPt[1]-this.endPt[1])%this.quadOpp),this.quadOpp)); // divided
                
                this.xDist = this.startPt[0];
                this.yDist = this.startPt[1] - this.calibration;
                    
                //construct path diagonal until  
                while ( this.count < this.divisor){  
                    this.xDist -= this.quadAdj;  
                    this.yDist -= this.quadOpp*4; // if frame distance is 10, then multiply quadOpp by 2
                    $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                    this.count++;
                    this.pivot++;  
                }  
                    
                //construct horizontal line
                while (this.xDist > this.endPt[0]){
                    this.count++;
                    this.xDist -= this.frameDistance*2; // Multiply this.xDist x2 if horizontal
                    this.yDist -= 6 //Previously -=6
                    $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                } 
                
                let j = 0;
                let k = 2;
                
                //stop path cycle vertical
                while (j<12){
                    j++;
                    this.count++;
                    this.xDist -= this.frameDistance*k; // Multiply this.xDist x2 if horizontal
                    k = (k*.8);
                    this.yDist -= 6 //Previously -=6
                    this.startPt[0] = this.xDist;
                    this.startPt[1] = this.yDist;
                    $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                } 

                //Reset start Points
                document.getElementById('startPoint').style.left = this.endPt[0] + 'px' 
                document.getElementById('startPoint').style.top = this.endPt[1] + 'px'
                
                if (this.endAngle == undefined){
                    this.animateCharacterWalk(this.pathCount)
                }

                //if char.endAngle is defined, rotate, then animate : if quad 1, then cabbit-rotate-0-quad1-1 to 4
                    
                else {  
                     this.rotateCharacter().then(()=>{   
                        this.animateCharacterWalk(this.pathCount); 
                    }); 
                }

            }
            //If the end point angle is between  90 and 141.5
            else if ((90-(Math.abs(this.angle))) > 38.5 && (90-(Math.abs(this.angle))) < 90) {
                //diagonal then up
                console.log("diagonal then up");
                this.xDist = this.startPt[0];
                this.yDist = this.startPt[1] - this.calibration;
                this.divisor = Math.abs(this.returnDivisor(this.startPt[0]-this.endPt[0],((this.startPt[0]-this.endPt[0])%this.quadAdj), this.quadAdj));

                //construct path diagonal until 
                while (this.xDist >= this.endPt[0]){   
                    this.xDist -= this.quadAdj;  
                    this.yDist -= this.quadOpp*4;
                    this.count++;
                    this.pivot++;
                    $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                }   

                //construct vertical path
                if (this.startPt[1]-this.endPt[1] <= (this.frameDistance*20)){
                    while(this.yDist > this.endPt[1]-(this.frameDistance*20)){
                        this.yDist -= this.calibration;
                        this.yDist -= 6
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                    } 
                }

                if (this.startPt[1]-this.endPt[1] <= (this.frameDistance*20)){ 
                    while(this.yDist > this.endPt[1]-(this.frameDistance*10)){
                        this.count++;
                        this.yDist -= this.calibration;
                        this.yDist -= 6
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                    } 
                }

                else if (this.startPt[1]-this.endPt[1] > (this.frameDistance*10) && this.startPt[1]-this.endPt[1] <= (this.frameDistance*40) ){ 
                    while(this.yDist > this.endPt[1]-(this.frameDistance*30)){
                        this.count++;
                        this.yDist -= this.calibration;
                        this.yDist -= 6
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                    } 
                }

                else if (this.startPt[1]-this.endPt[1] > (this.frameDistance*40) && this.startPt[1]-this.endPt[1] <= (this.frameDistance*60) ){ 
                    while(this.yDist > this.endPt[1]-(this.frameDistance*50)){
                        this.count++;
                        this.yDist -= this.calibration;
                        this.yDist -= 6
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                    } 
                }
                
                
                else if (this.startPt[1]-this.endPt[1] > (this.frameDistance*60) && this.startPt[1]-this.endPt[1] <= (this.frameDistance*80) ){ 
                    while(this.yDist > this.endPt[1]-(this.frameDistance*70)){
                        this.count++;
                        this.yDist -= this.calibration;
                        this.yDist -= 6
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                    } 
                }

                else if (this.startPt[1]-this.endPt[1] > (this.frameDistance*80) && this.startPt[1]-this.endPt[1] <= (this.frameDistance*100) ){ 
                    while(this.yDist > this.endPt[1]-(this.frameDistance*90)){
                        this.count++;
                        this.yDist -= this.calibration;
                        this.yDist -= 6
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                    } 
                }

                let j = 0;
                let k = 2;
                
                //stop path cycle 
                while (j<6){
                    j++;
                    this.count++;
                    this.yDist -= this.frameDistance*k; // Multiply this.xDist x2 if horizontal
                    k = (k*.8);
                    this.yDist -= this.frameDistance*1.2; //Previously -=6
                    this.startPt[0] = this.xDist;
                    this.startPt[1] = this.yDist;
                    $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                } 

                //Reset start Points
                document.getElementById('startPoint').style.left = this.endPt[0] + 'px' 
                document.getElementById('startPoint').style.top = this.endPt[1] + 'px'
                
                if (this.endAngle == undefined){
                    this.animateCharacterWalk(this.pathCount)
                }

                //if char.endAngle is defined, rotate, then animate : if quad 1, then cabbit-rotate-0-quad1-1 to 4
                    
                else {  
                     this.rotateCharacter().then(()=>{   
                        this.animateCharacterWalk(this.pathCount); 
                    }); 
                }
                    
            } 
        }

        //QUAD THREE
        else if (this.endPt[1]>=this.startPt[1]&&this.endPt[0]<=this.startPt[0]){

            this.pivot = 0

            console.log("quad 3")
            this.quadAngle = 38.5  
            this.currQuad = 3  
            this.quadOpp = Math.round(this.frameDistance*Math.sin(this.quadAngle/(180/Math.PI)))  //10px opp distance - 1 frame
            this.quadAdj = Math.round(this.frameDistance*Math.cos(this.quadAngle/(180/Math.PI)))  //10px

            
            if ((this.angle > 38.5) && (this.angle < 90) ){
                //pivot 

                this.divisor = Math.abs(this.returnDivisor(this.startPt[1]-this.endPt[1],((this.startPt[1]-this.endPt[1])%this.quadOpp),this.quadOpp))   // divided
                this.xDist = this.startPt[0]  
                this.yDist = this.startPt[1] - this.calibration    
                    
                //construct path diagonal until 
                while ( this.count < this.divisor){   
                    this.xDist -= this.quadAdj    
                    this.yDist += this.quadOpp/5  
                    $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>')  
                    this.count++  
                    this.pivot++  
                }   
            
                //construct horizontal line
                while (this.xDist > this.endPt[0]){
                    this.xDist -= this.frameDistance*2  
                    this.yDist -= 6           
                    this.count++  
                    $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                    }  

                let j = 0
                let k = 2 
                
                //stop path cycle 
                while (j<12){
                    j++ 
                    this.count++
                    this.xDist -= this.frameDistance*k   // Multiply this.xDist x2 if horizontal
                    k = (k*.8)  
                    this.yDist -= 6 //Previously -=6 
                    this.startPt[0] = this.xDist  
                    this.startPt[1] = this.yDist  
                    $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>')
                } 

                //Reset start Points
                document.getElementById('startPoint').style.left = this.endPt[0] + 'px' 
                document.getElementById('startPoint').style.top = this.endPt[1] + 'px'

                if (this.endAngle == undefined){
                    this.animateCharacterWalk(this.pathCount)
                }

                //if char.endAngle is defined, rotate, then animate : if quad 1, then cabbit-rotate-0-quad1-1 to 4
                    
                else {  
                     this.rotateCharacter().then(()=>{   
                        this.animateCharacterWalk(this.pathCount); 
                    }); 
                }
                
            }

            else if ((this.angle < 38.5) && (this.angle > 0)){
                console.log("diagonal then down")  

                this.xDist = this.startPt[0]  
                this.yDist = this.startPt[1] - this.calibration    

                //diagonal
                while (this.xDist >= this.endPt[0]){   
                    this.xDist -= this.quadAdj    
                    this.yDist += this.quadOpp/2   
                    this.count++  
                    this.pivot++  
                    $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>')
                } 

                let difference = this.endPt[1]-this.startPt[1]
                 

                //construct vertical path
                if (difference > 0 && difference < (this.frameDistance*10)){
                    
                    
                    while(this.yDist < this.endPt[1]-(this.frameDistance*10)){
                        this.count++   
                        this.yDist += this.quadOpp   
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>')
                    } 
                }

                else if ((difference > (this.frameDistance*10)) && (difference <= (this.frameDistance*20))){
                    
                    while(this.yDist < this.endPt[1]-(this.frameDistance*15)){
                        this.count++   
                        this.yDist += this.quadOpp   
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>')
                    } 
                }

                else if ((difference > (this.frameDistance*10)) && (difference <= (this.frameDistance*25))){
                     
                    while(this.yDist < this.endPt[1]-(this.frameDistance*10)){
                        this.count++   
                        this.yDist += this.quadOpp  
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>')
                    } 
                }

                else if ((difference > (this.frameDistance*25)) && (difference <= (this.frameDistance*30))){
                     
                    while(this.yDist < this.endPt[1]-(this.frameDistance*22)){
                        this.count++; 
                        this.yDist += this.quadOpp;
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                    } 
                }

                else if ((difference > (this.frameDistance*30)) && (difference <= (this.frameDistance*35))){
                    
                    
                    while(this.yDist < this.endPt[1]-(this.frameDistance*25)){
                        this.count++; 
                        this.yDist += this.quadOpp;
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                    } 
                }

                else if ((difference > (this.frameDistance*35)) && (difference <= (this.frameDistance*40))){
                     
                    while(this.yDist < this.endPt[1]-(this.frameDistance*30)){
                        this.count++; 
                        this.yDist += this.quadOpp;
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                    } 
                }

                else if ((difference > (this.frameDistance*40)) && (difference <= (this.frameDistance*45))){
                     
                    while(this.yDist < this.endPt[1]-(this.frameDistance*34)){
                        this.count++; 
                        this.yDist += this.quadOpp;
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                    } 
                }

                else if ((difference > (this.frameDistance*45)) && (difference <= (this.frameDistance*50))){
                     
                    while(this.yDist < this.endPt[1]-(this.frameDistance*40)){
                        this.count++; 
                        this.yDist += this.quadOpp;
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                    } 
                }

                else if ((difference > (this.frameDistance*50)) && (difference <= (this.frameDistance*55))){
                     
                    while(this.yDist < this.endPt[1]-(this.frameDistance*44)){
                        this.count++; 
                        this.yDist += this.quadOpp;
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                    } 
                }

                else if ((difference > (this.frameDistance*55)) && (difference <= (this.frameDistance*60))){
                     
                    while(this.yDist < this.endPt[1]-(this.frameDistance*47)){
                        this.count++; 
                        this.yDist += this.quadOpp;
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                    } 
                }

                else if ((difference > (this.frameDistance*60)) && (difference <= (this.frameDistance*65))){
                     
                    while(this.yDist < this.endPt[1]-(this.frameDistance*51)){
                        this.count++; 
                        this.yDist += this.quadOpp;
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                    } 
                }

                else if ((difference > (this.frameDistance*65)) && (difference <= (this.frameDistance*70))){
                     
                    while(this.yDist < this.endPt[1]-(this.frameDistance*55)){
                        this.count++; 
                        this.yDist += this.quadOpp;
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                    } 
                }


                let j = 0;
                let k = 2;
                
                //stop path cycle 
                while (j<6){
                    j++;
                    this.count++;
                    this.yDist += this.frameDistance*k; // Multiply this.xDist x2 if horizontal
                    k = (k*.8);
                    this.yDist -= this.frameDistance*1.2; //Previously -=6
                    this.startPt[0] = this.xDist;
                    this.startPt[1] = this.yDist;
                    $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                } 

                //Reset start Points
                document.getElementById('startPoint').style.left = this.endPt[0] + 'px' 
                document.getElementById('startPoint').style.top = this.endPt[1] + 'px'
                
                if (this.endAngle == undefined){
                    this.animateCharacterWalk(this.pathCount)
                }

                //if char.endAngle is defined, rotate, then animate : if quad 1, then cabbit-rotate-0-quad1-1 to 4
                    
                else {  
                     this.rotateCharacter().then(()=>{   
                        this.animateCharacterWalk(this.pathCount); 
                    }); 
                }
            } 

        }

        //QUAD 4
        else if (this.endPt[1]>this.startPt[1]&&this.endPt[0]>=this.startPt[0]){ 

            console.log("quad 4");  
            this.quadAngle = 38.5;
            this.currQuad = 4;
            this.pivot = 0; 

            this.quadOpp = Math.round(this.frameDistance*Math.sin(this.quadAngle/(180/Math.PI)));//10px opp distance - 1 frame
            this.quadAdj = Math.round(this.frameDistance*Math.cos(this.quadAngle/(180/Math.PI)));//10px

            //this.quadAdj = quadAdj
            //this.quadOpp = quadOpp

            //if end point is between 180 and 141.5 degrees
            if ((this.angle > 38.5) && (this.angle < 90)){
                //pivot
                console.log("Pivot"); 

                this.divisor = Math.abs(this.returnDivisor(this.startPt[1]-this.endPt[1],((this.startPt[1]-this.endPt[1])%this.quadOpp),this.quadOpp)); // divided
                
                this.xDist = this.startPt[0];
                this.yDist = this.startPt[1] - this.calibration; 
                    
                //construct path diagonal until 
                while (this.count < this.divisor){  
                    this.xDist += this.quadAdj;  
                    this.yDist += this.quadOpp/5; 
                    $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                    this.count++;
                    this.pivot++;
                }   
            
                //construct horizontal line
                while (this.xDist < this.endPt[0]){
                    this.xDist += this.frameDistance*2;
                    this.yDist -= 6
                    this.count++;
                    $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                }  

                let j = 0;
                let k = 2; 
              
                //stop path cycle 
                while (j<12){
                    j++;
                    this.count++;
                    this.xDist += this.frameDistance*k; // Multiply this.xDist x2 if horizontal
                    k = (k*.8);
                    this.yDist -= 6//Previously -=6
                    this.startPt[0] = this.xDist;
                    this.startPt[1] = this.yDist;
                    $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                } 

                //Reset start Points change to .style.left = 
                document.getElementById('startPoint').style.left = this.endPt[0] + 'px' 
                document.getElementById('startPoint').style.top = this.endPt[1] + 'px'
 
                if (this.endAngle == undefined){
                    this.animateCharacterWalk(this.pathCount) 
                }

                //if this.endAngle is defined, rotate, then animate : if quad 1, then cabbit-rotate-0-quad1-1 to 4
                else if (this.pathInterrupted == true){ 

                    if (this.endAngle == 292){ 
                        this.animateCharacterWalk(this.pathCount )
                    }
                    
                    else {
                        this.rotateCharacter().then(()=>{   
                            this.animateCharacterWalk(this.pathCount)
                        })
                    }
                    
                }
                //if path is not interrupted :
                else if (this.pathInterrupted == false) { 
                    //short pause 
                    this.rotateCharacter().then(()=>{  
                        this.animateCharacterWalk(this.pathCount)
                    })
                    
                }
            }  

            else if(this.angle > 25 && this.angle < 30){
                console.log("pivot") 
                
                this.xDist = this.startPt[0]  
                this.yDist = this.startPt[1] - this.calibration    
    
                //diagonal
                while (this.xDist <= this.endPt[0]){   
                    this.xDist += this.quadAdj    
                    this.yDist += this.quadOpp/5  
                    this.count++  
                    this.pivot++  
                    $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>')
                } 

                let j = 0;
                let k = 2;  

                while (j<12){
                    j++;
                    this.count++;
                    this.xDist += this.frameDistance*k; // Multiply this.xDist x2 if horizontal
                    k = (k*.8);
                    this.yDist -= 6//Previously -=6
                    this.startPt[0] = this.xDist;
                    this.startPt[1] = this.yDist;
                    $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                } 

                //Reset start Points
                document.getElementById('startPoint').style.left = this.endPt[0] + 'px' 
                document.getElementById('startPoint').style.top = this.endPt[1] + 'px'
                
                if (this.endAngle == undefined){
                    this.animateCharacterWalk(this.pathCount)
                }
    
                //if char.endAngle is defined, rotate, then animate : if quad 1, then cabbit-rotate-0-quad1-1 to 4
                    
                else {  
                     this.rotateCharacter().then(()=>{   
                        this.animateCharacterWalk(this.pathCount); 
                    }); 
                } 
            }

            else if(this.angle > 30 && this.angle < 38.5){
                console.log("pivot") 
                
                this.xDist = this.startPt[0]  
                this.yDist = this.startPt[1] - this.calibration  
           
                //diagonal
                while (this.xDist <= this.endPt[0]*.95){   
                    this.xDist += this.quadAdj    
                    this.yDist += this.quadOpp/5  
                    this.count++  
                    this.pivot++  
                    $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>')
                } 

                let j = 0;
                let k = 2; 
              
                //stop path cycle VERTICAL
                while (j<12){
                    j++;
                    this.count++;
                    this.xDist += this.frameDistance*k; // Multiply this.xDist x2 if horizontal
                    k = (k*.8);
                    this.yDist -= 6//Previously -=6
                    this.startPt[0] = this.xDist;
                    this.startPt[1] = this.yDist;
                    $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                } 

                //Reset start Points
                document.getElementById('startPoint').style.left = this.endPt[0] + 'px' 
                document.getElementById('startPoint').style.top = this.endPt[1] + 'px'
                
                if (this.endAngle == undefined){
                    this.animateCharacterWalk(this.pathCount)
                }
    
                //if char.endAngle is defined, rotate, then animate : if quad 1, then cabbit-rotate-0-quad1-1 to 4
                    
                else {  
                     this.rotateCharacter().then(()=>{   
                        this.animateCharacterWalk(this.pathCount); 
                    }); 
                } 
            }

            else if ((this.angle < 25) && (this.angle > 0)){
                console.log("diagonal then down")  
    
                this.xDist = this.startPt[0]  
                this.yDist = this.startPt[1] - this.calibration    
    
                //diagonal
                while (this.xDist <= this.endPt[0]){   
                    this.xDist += this.quadAdj    
                    this.yDist += this.quadOpp/5  
                    this.count++  
                    this.pivot++  
                    $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>')
                } 
    
                let difference = this.endPt[1]-this.startPt[1] 
    
                if (difference > 0 && difference < (this.frameDistance*10)){
                   
                    console.log("1")
                    console.log("frameDistance * 10 = " + 5.56*10)
                    while(this.yDist < this.endPt[1]-(this.frameDistance*10)){
                        this.count++   
                        this.yDist += this.quadOpp   
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>')
                    } 
                }
    
                else if ((difference > (this.frameDistance*10)) && (difference <= (this.frameDistance*20))){
                    
                    console.log("2")
                    console.log("frameDistance * 10 = " + 5.56*15)
                    while(this.yDist < this.endPt[1]-(this.frameDistance*15)){
                        this.count++   
                        this.yDist += this.quadOpp   
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>')
                    } 
                }
    
                else if ((difference > (this.frameDistance*10)) && (difference <= (this.frameDistance*25))){
                     
                    console.log("3")
                    console.log("frameDistance * 10 = " + 5.56*25)
                    while(this.yDist < this.endPt[1]-(this.frameDistance*10)){
                        this.count++   
                        this.yDist += this.quadOpp  
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>')
                    } 
                }
    
                else if ((difference > (this.frameDistance*25)) && (difference <= (this.frameDistance*30))){
                     
                    console.log("4")
                    console.log("frameDistance * 10 = " + 5.56*30)
                    while(this.yDist < this.endPt[1]-(this.frameDistance*10)){
                        this.count++; 
                        this.yDist += this.quadOpp;
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                    } 
                }
    
                else if ((difference > (this.frameDistance*30)) && (difference <= (this.frameDistance*35))){
                    
                    console.log("5")
                    console.log("frameDistance * 10 = " + 5.56*35)
                    while(this.yDist < this.endPt[1]-(this.frameDistance*35)){
                        this.count++; 
                        this.yDist += this.quadOpp;
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                    } 
                }
    
                else if ((difference > (this.frameDistance*35)) && (difference <= (this.frameDistance*40))){
                    
                    console.log("6")
                    console.log("frameDistance * 10 = " + 5.56*40)
                    while(this.yDist < this.endPt[1]-(this.frameDistance*40)){
                        this.count++; 
                        this.yDist += this.quadOpp;
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                    } 
                }
    
                else if ((difference > (this.frameDistance*40)) && (difference <= (this.frameDistance*45))){
                    
                    console.log("7")
                    console.log("frameDistance * 10 = " + 5.56*45)
                    while(this.yDist < this.endPt[1]-(this.frameDistance*40)){
                        this.count++; 
                        this.yDist += this.quadOpp;
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                    } 
                }
    
                else if ((difference > (this.frameDistance*45)) && (difference <= (this.frameDistance*50))){
                    
                    console.log("8")
                    console.log("frameDistance * 10 = " + 5.56*50)
                    while(this.yDist < this.endPt[1]-(this.frameDistance*40)){
                        this.count++; 
                        this.yDist += this.quadOpp;
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                    } 
                }
    
                let j = 0;
                let k = 2;
                
                //stop path cycle 
                while (j<12){
                    j++;
                    this.count++;
                    this.yDist += this.frameDistance*k; // Multiply this.xDist x2 if horizontal
                    k = (k*.8);
                    this.yDist -= this.frameDistance*1.2; //Previously -=6
                    this.startPt[0] = this.xDist;
                    this.startPt[1] = this.yDist;
                    $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                } 
    
                //Reset start Points
                document.getElementById('startPoint').style.left = this.endPt[0] + 'px' 
                document.getElementById('startPoint').style.top = this.endPt[1] + 'px'
                
                if (this.endAngle == undefined){
                    this.animateCharacterWalk(this.pathCount)
                }
    
                //if char.endAngle is defined, rotate, then animate : if quad 1, then cabbit-rotate-0-quad1-1 to 4
                    
                else {  
                     this.rotateCharacter().then(()=>{   
                        this.animateCharacterWalk(this.pathCount); 
                    }); 
                }
            } 
        }  
    }
 
    rotateCharacter(){  

        let thisEl

        if (this.pathInterrupted == true){
            let itemClass = '.' + 'pathPoint' + this.pathCount 
            thisEl = $(itemClass).eq(0).append("<img width='" + this.width + "' height='" + this.height + "' class='cabbit' />") //add img child with this.height and this.width 
            thisEl[0].classList.add('tempPoint')
            thisEl[0].classList.remove('pathPoint' + this.pathCount)
        } 

        else {
            //hack job  
            thisEl = $('.pathPoint')  
            thisEl[0].classList.add('tempPoint')
            thisEl[0].classList.remove('pathPoint') 
        } 
       
        /*
        let rotate0q1 = [this.gif.r0q1x1, this.gif.r0q1x2, this.gif.r0q1x3, this.gif.r0q1x4]
        let rotate0q2 = [this.gif.r0q2x1, this.gif.r0q2x2, this.gif.r0q2x3, this.gif.r0q2x4, this.gif.r0q2x5, this.gif.r0q2x6, this.gif.r0q2x7]
        let rotate0q3 = [this.gif.r0q3x1, this.gif.r0q3x2, this.gif.r0q3x3, this.gif.r0q3x4, this.gif.r0q3x5, this.gif.r0q3x6]
        let rotate0q4 = [this.gif.r0q4x1, this.gif.r0q4x2, this.gif.r0q4x3, this.gif.r0q4x4]*/

        let p = new Promise((resolve, reject) => { 
            //rotate 0 to quad 1
            if (this.endAngle == 0 && this.currQuad == 1){ 
                thisEl[0].firstChild.src = './cabbit-rotate-0-quad1-1.gif'; 
                //$('.pathPoint').eq(0).html('<img id="tempPt" src=' + gifSrc + 1 + '.gif' + ' style="position : relative; height : 400px; width : 300px; left : -150px; top : -200px;">');
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-0-quad1-2.gif'; 
                },76); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-0-quad1-3.gif';
             
                },76*2); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-0-quad1-4.gif'; 
                    resolve(this); 
                },76*3); 
                 
            }
            //rotate 0 to quad 2
            else if (this.endAngle == 0 && this.currQuad == 2){ 
                thisEl[0].firstChild.src = './cabbit-rotate-0-quad2-1.gif';
    
                //$('.pathPoint').eq(0).html('<img id="tempPt" src=' + gifSrc + 1 + '.gif' + ' style="position : relative; height : 400px; width : 300px; left : -150px; top : -200px;">');
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-0-quad2-2.gif';
   
                },76); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-0-quad2-3.gif';
      
                },76*2); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-0-quad2-4.gif';
           
                },76*3); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-0-quad2-5.gif';
                
                },76*4); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-0-quad2-6.gif';
             
                    resolve(); 
                },76*5); 
    
            }
            //rotate 0 to quad 3
            else if (this.endAngle == 0 && this.currQuad == 3){ 
                thisEl[0].firstChild.src = './cabbit-rotate-0-quad3-1.gif';
                //$('.pathPoint').eq(0).html('<img id="tempPt" src=' + gifSrc + 1 + '.gif' + ' style="position : relative; height : 400px; width : 300px; left : -150px; top : -200px;">');
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-0-quad3-2.gif';
                },76); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-0-quad3-3.gif';
                },76*2); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-0-quad3-4.gif';
                },76*3);
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-0-quad3-5.gif';
                },76*4); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-0-quad3-6.gif';
                    resolve(); 
                },76*5);  
    
            }
            //rotate 0 to quad 4
            else if (this.endAngle == 0 && this.currQuad == 4){ 

                thisEl[0].firstChild.src = './cabbit-rotate-0-quad4-1.gif'; 
                //$('.pathPoint').eq(0).html('<img id="tempPt" src=' + gifSrc + 1 + '.gif' + ' style="position : relative; height : 400px; width : 300px; left : -150px; top : -200px;">');
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-0-quad4-2.gif';
       
                },76); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-0-quad4-3.gif';
       
                },76*2); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-0-quad4-4.gif';
       
                    resolve(this); 
                },76*3); 
            } 

            else if(this.endAngle == 90 && this.currQuad == 1){
                thisEl[0].firstChild.src = './cabbit-rotate-90-quad1-1.gif'; 
                //$('.pathPoint').eq(0).html('<img id="tempPt" src=' + gifSrc + 1 + '.gif' + ' style="position : relative; height : 400px; width : 300px; left : -150px; top : -200px;">');
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-90-quad1-2.gif';
       
                },76); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-90-quad1-3.gif';
       
                },76*2); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-90-quad1-4.gif';
       
                    resolve(this); 
                },76*3); 
            }

            else if(this.endAngle == 90 && this.currQuad == 2){
                thisEl[0].firstChild.src = './cabbit-rotate-90-quad2-1.gif'; 
                //$('.pathPoint').eq(0).html('<img id="tempPt" src=' + gifSrc + 1 + '.gif' + ' style="position : relative; height : 400px; width : 300px; left : -150px; top : -200px;">');
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-90-quad2-2.gif';
       
                },76); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-90-quad2-3.gif';
       
                },76*2); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-90-quad2-4.gif';
       
                    resolve(this); 
                },76*3); 
            }

            else if(this.endAngle == 90 && this.currQuad == 3){
                thisEl[0].firstChild.src = './cabbit-rotate-90-quad3-1.gif'; 
                //$('.pathPoint').eq(0).html('<img id="tempPt" src=' + gifSrc + 1 + '.gif' + ' style="position : relative; height : 400px; width : 300px; left : -150px; top : -200px;">');
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-90-quad3-2.gif';
       
                },76); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-90-quad3-3.gif';
       
                },76*2); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-90-quad3-4.gif';
        
                },76*3); 

                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-90-quad3-4.gif';
        
                },76*4); 

                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-90-quad3-5.gif';
        
                },76*5); 

                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-90-quad3-6.gif';
        
                },76*6); 

                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-90-quad3-7.gif';
        
                },76*7);
                
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-90-quad3-8.gif';
        
                },76*8); 

                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-90-quad3-9.gif';
        
                },76*9); 

                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-90-quad3-10.gif';
       
                    resolve(this); 
                },76*10); 
            }

            else if(this.endAngle == 90 && this.currQuad == 4){
                thisEl[0].firstChild.src = './cabbit-rotate-90-quad4-1.gif'; 
                //$('.pathPoint').eq(0).html('<img id="tempPt" src=' + gifSrc + 1 + '.gif' + ' style="position : relative; height : 400px; width : 300px; left : -150px; top : -200px;">');
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-90-quad4-2.gif';
       
                },76); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-90-quad4-3.gif';
       
                },76*2); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-90-quad4-4.gif';
        
                },76*3);  

                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-90-quad4-5.gif';
        
                },76*4); 

                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-90-quad4-6.gif';
        
                },76*5); 

                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-90-quad4-7.gif';
        
                },76*6);
                
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-90-quad4-8.gif';
        
                },76*7); 

                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-90-quad4-9.gif';
        
                },76*8); 

                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-90-quad4-10.gif';
                    resolve(this); 
                },76*9);  

            } 

            else if(this.endAngle == 180 && this.currQuad == 1) {

                thisEl[0].firstChild.src = './cabbit-rotate-180-quad1-1.gif'; 
     
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-180-quad1-2.gif';
       
                },76); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-180-quad1-3.gif';
       
                },76*2); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-180-quad1-4.gif';
        
                },76*3);  

                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-180-quad1-5.gif';
        
                },76*4); 

                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-180-quad1-6.gif';
        
                },76*5); 

                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-180-quad1-7.gif';
        
                },76*6);

                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-180-quad1-8.gif';
                    resolve(this); 
                },76*7); 
            }

            else if(this.endAngle == 180 && this.currQuad == 2){
                thisEl[0].firstChild.src = './cabbit-rotate-180-quad2-1.gif'; 
                //$('.pathPoint').eq(0).html('<img id="tempPt" src=' + gifSrc + 1 + '.gif' + ' style="position : relative; height : 400px; width : 300px; left : -150px; top : -200px;">');
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-180-quad2-2.gif';
       
                },76); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-180-quad2-3.gif';
       
                },76*2); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-180-quad2-4.gif';
       
                    resolve(this); 
                },76*3); 
            }

            else if(this.endAngle == 180 && this.currQuad == 3){
                thisEl[0].firstChild.src = './cabbit-rotate-180-quad3-2.gif'; 
                //$('.pathPoint').eq(0).html('<img id="tempPt" src=' + gifSrc + 1 + '.gif' + ' style="position : relative; height : 400px; width : 300px; left : -150px; top : -200px;">');
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-180-quad3-1.gif';
       
                },76); 
     
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-180-quad3-3.gif';
       
                    resolve(this); 
                },76*2); 
            }

            else if (this.endAngle == 180 && this.currQuad == 4){
                thisEl[0].firstChild.src = './cabbit-rotate-180-quad4-1.gif';
    
                //$('.pathPoint').eq(0).html('<img id="tempPt" src=' + gifSrc + 1 + '.gif' + ' style="position : relative; height : 400px; width : 300px; left : -150px; top : -200px;">');
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-180-quad4-2.gif';
   
                },76); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-180-quad4-3.gif';
      
                },76*2); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-180-quad4-4.gif';
           
                },76*3); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-180-quad4-5.gif';
                
                },76*4); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-180-quad4-6.gif';
             
                },76*5); 

                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-180-quad4-7.gif';
                    resolve(this); 
                },76*6); 


                
            }


            //rotate 38.5 to quad 4
            else if (this.endAngle == 38.5 && this.currQuad == 4){ 
                thisEl[0].firstChild.src = './cabbit-rotate-0-quad4-1.gif' 
 
                //$('.pathPoint').eq(0).html('<img id="tempPt" src=' + gifSrc + 1 + '.gif' + ' style="position : relative  height : 400px  width : 300px  left : -150px  top : -200px ">') 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-0-quad4-2.gif' 
       
                },76)  
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-0-quad4-3.gif' 
       
                },76*2)  
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-0-quad4-4.gif' 
       
                    resolve(this)  
                },76*3)  
            } 

            else if(this.endAngle == 270 && this.currQuad == 1){
                thisEl[0].firstChild.src = './cabbit-rotate-270-quad1-1.gif';
    
                //$('.pathPoint').eq(0).html('<img id="tempPt" src=' + gifSrc + 1 + '.gif' + ' style="position : relative; height : 400px; width : 300px; left : -150px; top : -200px;">');
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-270-quad1-2.gif';
   
                },76); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-270-quad1-3.gif';
      
                },76*2); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-270-quad1-4.gif';
           
                },76*3); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-270-quad1-5.gif';
                
                },76*4); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-270-quad1-6.gif';
             
                },76*5); 

                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-270-quad1-7.gif'; 
                },76*6); 

                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-270-quad1-8.gif';
                    resolve(this); 
                },76*7); 
            }

            else if(this.endAngle == 270 && this.currQuad == 2){
                thisEl[0].firstChild.src = './cabbit-rotate-270-quad2-1.gif';
    
                //$('.pathPoint').eq(0).html('<img id="tempPt" src=' + gifSrc + 1 + '.gif' + ' style="position : relative; height : 400px; width : 300px; left : -150px; top : -200px;">');
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-270-quad2-2.gif';
   
                },76); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-270-quad2-3.gif';
      
                },76*2); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-270-quad2-4.gif';
           
                },76*3); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-270-quad2-5.gif';
                
                },76*4); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-270-quad2-6.gif';
             
                },76*5); 

                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-270-quad2-7.gif'; 
                },76*6); 

                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-270-quad2-8.gif'; 
                },76*7); 

                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-270-quad2-9.gif';
                    resolve(this); 
                },76*8); 
            }

            else if(this.endAngle == 270 && this.currQuad == 3){
                thisEl[0].firstChild.src = './cabbit-rotate-270-quad3-1.gif' 
 
                //$('.pathPoint').eq(0).html('<img id="tempPt" src=' + gifSrc + 1 + '.gif' + ' style="position : relative  height : 400px  width : 300px  left : -150px  top : -200px ">') 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-270-quad3-2.gif' 
       
                },76)  
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-270-quad3-3.gif' 
                    resolve(this)  
                },76*2)   
            }

            else if(this.endAngle == 270 && this.currQuad == 4){
                thisEl[0].firstChild.src = './cabbit-rotate-270-quad4-1.gif' 
 
                //$('.pathPoint').eq(0).html('<img id="tempPt" src=' + gifSrc + 1 + '.gif' + ' style="position : relative  height : 400px  width : 300px  left : -150px  top : -200px ">') 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-270-quad4-2.gif' 
       
                },76)  
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-270-quad4-3.gif' 
                    resolve(this)  
                },76*2)   
            }
            
        }) 
    
        return p  
    }

    animateCharacterWalk(pathCount){   
        
        this.inMotion = true   
        for(let i=1; i<=this.count; i++){ 
            this.pauseDisplay(i, this.currQuad, this.angle, this.pivot, (this.count - 6))
            .then((result) => { //****** 12-8-22 *** previously  this.count-7
                this.endAngle = result.angle 
                return this.displayChar(result, pathCount)
            })
            .then((result) => {
                
                return this.stopDisplay(result, pathCount) 
            })
            .catch((err) => { 
                console.log(err)
            })
        } 

    } 

    pauseDisplay(index, quad, angle, pivot, pathEnd){
         
        let state = {}  
        state.index 
        state.angle  // 0, 38.5, 90, 128.5, 180, 240, 270, 300
        state.pathEnd = false 
        state.pathEndFrame 
        state.frameIndex  
        state.stopFrameIndex   
    
        //QUAD 1
        //if quad is 1 and character angle is greater than 38.5 and  this.count <= pivot
            //then angle is cabbit walk 38.5
        if ((quad == 1 && angle > 38.5) && (index <= pivot)){ //angle is calculated from 90
            state.index = index 
            state.angle = 38.5 
        }
        
        //else if quad is 1 and char angle is greater than 38.5 and  this.count > pivot
            //then angle is cabbit walk 0
        else if ((quad == 1 && angle > 38.5) && (index > pivot)){ //angle is calculated from 90
            state.index = index 
            state.angle = 0 
        }
    
        //else if quad is 1 and char angle is less than 38.5 and  this.count <= pivot
            //then angle is cabbit walk 38.5
        else if ((quad == 1 && angle <= 38.5) && (index <= pivot)){ //angle is calculated from 90
            state.index = index 
            state.angle = 38.5 
        }
    
        //else if quad is 1 and char angle is lessthan 38.5 and  this.count > pivot
            //then angle is cabbit walk 90
        else if ((quad == 1 && angle <= 38.5) && (index > pivot)){ //angle is calculated from 90
            state.index = index 
            state.angle = 90 
        } 
    
         //QUAD 2
        if ((quad == 2 && angle > 38.5) && (index <= pivot)){ //angle is calculated from 90
            state.index = index 
            state.angle = 141.5 
        }
        
        //else if quad is 1 and char angle is greater than 38.5 and  this.count > pivot
            //then angle is cabbit walk 0
        else if ((quad == 2 && angle > 38.5) && (index > pivot)){ //angle is calculated from 90
            state.index = index 
            state.angle = 180 
        }
    
        else  if ((quad == 2 && angle <= 38.5) && (index <= pivot)){ //angle is calculated from 90
            state.index = index 
            state.angle = 141.5 
        }
        
        //else if quad is 1 and char angle is greater than 38.5 and  this.count > pivot
            //then angle is cabbit walk 0
        else if ((quad == 2 && angle <= 38.5) && (index > pivot)){ //angle is calculated from 90
            state.index = index 
            state.angle = 90 
        }
     
        //QUAD 3
        if ((quad == 3 && angle > 38.5) && (index <= pivot)){  
            state.index = index 
            state.angle = 225 
        }
        
        else if ((quad == 3 && angle > 38.5) && (index > pivot)){  
            state.index = index 
            state.angle = 180 
        }
        
        else  if ((quad == 3 && angle <= 38.5) && (index <= pivot)){  
            state.index = index 
            state.angle = 225 
        }
        
        else if ((quad == 3 && angle <= 38.5) && (index > pivot)){  
            state.index = index 
            state.angle = 270 
        }
        
        //QUAD 4
        if ((quad == 4 && angle > 38.5) && (index <= pivot)){  
            
            state.index = index 
            state.angle = 292 
        }
        
        else if ((quad == 4 && angle > 25) && (index > pivot)){  
            state.index = index 
            state.angle = 0  
        }  

        else  if ((quad == 4 && angle <= 38.5) && (index <= pivot)){  
            state.index = index 
            state.angle = 292 
        }
        
        else if ((quad == 4 && angle <= 38.5) && (index > pivot)){  
            state.index = index 
            state.angle = 270 
        }
        
        if(state.index >= pathEnd){ 
            state.pathEnd = true 
        }
        
        if(state.index == pathEnd){
            state.pathEndFrame = state.index 
        }
        
        if(state.index > pathEnd){
            state.pathEndFrame = pathEnd 
        }
        
        let p = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(state) 
            }, index*66.667)//  1/15 of a second = 66.667
        })
   
        return p
    
    }

    displayChar(state, pathCount){ 
         
        let p = new Promise((resolve, reject) => {
    
            let srcGif  //URL for image 
     
            for(let j=1; j<=state.index; j++){  
                if(j<12){ 
                    state.frameIndex = j 
                }
                else if((j%12) == 0){ 
                    state.frameIndex = 12 
                }
                else if(j>12){ 
                    state.frameIndex = (j%12) 
                } 
            }

            let thisIndex = ((state.frameIndex)-1)  


            if(this.angle == 0){
                switch(thisIndex){
                    case 0:
                        srcGif = 'w0x1'
                        break
                    case 1:
                        srcGif = 'w0x2'
                        break
                    case 2:
                        srcGif = 'w0x3'
                        break
                    case 3:
                        srcGif = 'w0x4'
                        break
                    case 4: 
                        srcGif = 'w0x5'
                        break
                    case 5:
                        srcGif = 'w0x6'
                        break
                    case 6:
                        srcGif = 'w0x7'
                        break
                    case 7:
                        srcGif = 'w0x8'
                        break
                    case 8:
                        srcGif = 'w0x9'
                        break
                    case 9: 
                        srcGif = 'w0x10'
                        break
                    case 10:
                        srcGif = 'w0x11'
                        break
                    case 11: 
                        srcGif = 'w0x12'
                        break 
                }
            }
 
            
            let walk0 = []
            let walk45 = [this.gif.w45x1, this.gif.w45x2, this.gif.w45x3, this.gif.w45x4, this.gif.w45x5,  this.gif.w45x6, this.gif.w45x7, this.gif.w45x8, this.gif.w45x9, this.gif.w45x10, this.gif.w45x11, this.gif.w45x12] 
            let walk90 = []
            let walk135 = [this.gif.w135x1, this.gif.w135x2, this.gif.w135x3, this.gif.w135x4, this.gif.w135x5,  this.gif.w135x6, this.gif.w135x7, this.gif.w135x8, this.gif.w135x9, this.gif.w135x10, this.gif.w135x11, this.gif.w135x12] 
            let walk180 = []
            let walk225 = [this.gif.w225x1, this.gif.w225x2, this.gif.w225x3, this.gif.w225x4, this.gif.w225x5,  this.gif.w225x6, this.gif.w225x7, this.gif.w225x8, this.gif.w225x9, this.gif.w225x10, this.gif.w225x11, this.gif.w225x12] 
            let walk270 = [this.gif.w270x1, this.gif.w270x2, this.gif.w270x3, this.gif.w270x4, this.gif.w270x5,  this.gif.w270x6, this.gif.w270x7, this.gif.w270x8, this.gif.w270x9, this.gif.w270x10, this.gif.w270x11, this.gif.w270x12] 
            let walk292 = [this.gif.w292x1,  this.gif.w292x2,  this.gif.w292x3,  this.gif.w292x4,  this.gif.w292x5,   this.gif.w292x6,  this.gif.w292x7,  this.gif.w292x8,  this.gif.w292x9,  this.gif.w292x10,  this.gif.w292x11,  this.gif.w292x12] 
            
            if (state.angle == 0) {
 
                let temp0

                temp0 = new Image(this.width, this.height)  
                temp0.classList.add('cabbit')  
                temp0.src = './cabbit-walk-0-1.gif'   
                walk0.push(temp0)

                temp0 = new Image(this.width, this.height)   
                temp0.classList.add('cabbit')  
                temp0.src = './cabbit-walk-0-2.gif'  
                walk0.push(temp0)

                temp0 = new Image(this.width, this.height)   
                temp0.classList.add('cabbit')  
                temp0.src = './cabbit-walk-0-3.gif'  
                walk0.push(temp0) 

                temp0 = new Image(this.width, this.height)   
                temp0.classList.add('cabbit')  
                temp0.src = './cabbit-walk-0-4.gif'    
                walk0.push(temp0)

                temp0 = new Image(this.width, this.height)   
                temp0.classList.add('cabbit')  
                temp0.src = './cabbit-walk-0-5.gif'   
                walk0.push(temp0)

                temp0 = new Image(this.width, this.height)   
                temp0.classList.add('cabbit')  
                temp0.src = './cabbit-walk-0-6.gif'  
                walk0.push(temp0)

                temp0 = new Image(this.width, this.height)   
                temp0.classList.add('cabbit')  
                temp0.src = './cabbit-walk-0-7.gif'   
                walk0.push(temp0)

                temp0 = new Image(this.width, this.height)   
                temp0.classList.add('cabbit')  
                temp0.src = './cabbit-walk-0-8.gif'   
                walk0.push(temp0)

                temp0 = new Image(this.width, this.height)   
                temp0.classList.add('cabbit')  
                temp0.src = './cabbit-walk-0-9.gif'   
                walk0.push(temp0)

                temp0 = new Image(this.width, this.height)   
                temp0.classList.add('cabbit')  
                temp0.src = './cabbit-walk-0-10.gif'   
                walk0.push(temp0)

                temp0 = new Image(this.width, this.height)   
                temp0.classList.add('cabbit')  
                temp0.src = './cabbit-walk-0-11.gif'   
                walk0.push(temp0)

                temp0 = new Image(this.width, this.height)   
                temp0.classList.add('cabbit')  
                temp0.src = './cabbit-walk-0-12.gif'   
                walk0.push(temp0)  
            }

            else if(state.angle == 90){
 
                let temp90

                temp90 = new Image(this.width, this.height)  
                temp90.classList.add('cabbit')  
                temp90.src = './cabbit-walk-90-1.gif'   
                walk90.push(temp90)

                temp90 = new Image(this.width, this.height)   
                temp90.classList.add('cabbit')  
                temp90.src = './cabbit-walk-90-2.gif'  
                walk90.push(temp90)

                temp90 = new Image(this.width, this.height)   
                temp90.classList.add('cabbit')  
                temp90.src = './cabbit-walk-90-3.gif'  
                walk90.push(temp90) 

                temp90 = new Image(this.width, this.height)   
                temp90.classList.add('cabbit')  
                temp90.src = './cabbit-walk-90-4.gif'    
                walk90.push(temp90)

                temp90 = new Image(this.width, this.height)   
                temp90.classList.add('cabbit')  
                temp90.src = './cabbit-walk-90-5.gif'   
                walk90.push(temp90)

                temp90 = new Image(this.width, this.height)   
                temp90.classList.add('cabbit')  
                temp90.src = './cabbit-walk-90-6.gif'  
                walk90.push(temp90)

                temp90 = new Image(this.width, this.height)   
                temp90.classList.add('cabbit')  
                temp90.src = './cabbit-walk-90-7.gif'   
                walk90.push(temp90)

                temp90 = new Image(this.width, this.height)   
                temp90.classList.add('cabbit')  
                temp90.src = './cabbit-walk-90-8.gif'   
                walk90.push(temp90)

                temp90 = new Image(this.width, this.height)   
                temp90.classList.add('cabbit')  
                temp90.src = './cabbit-walk-90-9.gif'   
                walk90.push(temp90)

                temp90 = new Image(this.width, this.height)   
                temp90.classList.add('cabbit')  
                temp90.src = './cabbit-walk-90-10.gif'   
                walk90.push(temp90)

                temp90 = new Image(this.width, this.height)   
                temp90.classList.add('cabbit')  
                temp90.src = './cabbit-walk-90-11.gif'   
                walk90.push(temp90)

                temp90 = new Image(this.width, this.height)   
                temp90.classList.add('cabbit')  
                temp90.src = './cabbit-walk-90-12.gif'   
                walk90.push(temp90) 
            }

            else if (state.angle == 180){
 
                let temp180

                temp180 = new Image(this.width, this.height)  
                temp180.classList.add('cabbit')  
                temp180.src = './cabbit-walk-180-1.gif'   
                walk180.push(temp180)

                temp180 = new Image(this.width, this.height)   
                temp180.classList.add('cabbit')  
                temp180.src = './cabbit-walk-180-2.gif'  
                walk180.push(temp180)

                temp180 = new Image(this.width, this.height)   
                temp180.classList.add('cabbit')  
                temp180.src = './cabbit-walk-180-3.gif'  
                walk180.push(temp180) 

                temp180 = new Image(this.width, this.height)   
                temp180.classList.add('cabbit')  
                temp180.src = './cabbit-walk-180-4.gif'    
                walk180.push(temp180)

                temp180 = new Image(this.width, this.height)   
                temp180.classList.add('cabbit')  
                temp180.src = './cabbit-walk-180-5.gif'   
                walk180.push(temp180)

                temp180 = new Image(this.width, this.height)   
                temp180.classList.add('cabbit')  
                temp180.src = './cabbit-walk-180-6.gif'  
                walk180.push(temp180)

                temp180 = new Image(this.width, this.height)   
                temp180.classList.add('cabbit')  
                temp180.src = './cabbit-walk-180-7.gif'   
                walk180.push(temp180)

                temp180 = new Image(this.width, this.height)   
                temp180.classList.add('cabbit')  
                temp180.src = './cabbit-walk-180-8.gif'   
                walk180.push(temp180)

                temp180 = new Image(this.width, this.height)   
                temp180.classList.add('cabbit')  
                temp180.src = './cabbit-walk-180-9.gif'   
                walk180.push(temp180)

                temp180 = new Image(this.width, this.height)   
                temp180.classList.add('cabbit')  
                temp180.src = './cabbit-walk-180-10.gif'   
                walk180.push(temp180)

                temp180 = new Image(this.width, this.height)   
                temp180.classList.add('cabbit')  
                temp180.src = './cabbit-walk-180-11.gif'   
                walk180.push(temp180)

                temp180 = new Image(this.width, this.height)   
                temp180.classList.add('cabbit')  
                temp180.src = './cabbit-walk-180-12.gif'   
                walk180.push(temp180) 
            } 

            if (state.angle == 0){
                srcGif = walk0[thisIndex]  
            } 
            else if (state.angle == 38.5) { 
                srcGif = walk45[thisIndex]  
            } 
            else if (state.angle == 90){
                srcGif = walk90[thisIndex] 
            } 
            else if (state.angle == 141.5){
                srcGif = walk135[thisIndex] 
            }
            else if (state.angle == 180){
                srcGif = walk180[thisIndex] 
            }
            else if (state.angle == 225){
                srcGif = walk225[thisIndex] 
            }
            else if (state.angle == 270){
                srcGif = walk270[thisIndex] 
            }
            else if (state.angle == 292){
                srcGif = walk292[thisIndex] 
            }   
          
            if (state.pathEnd == false){ 
  
                let pathPt

                if(pathCount == 0) {
                    pathPt = '.' + 'pathPoint'
                }

                if(pathCount >= 1) {
                    pathPt = '.' + 'pathPoint' + pathCount
                }  
   

                if (this.pathInterrupted == true){ 

                    if(state.index == 1){
                        $('.tempPoint').remove() 
                    }

                    this.currIndex = state.index 
                    this.frameIndex = state.frameIndex
                     
                    $(pathPt).eq(state.index).append(srcGif)
                   
                    setTimeout(() => { 
                           $(pathPt).eq(state.index).empty()   
                    }, 70 )   
                       
                }

                else {   

                    this.currIndex = state.index 
                    this.frameIndex = state.frameIndex 
                    
                    $(pathPt).eq(state.index).append(srcGif) 
                        setTimeout(() => { 
                            $(pathPt).eq(state.index).empty()   
                    }, 70 )   
                }
                
                if (this.pathInterrupted == false){
                    $('.tempPoint').remove()
                } 
                
           }  
    
           if (state.index == state.pathEndFrame){
                state.stopFrameIndex = state.frameIndex 
           }
    
           if (state.pathEnd == true){
                $('body').css('pointer-events','none')    
                resolve(state) 
           }
            
        }) 
    
        return p 
        
    }

    stopDisplay(state, pathCount){ 

        let pathPt
        let gifSrc 

        if(pathCount == 0) {
            pathPt = '.' + 'pathPoint'
        }

        if(pathCount >= 1) {
            pathPt = '.' + 'pathPoint' + pathCount
        }   

        //let walk0 = [this.gif.w0x1, this.gif.w0x2, this.gif.w0x3,  this.gif.w0x4, this.gif.w0x4a, this.gif.w0x5, this.gif.w0x5a, this.gif.w0x6, this.gif.w0x7, this.gif.w0x8, this.gif.w0x8a,  this.gif.w0x9, this.gif.w0x9a, this.gif.w0x10, this.gif.w0x11, this.gif.w0x12];
        let walk45 = [this.gif.w45x1, this.gif.w45x2, this.gif.w45x3,  this.gif.w45x4, this.gif.w45x4a, this.gif.w45x5, this.gif.w45x5a,  this.gif.w45x6, this.gif.w45x7, this.gif.w45x8, this.gif.w45x8a, this.gif.w45x9, this.gif.w45x9a, this.gif.w45x10, this.gif.w45x11, this.gif.w45x12];
        let walk90 = [this.gif.w90x1, this.gif.w90x2, this.gif.w90x3,   this.gif.w90x4, this.gif.w90x4a, this.gif.w90x5, this.gif.w90x5a, this.gif.w90x6, this.gif.w90x7, this.gif.w90x8, this.gif.w90x8a, this.gif.w90x9, this.gif.w90x9a, this.gif.w90x10, this.gif.w90x11, this.gif.w90x12];
        let walk135 = [this.gif.w135x1, this.gif.w135x2, this.gif.w135x3,   this.gif.w135x4, this.gif.w135x4a, this.gif.w135x5, this.gif.w135x5a, this.gif.w135x6, this.gif.w135x7, this.gif.w135x8, this.gif.w135x8a, this.gif.w135x9, this.gif.w135x9a, this.gif.w135x10, this.gif.w135x11, this.gif.w135x12];
        //let walk180 = [this.gif.w180x1, this.gif.w180x2, this.gif.w180x3,  this.gif.w180x4, this.gif.w180x4a, this.gif.w180x5, this.gif.w180x5a,  this.gif.w180x6, this.gif.w180x7, this.gif.w180x8, this.gif.w180x8a,  this.gif.w180x9, this.gif.w180x9a, this.gif.w180x10, this.gif.w180x11, this.gif.w180x12];
        let walk225 = [this.gif.w225x1, this.gif.w225x2, this.gif.w225x3,   this.gif.w225x4, this.gif.w225x4a, this.gif.w225x5, this.gif.w225x5a,  this.gif.w225x6, this.gif.w225x7, this.gif.w225x8, this.gif.w225x8a, this.gif.w225x9, this.gif.w225x9a, this.gif.w225x10, this.gif.w225x11, this.gif.w225x12];
        let walk270 = [this.gif.w270x1, this.gif.w270x2, this.gif.w270x3,   this.gif.w270x4, this.gif.w270x4a,  this.gif.w270x5, this.gif.w270x5a,   this.gif.w270x6, this.gif.w270x7, this.gif.w270x8, this.gif.w270x8a, this.gif.w270x9, this.gif.w270x9a, this.gif.w270x10, this.gif.w270x11, this.gif.w270x12];
        let walk292 = [ this.gif.w292x1,  this.gif.w292x2, this.gif.w292x3,  this.gif.w292x4, this.gif.w292x4a,  this.gif.w292x5, this.gif.w292x5a,  this.gif.w292x6,  this.gif.w292x7,  this.gif.w292x8, this.gif.w292x8a, this.gif.w292x9, this.gif.w292x9a, this.gif.w292x10,  this.gif.w292x11,  this.gif.w292x12];

        let stop0 = []
        

        if (state.angle == 0){
            let charGif = new Image(this.width, this.height)  
            charGif.classList.add('cabbit')  
            charGif.src = './cabbit-walk-0-1.gif'   
            stop0.push(charGif)

            let charGif1 = new Image(this.width, this.height)   
            charGif1.classList.add('cabbit')  
            charGif1.src = './cabbit-walk-0-2.gif'  
            stop0.push(charGif1)

            let charGif2 = new Image(this.width, this.height)   
            charGif2.classList.add('cabbit')  
            charGif2.src = './cabbit-walk-0-3.gif'  
            stop0.push(charGif2) 

            let charGif4 = new Image(this.width, this.height)   
            charGif4.classList.add('cabbit')  
            charGif4.src = './cabbit-walk-0-4.gif'    
            stop0.push(charGif4)

            let charGif4a = new Image(this.width, this.height)   
            charGif4a.classList.add('cabbit')  
            charGif4a.src = './cabbit-walk-0-4a.gif'    
            stop0.push(charGif4a)

            let charGif5 = new Image(this.width, this.height)   
            charGif5.classList.add('cabbit')  
            charGif5.src = './cabbit-walk-0-5.gif'   
            stop0.push(charGif5)

            let charGif5a = new Image(this.width, this.height)   
            charGif5a.classList.add('cabbit')  
            charGif5a.src = './cabbit-walk-0-5a.gif'    
            stop0.push(charGif5a)

            let charGif6 = new Image(this.width, this.height)   
            charGif6.classList.add('cabbit')  
            charGif6.src = './cabbit-walk-0-6.gif'  
            stop0.push(charGif6)

            let charGif7 = new Image(this.width, this.height)   
            charGif7.classList.add('cabbit')  
            charGif7.src = './cabbit-walk-0-7.gif'   
            stop0.push(charGif7)

            let charGif8 = new Image(this.width, this.height)   
            charGif8.classList.add('cabbit')  
            charGif8.src = './cabbit-walk-0-8.gif'   
            stop0.push(charGif8)

            let charGif8a = new Image(this.width, this.height)   
            charGif8a.classList.add('cabbit')  
            charGif8a.src = './cabbit-walk-0-8a.gif'   
            stop0.push(charGif8a)

            let charGif9 = new Image(this.width, this.height)   
            charGif9.classList.add('cabbit')  
            charGif9.src = './cabbit-walk-0-9.gif'   
            stop0.push(charGif9)

            let charGif9a = new Image(this.width, this.height)   
            charGif9a.classList.add('cabbit')  
            charGif9a.src = './cabbit-walk-0-9a.gif'   
            stop0.push(charGif9a) 

            let charGif10 = new Image(this.width, this.height)   
            charGif10.classList.add('cabbit')  
            charGif10.src = './cabbit-walk-0-10.gif'   
            stop0.push(charGif10)

            let charGif11 = new Image(this.width, this.height)   
            charGif11.classList.add('cabbit')  
            charGif11.src = './cabbit-walk-0-11.gif'   
            stop0.push(charGif11)

            let charGif12 = new Image(this.width, this.height)   
            charGif12.classList.add('cabbit')  
            charGif12.src = './cabbit-walk-0-12.gif'   
            stop0.push(charGif12)  

        }

        let stop180 = []

        if (state.angle == 180){
            let charGif = new Image(this.width, this.height)  
            charGif.classList.add('cabbit')  
            charGif.src = './cabbit-walk-180-1.gif'   
            stop180.push(charGif)

            let charGif1 = new Image(this.width, this.height)   
            charGif1.classList.add('cabbit')  
            charGif1.src = './cabbit-walk-180-2.gif'  
            stop180.push(charGif1)

            let charGif2 = new Image(this.width, this.height)   
            charGif2.classList.add('cabbit')  
            charGif2.src = './cabbit-walk-180-3.gif'  
            stop180.push(charGif2) 

            let charGif4 = new Image(this.width, this.height)   
            charGif4.classList.add('cabbit')  
            charGif4.src = './cabbit-walk-180-4.gif'    
            stop180.push(charGif4)

            let charGif4a = new Image(this.width, this.height)   
            charGif4a.classList.add('cabbit')  
            charGif4a.src = './cabbit-walk-180-4a.gif'    
            stop180.push(charGif4a)

            let charGif5 = new Image(this.width, this.height)   
            charGif5.classList.add('cabbit')  
            charGif5.src = './cabbit-walk-180-5.gif'   
            stop180.push(charGif5)

            let charGif5a = new Image(this.width, this.height)   
            charGif5a.classList.add('cabbit')  
            charGif5a.src = './cabbit-walk-180-5a.gif'    
            stop180.push(charGif5a)

            let charGif6 = new Image(this.width, this.height)   
            charGif6.classList.add('cabbit')  
            charGif6.src = './cabbit-walk-180-6.gif'  
            stop180.push(charGif6)

            let charGif7 = new Image(this.width, this.height)   
            charGif7.classList.add('cabbit')  
            charGif7.src = './cabbit-walk-180-7.gif'   
            stop180.push(charGif7)

            let charGif8 = new Image(this.width, this.height)   
            charGif8.classList.add('cabbit')  
            charGif8.src = './cabbit-walk-180-8.gif'   
            stop180.push(charGif8)

            let charGif8a = new Image(this.width, this.height)   
            charGif8a.classList.add('cabbit')  
            charGif8a.src = './cabbit-walk-180-8a.gif'   
            stop180.push(charGif8a)

            let charGif9 = new Image(this.width, this.height)   
            charGif9.classList.add('cabbit')  
            charGif9.src = './cabbit-walk-180-9.gif'   
            stop180.push(charGif9)

            let charGif9a = new Image(this.width, this.height)   
            charGif9a.classList.add('cabbit')  
            charGif9a.src = './cabbit-walk-180-9a.gif'   
            stop180.push(charGif9a) 

            let charGif10 = new Image(this.width, this.height)   
            charGif10.classList.add('cabbit')  
            charGif10.src = './cabbit-walk-180-10.gif'   
            stop180.push(charGif10)

            let charGif11 = new Image(this.width, this.height)   
            charGif11.classList.add('cabbit')  
            charGif11.src = './cabbit-walk-180-11.gif'   
            stop180.push(charGif11)

            let charGif12 = new Image(this.width, this.height)   
            charGif12.classList.add('cabbit')  
            charGif12.src = './cabbit-walk-180-12.gif'   
            stop180.push(charGif12)  

        }
        
        if (state.angle == 38.5) {
            gifSrc = walk45
        } 
        else if (state.angle == 0){
            gifSrc = stop0
        }
        else if (state.angle == 90){
            gifSrc = walk90
        } 
        else if (state.angle == 141.5){
            gifSrc = walk135
        }
        else if (state.angle == 180){
            gifSrc = stop180
        }
        else if (state.angle == 225){
            gifSrc = walk225
        }
        else if (state.angle == 270){
            gifSrc = walk270
        }
        else if (state.angle == 292){
            gifSrc = walk292
        } 
     
        if (state.index == state.pathEndFrame){ 
            
            $(pathPt).eq(state.index).append(gifSrc[state.frameIndex-1])
            //document.getElementsByClassName('pathPoint')[state.index].innerHTML += gifSrc[state.frameIndex-1]
            //$('.pathPoint').eq(state.index).html('<img src=' + gifSrc + state.frameIndex + '.gif' + ' style="position : relative; height : 350px; width : 262.5px; left : -150px; top : -200px;">');      
            setTimeout(() => {
                //document.getElementsByClassName('pathPoint')[state.index].empty();  
                $(pathPt).eq(state.index).empty();  
            }, 76 ); 
            
        }
    
        else if (state.index > state.pathEndFrame){ 
    
            let difference = state.index - state.pathEndFrame;  
            let stopFrameIndex = state.frameIndex - difference;
            let thisIndex = state.frameIndex;  
            let amt 

            if(this.currQuad == 1){
                amt = 4
            }

            if(this.currQuad == 2){
                amt = 4
            }

            if(this.currQuad == 3){
                amt = 4
            }

            if(this.currQuad == 4){
                amt = 4
            }
            
            //2
            if (stopFrameIndex == 2 && difference == 4){
               // thisIndex = "6";
               thisIndex = 7
            }
    
            if (stopFrameIndex == 2 && difference == 5){
               // thisIndex = "6";
               thisIndex = 7
            }
    
            //3
            if (stopFrameIndex == 3 && difference == 2){
                //thisIndex = "4a";
                thisIndex = 4
            }
    
            if (stopFrameIndex == 3 && difference == 3){
                //thisIndex = "5";
                thisIndex = 5
            }
    
            if (stopFrameIndex == 3 && difference == 4){
                //thisIndex = "5a";
                thisIndex = 6;
            }
    
            if (stopFrameIndex == 3 && difference == 5){
                //thisIndex = "6";
                thisIndex = 7
            }
    
            //4
            if (stopFrameIndex == 4 && difference == 1){
                //thisIndex = "4a";
                thisIndex = 4
            }
    
            if (stopFrameIndex == 4 && difference == 2){
                //thisIndex = "5";
                thisIndex = 5
            }
    
            if (stopFrameIndex == 4 && difference == 3){
                //thisIndex = "5a";
                thisIndex = 6;
            }
    
            if (stopFrameIndex == 4 && difference == 4){
                //thisIndex = "6";
                thisIndex = 7
            }
    
            if (stopFrameIndex == 4 && difference == 5){
                //thisIndex = "6";
                thisIndex = 7
            }
    
            //6
            if (stopFrameIndex == 6 && difference == 5){
                //thisIndex = "10";
                thisIndex = 13
            }
    
            //7
            if (stopFrameIndex == 7 && difference == 2){
                //thisIndex = "8a";
                thisIndex = 9
            } 
    
            if (stopFrameIndex == 7 && difference == 3){
                //thisIndex = "9";
                thisIndex = 11
            }
    
            if (stopFrameIndex == 7 && difference == 4){
                //thisIndex = "10";
                thisIndex = 13
            }
    
            if (stopFrameIndex == 7 && difference == 5){
                //thisIndex = "10";
                thisIndex = 13
            }
    
            //8
            if (stopFrameIndex == 8 && difference == 1){
                //thisIndex = "8a";
                thisIndex = 9
            }
    
            if (stopFrameIndex == 8 && difference == 2){
                //thisIndex = "9";
                thisIndex = 11
            }
    
            if (stopFrameIndex == 8 && difference == 3){
                //thisIndex = "9a";
                thisIndex = 12;
            }
    
            if (stopFrameIndex == 8 && difference == 4){
                //thisIndex = "10";
                thisIndex = 13
            }
    
            if (stopFrameIndex == 8 && difference == 5){
                //thisIndex = "10";
                thisIndex = 13
            }
    
            //9
            if (stopFrameIndex == 9 && difference == 1){
                //thisIndex = "9a";
                thisIndex = 12;
            }
    
            if (stopFrameIndex == 9 && difference == 2){
                //thisIndex = "10";
                thisIndex = 13
            }
    
            if (stopFrameIndex == 9 && difference == 3){
                //thisIndex = "11";
                thisIndex = 14
            }
    
            if (stopFrameIndex == 9 && difference == 4){
                //thisIndex = "12";
                thisIndex = 15
            }
    
            if (stopFrameIndex == 9 && difference == 5){
                //thisIndex = "12";
                thisIndex = 15
            }
    
            //10
            if (stopFrameIndex == 10 && difference == 3){
                //thisIndex = "1";
                thisIndex = 0
            }
    
            if (stopFrameIndex == 10 && difference == 4){
                //thisIndex = "2";
                thisIndex = 1
            }
    
            if (stopFrameIndex == 10 && difference == 5){
                //thisIndex = "4";
                thisIndex = 3
            }
    
            //11
            if (stopFrameIndex == 11 && difference == 2){
                //thisIndex = "1";
                thisIndex = 0
            }
    
            if (stopFrameIndex == 11 && difference == 3){
                //thisIndex = "2";
                thisIndex = 1
            }
    
            if (stopFrameIndex == 11 && difference == 4){
                //thisIndex = "3";
                thisIndex = 2
            }
    
            if (stopFrameIndex == 11 && difference == 5){
                //thisIndex = "4";
                thisIndex = 3
            }
    
            //12
            if (stopFrameIndex == 12 && difference == 1){
                thisIndex = difference-1;
            }
    
            if (stopFrameIndex == 12 && difference == 2){
                thisIndex = difference-1;
            }
    
            if (stopFrameIndex == 12 && difference == 3){
                thisIndex = difference-1; 
            }
    
            if (stopFrameIndex == 12 && difference == 4){
                thisIndex = difference-1;
            }
                 
            if (stopFrameIndex == 12 && difference == 5){
                thisIndex = difference-1;
            }  
 
            $(pathPt).eq(state.index).append(gifSrc[thisIndex]) 
              
            if(difference <= amt){
                setTimeout((thisIndex) => {
                  $(pathPt).eq(state.index).empty();  
                }, 76 ); 
            } 

            if(difference > amt){ 
                this.inMotion = false 
                this.pathInterrrupted = false 
                $('body').css('pointer-events','auto') 
            }
           
        }
    
    }

} 
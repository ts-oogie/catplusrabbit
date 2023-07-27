import {returnDivisor} from './divisor.js'    

export class characterObject {
    constructor(startPt, endPt, frameDistance, gifs, w, h, name, currIndex ) {
        this.adj
        this.angle  
        this.calibration
        this.count = 0
        this.classLabel
        this.direction
        this.divisor 
        this.gif = gifs 
        this.height = h
        this.currIndex = currIndex
        this.currQuad
        this.currXPt
        this.currYPt
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
        this.quadAngle 
        this.quadOpp 
        this.startPt = startPt   
        this.stopPt
        this.width = w
        this.xDist 
        this.yDist  
        this.yMin
        this.yMax
    }

  
    
    returnDivisor(x, y, z){
       return returnDivisor(x, y, z)
    } 

    //separate path builder
    moveCharacter(yMin, yMax){    

        this.yMin = yMin
        this.yMax = yMax
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
        //if endPt Y is less than startPt Y && entPt X is greater than startPt X : 
        if (this.endPt[1] <= this.startPt[1] && this.endPt[0] >= this.startPt[0]){
    
            this.endPt[0] = this.endPt[0] - (window.innerWidth*.0277777777777)//subtract calibration July 3, 2023 This worked!!!!!
    
            console.log("quad 1  ")
             
            this.currQuad = 1//Define current quad number
            this.pivot = 0
            this.quadAngle = 38.5
            this.quadOpp = Math.round(this.frameDistance*Math.sin(this.quadAngle/(180/Math.PI)))//10px opp distance - 1 frame
            this.quadAdj = Math.round(this.frameDistance*Math.cos(this.quadAngle/(180/Math.PI)))//10px
    
            //if end point is between 0 and 38.5 degrees
            if ((this.angle >= 38.5) && (this.angle < 90)){
                console.log("pivot ")
                console.log("angle : " + this.angle)
                this.direction = 'pivot'    
    
                this.divisor = Math.abs(this.returnDivisor(this.startPt[1]-this.endPt[1],((this.startPt[1]-this.endPt[1])%this.quadOpp),this.quadOpp)) // divided
                this.xDist = this.startPt[0] //- 15 //HACK 
                this.yDist = this.startPt[1] - this.calibration*1.1;
    
                //construct path diagonal until ....
                //divisor calculates the number of points in the hypoteneuse
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
                    this.yDist -= .005039193729003*window.innerHeight//Previously -=6
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
                    this.yDist -= .005039193729003*window.innerHeight//Previously -=6
                    this.startPt[0] = this.xDist;
                    this.startPt[1] = this.yDist;
                    //document.getElementById('bgMain').innerHTML += '<div id="' +  this.count + '" class="pathPoint" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>';
                    $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                    
                } 
    
                //Reset start Points  
                document.getElementById('startPoint').style.left = this.endPt[0] + 'px' 
                document.getElementById('startPoint').style.top = this.endPt[1] - this.calibration  + 'px'
                 
    
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
    
            //cabbit.endPt[0] = cabbit.endPt[0] - (win.width*.0277777777777)
            
            //If the end point angle is between 38.5 and 90
             
            else if ((90-this.angle) >= 38.5 && (90-this.angle) < 90) { 
                //this.opp = Math.pow((this.endPt[0] - this.startPt[0]), 1)
                console.log("diagonal then up+" );
                console.log("angle : " + this.angle)
                this.xDist = this.startPt[0]   
                this.yDist = this.startPt[1]  
                //Copy this to quad 2 diagonal then up July 2, 2023
                this.divisor = Math.abs(this.returnDivisor(this.startPt[0]-(this.endPt[0]+(window.innerWidth*.0277777777777)),((this.startPt[0]-(this.endPt[0]+(window.innerWidth*.0277777777777)))%this.quadAdj), this.quadAdj));
                
                //construct path diagonal until 
                while (this.count < this.divisor*2){  
                    this.xDist += this.quadAdj;  
                    this.yDist -= this.quadOpp*3.5; 
                    this.count++;
                    this.pivot++;
                    $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                }     
                
                //construct vertical path
                let difference = this.startPt[1]-this.endPt[1]   
                this.endPt[1] = this.endPt[1] - (window.innerHeight*.0277777777777)//subtract calibration July 3, 2023 This worked!!!!!

            
                if ((difference > (this.frameDistance*0)) && (difference <= (this.frameDistance*20))){
                    console.log("0-20") 
                    while(this.yDist < this.endPt[1]-(this.frameDistance*20)){ 
                        this.count++   
                        this.yDist -= this.calibration*1.3;
                        this.yDist -= window.innerHeight*.0067415
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>')
                    } 
                }
    
                else if ((difference > (this.frameDistance*20)) && (difference <= (this.frameDistance*35))){
                    console.log("20-35")
                    //this.endPt[1] = this.endPt[1] + (window.innerHeight*.0277777777777)//subtract calibration July 3, 2023 This worked!!!!!

                    //if (this.endPt[0]-this.startPt[0] < 82) { *** CHANGE TO THIS JULY 11
                    if (this.endPt[0]-this.startPt[0] < .0464*window.innerWidth){ 
                        while(this.yDist < this.endPt[1]-(this.frameDistance*30)){
                            this.count++; 
                            this.yDist -= this.calibration*1.3;
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                     }   
                } 
    
                else if ((difference > (this.frameDistance*35)) && (difference <= (this.frameDistance*45))){
                    console.log("35-45")
                    //if x/winWidth < .685*winWidth: 
                    //this.endPt[1] = this.endPt[1] - (window.innerHeight*.05)//subtract calibration July 3, 2023 This worked!!!!!

                    if (this.endPt[0]-this.startPt[0] < .04*window.innerWidth){ 
                            console.log("X Diff : " + (this.endPt[0]-this.startPt[0]))
                            console.log("X Dist Max 1 : " + (.04*window.innerWidth))
                            console.log("X Dist Max 2 : " + (.67*window.innerWidth))
                        while(this.yDist < this.endPt[1]-(this.frameDistance*34)){
                            this.count++; 
                            this.yDist -= this.calibration*1.3;
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    } 

                }
    
                else if ((difference > (this.frameDistance*45)) && (difference <= (this.frameDistance*55))){
                    console.log("45-55")
                    //this.endPt[1] = this.endPt[1] + (window.innerHeight*.01)
                    console.log("X Diff : " + this.endPt[0]-this.startPt[0])
                    console.log(".04*window.innerWidth : " + (.04*window.innerWidth))
                    if (this.endPt[0]-this.startPt[0] < .04*window.innerWidth){ 
                        while(this.yDist < this.endPt[1]-(this.frameDistance*43)){
                            this.count++; 
                            this.yDist -= this.calibration*1.3;
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.endPt[0]-this.startPt[0]  > .04*window.innerWidth && this.endPt[0]-this.startPt[0] < .067*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*47)){
                            this.count++; 
                            this.yDist -= this.calibration*1.3;
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                } 

                else if ((difference > (this.frameDistance*55)) && (difference <= (this.frameDistance*75))){
                    console.log("55-75")
                    if (this.endPt[0]-this.startPt[0] < .04*window.innerWidth){ 
                        while(this.yDist < this.endPt[1]-(this.frameDistance*50)){
                            this.count++; 
                            this.yDist -= this.calibration*1.3;
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.endPt[0]-this.startPt[0]  > .04*window.innerWidth && this.endPt[0]-this.startPt[0] < .067*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*53)){
                            this.count++; 
                            this.yDist -= this.calibration*1.3;
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.endPt[0]-this.startPt[0]  > .067*window.innerWidth && this.endPt[0]-this.startPt[0] < .095*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*55)){
                            this.count++; 
                            this.yDist -= this.calibration*1.3;
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                 
                } 
    
                else if ((difference > (this.frameDistance*75)) && (difference <= (this.frameDistance*95))){
                    console.log("75-95")
                    if (this.endPt[0]-this.startPt[0] < .04*window.innerWidth){ 
                        while(this.yDist < this.endPt[1]-(this.frameDistance*63)){
                            this.count++; 
                            this.yDist -= this.calibration*1.3;
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }  
                    else if(this.endPt[0]-this.startPt[0]  > .04*window.innerWidth && this.endPt[0]-this.startPt[0] < .067*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*66)){
                            this.count++; 
                            this.yDist -= this.calibration*1.3;
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    } 
                    else if(this.endPt[0]-this.startPt[0]  > .067*window.innerWidth && this.endPt[0]-this.startPt[0] < .095*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*70)){
                            this.count++; 
                            this.yDist -= this.calibration*1.3;
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.endPt[0]-this.startPt[0]  > .095*window.innerWidth && this.endPt[0]-this.startPt[0] < .125*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*76)){
                            this.count++; 
                            this.yDist -= this.calibration*1.3;
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    
                }  
    
                else if ((difference > (this.frameDistance*95)) && (difference <= (this.frameDistance*120))){
                    console.log("95-120")
                    if (this.endPt[0]-this.startPt[0] < .04*window.innerWidth){ 
                        while(this.yDist < this.endPt[1]-(this.frameDistance*75)){
                            this.count++; 
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.endPt[0]-this.startPt[0]  > .04*window.innerWidth && this.endPt[0]-this.startPt[0] < .067*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*78)){
                            this.count++; 
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    } 
                    else if(this.endPt[0]-this.startPt[0]  > .067*window.innerWidth && this.endPt[0]-this.startPt[0] < .095*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*82)){
                            this.count++; 
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.endPt[0]-this.startPt[0]  > .095*window.innerWidth && this.endPt[0]-this.startPt[0] < .125*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*85)){
                            this.count++; 
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.endPt[0]-this.startPt[0]  > .125*window.innerWidth && this.endPt[0]-this.startPt[0] < .152*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*90)){
                            this.count++; 
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.endPt[0]-this.startPt[0]  > .152*window.innerWidth && this.endPt[0]-this.startPt[0] < .174*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*95)){
                            this.count++; 
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
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
    
                this.endPt[0] = this.endPt[0] + (window.innerWidth*.0277777777777)//subtract calibration July 3, 2023 This worked!!!!!
    
                this.divisor = Math.abs(this.returnDivisor(this.startPt[1]-this.endPt[1],((this.startPt[1]-this.endPt[1])%this.quadOpp),this.quadOpp)); // divided
                
                this.xDist = this.startPt[0];
                this.yDist = this.startPt[1] + this.calibration*1.2;  

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
                    this.yDist -= 4.5 //Previously -=6
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
                    this.yDist -= 4.5 //Previously -=6
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
                console.log("diagonal then up + ") 
    
                //this.endPt[1] = this.endPt[1] - (window.innerHeight*.0277777777777)//subtract calibration July 3, 2023 This worked!!!!!
    
                this.xDist = this.startPt[0]    
                this.yDist = this.startPt[1] //- this.calibration
                //this.divisor = Math.abs(this.returnDivisor(this.startPt[0]-this.endPt[0],((this.startPt[0]-this.endPt[0])%this.quadAdj), this.quadAdj))
                this.divisor = Math.abs(this.returnDivisor(this.startPt[0]-(this.endPt[0]+(window.innerWidth*.0277777777777)),((this.startPt[0]-(this.endPt[0]+(window.innerWidth*.0277777777777)))%this.quadAdj), this.quadAdj));
    
                //construct path diagonal until 
                while (this.xDist >= this.endPt[0]){   
                    this.xDist -= this.quadAdj;  
                    this.yDist -= this.quadOpp*3.5;
                    this.count++;
                    this.pivot++;
                    $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                }    
    
                //construct vertical path 
                let difference = this.startPt[1]-this.endPt[1]   
                this.endPt[1] = this.endPt[1] + (window.innerHeight*.0277777777777)//subtract calibration July 3, 2023 This worked!!!!!

                if ((difference > (this.frameDistance*0)) && (difference <= (this.frameDistance*20))){
                    console.log("0-20") 
                    while(this.yDist < this.endPt[1]-(this.frameDistance*20)){ 
                        this.count++   
                        this.yDist -= window.innerHeight*.0067415
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>')
                    } 
                }  
    
                else if ((difference > (this.frameDistance*20)) && (difference <= (this.frameDistance*35))){
                    console.log("20-35")
                    //if (this.endPt[0]-this.startPt[0] < 82) { *** CHANGE TO THIS JULY 11
                    if (this.endPt[0]-this.startPt[0] < .0464*window.innerWidth){ 
                        while(this.yDist > this.endPt[1]-(this.frameDistance*30)){
                            this.count++; 
                            this.yDist -= this.calibration;
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                     }   
                } 
    
                else if ((difference > (this.frameDistance*35)) && (difference <= (this.frameDistance*45))){
                    console.log("35-45!")
                    //if x/winWidth < .685*winWidth:  
                    if (this.endPt[0]-this.startPt[0] < .04*window.innerWidth){ 
                        while(this.yDist > this.endPt[1]-(this.frameDistance*40)){
                            console.log("While")
                            this.count++;   
                            this.yDist -= this.calibration*1.3;
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        }  
                    }
                }
    
                else if ((difference > (this.frameDistance*45)) && (difference <= (this.frameDistance*55))){
                    console.log("45-55")
                    if (this.endPt[0]-this.startPt[0] < .04*window.innerWidth){ 
                        while(this.yDist > this.endPt[1]-(this.frameDistance*45)){
                            this.count++; 
                            this.yDist -= this.calibration*1.3;
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.endPt[0]-this.startPt[0]  > .04*window.innerWidth && this.endPt[0]-this.startPt[0] < .067*window.innerWidth){
                        while(this.yDist > this.endPt[1]-(this.frameDistance*47)){
                            this.count++; 
                            this.yDist -= this.calibration*1.3;
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                } 

                else if ((difference > (this.frameDistance*55)) && (difference <= (this.frameDistance*75))){
                    console.log("55-75")
                    if (this.endPt[0]-this.startPt[0] < .04*window.innerWidth){ 
                        while(this.yDist > this.endPt[1]-(this.frameDistance*50)){
                            this.count++; 
                            this.yDist -= this.calibration*1.3;
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.endPt[0]-this.startPt[0]  > .04*window.innerWidth && this.endPt[0]-this.startPt[0] < .067*window.innerWidth){
                        while(this.yDist > this.endPt[1]-(this.frameDistance*53)){
                            this.count++; 
                            this.yDist -= this.calibration*1.3;
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.endPt[0]-this.startPt[0]  > .067*window.innerWidth && this.endPt[0]-this.startPt[0] < .095*window.innerWidth){
                        while(this.yDist > this.endPt[1]-(this.frameDistance*55)){
                            this.count++; 
                            this.yDist -= this.calibration*1.3;
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    } 
                } 
    
                else if ((difference > (this.frameDistance*75)) && (difference <= (this.frameDistance*95))){
                    console.log("75-95")
                    if (this.endPt[0]-this.startPt[0] < .04*window.innerWidth){ 
                        while(this.yDist > this.endPt[1]-(this.frameDistance*63)){
                            this.count++; 
                            this.yDist -= this.calibration*1.3;
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }  
                    else if(this.endPt[0]-this.startPt[0]  > .04*window.innerWidth && this.endPt[0]-this.startPt[0] < .067*window.innerWidth){
                        while(this.yDist > this.endPt[1]-(this.frameDistance*66)){
                            this.count++; 
                            this.yDist -= this.calibration*1.3;
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    } 
                    else if(this.endPt[0]-this.startPt[0]  > .067*window.innerWidth && this.endPt[0]-this.startPt[0] < .095*window.innerWidth){
                        while(this.yDist > this.endPt[1]-(this.frameDistance*70)){
                            this.count++; 
                            this.yDist -= this.calibration*1.3;
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.endPt[0]-this.startPt[0]  > .095*window.innerWidth && this.endPt[0]-this.startPt[0] < .125*window.innerWidth){
                        while(this.yDist > this.endPt[1]-(this.frameDistance*76)){
                            this.count++; 
                            this.yDist -= this.calibration*1.3;
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    
                }  
    
                else if ((difference > (this.frameDistance*95)) && (difference <= (this.frameDistance*120))){
                    console.log("95-120")
                    if (this.endPt[0]-this.startPt[0] < .04*window.innerWidth){ 
                        while(this.yDist > this.endPt[1]-(this.frameDistance*80)){
                            this.count++; 
                            this.yDist -= this.calibration*1.3;
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.endPt[0]-this.startPt[0]  > .04*window.innerWidth && this.endPt[0]-this.startPt[0] < .067*window.innerWidth){
                        while(this.yDist > this.endPt[1]-(this.frameDistance*83)){
                            this.count++; 
                            this.yDist -= this.calibration*1.3;
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    } 
                    else if(this.endPt[0]-this.startPt[0]  > .067*window.innerWidth && this.endPt[0]-this.startPt[0] < .095*window.innerWidth){
                        while(this.yDist > this.endPt[1]-(this.frameDistance*86)){
                            this.count++; 
                            this.yDist -= this.calibration*1.3;
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.endPt[0]-this.startPt[0]  > .095*window.innerWidth && this.endPt[0]-this.startPt[0] < .125*window.innerWidth){
                        while(this.yDist > this.endPt[1]-(this.frameDistance*90)){
                            this.count++; 
                            this.yDist -= this.calibration*1.3;
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.endPt[0]-this.startPt[0]  > .125*window.innerWidth && this.endPt[0]-this.startPt[0] < .152*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*90)){
                            this.count++; 
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.endPt[0]-this.startPt[0]  > .152*window.innerWidth && this.endPt[0]-this.startPt[0] < .174*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*95)){
                            this.count++; 
                            this.yDist -= this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
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
                //this.endPt[1] = this.endPt[1] + (window.innerHeight*.0577777777777)//subtract calibration July 3, 2023 This worked!!!!!
                
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
                    this.yDist -= .005039193729003*window.innerHeight//Previously -=6 
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
                    this.yDist -= .005039193729003*window.innerHeight//Previously -=6 
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
                console.log("diagonal then down - OK")   
                
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

                this.endPt[1] = this.endPt[1] + (window.innerHeight*.0277777777777)//subtract calibration July 3, 2023 This worked!!!!!
    

                if ((difference > (this.frameDistance*0)) && (difference <= (this.frameDistance*20))){
                    console.log("0-20") 
                    while(this.yDist < this.endPt[1]-(this.frameDistance*20)){ 
                        this.count++   
                        this.yDist += window.innerHeight*.0067415
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>')
                    } 
                } 
    
                else if ((difference > (this.frameDistance*20)) && (difference <= (this.frameDistance*35))){
                    console.log("20-35")
                    //if (this.endPt[0]-this.startPt[0] < 82) { *** CHANGE TO THIS JULY 11
                    if (this.startPt[0]-this.endPt[0] < .0464*window.innerWidth){ 
                        while(this.yDist < this.endPt[1]-(this.frameDistance*30)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                     }   
                } 

                else if ((difference > (this.frameDistance*35)) && (difference <= (this.frameDistance*45))){
                    console.log("35-45")
                    //if x/winWidth < .685*winWidth: 
                    if (this.startPt[0]-this.endPt[0] < .04*window.innerWidth){ 
                        while(this.yDist < this.endPt[1]-(this.frameDistance*34)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }

                    else if(this.endPt[0]/window.innerWidth >= .67){
                        //skip vertical and build stop path
                    } 

                }
    
                else if ((difference > (this.frameDistance*45)) && (difference <= (this.frameDistance*55))){
                    console.log("45-55")
                    if (this.startPt[0]-this.endPt[0] < .04*window.innerWidth){ 
                        while(this.yDist < this.endPt[1]-(this.frameDistance*45)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.startPt[0]-this.endPt[0]  > .04*window.innerWidth && this.startPt[0]-this.endPt[0] < .067*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*47)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                } 

                else if ((difference > (this.frameDistance*55)) && (difference <= (this.frameDistance*75))){
                    console.log("55-75")
                    if (this.startPt[0]-this.endPt[0] < .04*window.innerWidth){ 
                        while(this.yDist < this.endPt[1]-(this.frameDistance*50)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.startPt[0]-this.endPt[0]  > .04*window.innerWidth && this.startPt[0]-this.endPt[0] < .067*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*53)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.startPt[0]-this.endPt[0]  > .067*window.innerWidth && this.startPt[0]-this.endPt[0] < .095*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*55)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                 
                } 
    
                else if ((difference > (this.frameDistance*75)) && (difference <= (this.frameDistance*95))){
                    console.log("75-95")
                    if (this.startPt[0]-this.endPt[0] < .04*window.innerWidth){ 
                        while(this.yDist < this.endPt[1]-(this.frameDistance*63)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }  
                    else if(this.startPt[0]-this.endPt[0]  > .04*window.innerWidth && this.startPt[0]-this.endPt[0] < .067*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*66)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    } 
                    else if(this.startPt[0]-this.endPt[0]  > .067*window.innerWidth && this.startPt[0]-this.endPt[0] < .095*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*70)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.startPt[0]-this.endPt[0]  > .095*window.innerWidth && this.startPt[0]-this.endPt[0] < .125*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*76)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    
                }

                
    
                else if ((difference > (this.frameDistance*95)) && (difference <= (this.frameDistance*120))){
                    console.log("95-120")
                    if (this.startPt[0]-this.endPt[0] < .04*window.innerWidth){ 
                        while(this.yDist < this.endPt[1]-(this.frameDistance*75)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.startPt[0]-this.endPt[0]  > .04*window.innerWidth && this.startPt[0]-this.endPt[0] < .067*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*78)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    } 
                    else if(this.startPt[0]-this.endPt[0]  > .067*window.innerWidth && this.startPt[0]-this.endPt[0] < .095*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*82)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.startPt[0]-this.endPt[0]  > .095*window.innerWidth && this.startPt[0]-this.endPt[0] < .125*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*85)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.startPt[0]-this.endPt[0]  > .125*window.innerWidth && this.startPt[0]-this.endPt[0] < .152*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*90)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.startPt[0]-this.endPt[0]  > .152*window.innerWidth && this.endPt[0]-this.startPt[0] < .174*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*95)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
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
                console.log("Pivot 4");  
    
                this.endPt[0] = this.endPt[0] - (window.innerWidth*.0277777777777)//subtract calibration July 3, 2023 This worked!!!!!
    
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
                    this.count++;
                    this.xDist += this.frameDistance*2; // Multiply char.xDist x2 if horizontal
                    this.yDist -= .005039193729003*window.innerHeight//Previously -=6 
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
                    this.yDist -= .005039193729003*window.innerHeight//Previously -=6 
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
         
            else if ((this.angle < 38.5) && (this.angle > 0)){ 
                console.log("diagonal then down --")   
                
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
                this.endPt[1] = this.endPt[1] + (window.innerHeight*.0277777777777)//subtract calibration July 3, 2023 This worked!!!!!

                if ((difference > (this.frameDistance*0)) && (difference <= (this.frameDistance*20))){
                    console.log("0-20") 
                    while(this.yDist < this.endPt[1]-(this.frameDistance*20)){ 
                        this.count++   
                        this.yDist += window.innerHeight*.0067415
                        $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>')
                    } 
                }
    
                else if ((difference > (this.frameDistance*20)) && (difference <= (this.frameDistance*35))){
                    console.log("20-35")
                    //if (this.endPt[0]-this.startPt[0] < 82) { *** CHANGE TO THIS JULY 11
                    if (this.endPt[0]-this.startPt[0] < .0464*window.innerWidth){ 
                        while(this.yDist < this.endPt[1]-(this.frameDistance*30)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                     }   
                } 
    
                else if ((difference > (this.frameDistance*35)) && (difference <= (this.frameDistance*45))){
                    console.log("35-45")
                    //if x/winWidth < .685*winWidth: 
                    if (this.endPt[0]-this.startPt[0] < .04*window.innerWidth){ 
                        while(this.yDist < this.endPt[1]-(this.frameDistance*34)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }

                    else if(this.endPt[0]/window.innerWidth >= .67){
                        //skip vertical and build stop path
                    } 

                }
    
                else if ((difference > (this.frameDistance*45)) && (difference <= (this.frameDistance*55))){
                    console.log("45-55")
                    if (this.endPt[0]-this.startPt[0] < .04*window.innerWidth){ 
                        while(this.yDist < this.endPt[1]-(this.frameDistance*45)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.endPt[0]-this.startPt[0]  > .04*window.innerWidth && this.endPt[0]-this.startPt[0] < .067*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*47)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                } 

                else if ((difference > (this.frameDistance*55)) && (difference <= (this.frameDistance*75))){
                    console.log("55-75")
                    if (this.endPt[0]-this.startPt[0] < .04*window.innerWidth){ 
                        while(this.yDist < this.endPt[1]-(this.frameDistance*50)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.endPt[0]-this.startPt[0]  > .04*window.innerWidth && this.endPt[0]-this.startPt[0] < .067*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*53)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.endPt[0]-this.startPt[0]  > .067*window.innerWidth && this.endPt[0]-this.startPt[0] < .095*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*55)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                 
                } 
    
                else if ((difference > (this.frameDistance*75)) && (difference <= (this.frameDistance*95))){
                    console.log("75-95")
                    if (this.endPt[0]-this.startPt[0] < .04*window.innerWidth){ 
                        while(this.yDist < this.endPt[1]-(this.frameDistance*63)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }  
                    else if(this.endPt[0]-this.startPt[0]  > .04*window.innerWidth && this.endPt[0]-this.startPt[0] < .067*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*66)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    } 
                    else if(this.endPt[0]-this.startPt[0]  > .067*window.innerWidth && this.endPt[0]-this.startPt[0] < .095*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*70)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.endPt[0]-this.startPt[0]  > .095*window.innerWidth && this.endPt[0]-this.startPt[0] < .125*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*76)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    
                }  
    
                else if ((difference > (this.frameDistance*95)) && (difference <= (this.frameDistance*120))){
                    console.log("95-120")
                    if (this.endPt[0]-this.startPt[0] < .04*window.innerWidth){ 
                        while(this.yDist < this.endPt[1]-(this.frameDistance*75)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.endPt[0]-this.startPt[0]  > .04*window.innerWidth && this.endPt[0]-this.startPt[0] < .067*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*78)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    } 
                    else if(this.endPt[0]-this.startPt[0]  > .067*window.innerWidth && this.endPt[0]-this.startPt[0] < .095*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*82)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.endPt[0]-this.startPt[0]  > .095*window.innerWidth && this.endPt[0]-this.startPt[0] < .125*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*85)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.endPt[0]-this.startPt[0]  > .125*window.innerWidth && this.endPt[0]-this.startPt[0] < .152*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*90)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
                    }
                    else if(this.endPt[0]-this.startPt[0]  > .152*window.innerWidth && this.endPt[0]-this.startPt[0] < .174*window.innerWidth){
                        while(this.yDist < this.endPt[1]-(this.frameDistance*95)){
                            this.count++; 
                            this.yDist += this.quadOpp;
                            $('#bgMain').append('<div id="' + this.count + '" class="' + this.classLabel + '" style="left:' + this.xDist + 'px; top:' + this.yDist + 'px;"></div>');
                        } 
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
    //call preDisplay -> displayChar -> stopDisplay promise sequence
    animateCharacterWalk(pathCount){   
        //add scaling
        this.inMotion = true   
        for(let i=1; i<=this.count; i++){ 
            this.preDisplay(i, this.currQuad, this.angle, this.pivot, (this.count - 6)) 
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
 
    //Rotate
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
            $('.tempPoint').css("top", this.stopPt[1])

            thisEl[0].classList.remove('pathPoint') 
            //rotate gifs are attached to tempPoint
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
                
                thisEl[0].firstChild.src = './cabbit-rotate-270-quad2-1.gif'
    
                //$('.pathPoint').eq(0).html('<img id="tempPt" src=' + gifSrc + 1 + '.gif' + ' style="position : relative; height : 400px; width : 300px; left : -150px; top : -200px;">');
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-270-quad2-1.gif'
                },76); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-270-quad2-2.gif'
      
                },76*2); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-270-quad2-3.gif'
           
                },76*3); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-270-quad2-4.gif'
                
                },76*4); 
    
                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-270-quad2-5.gif'
             
                },76*5); 

                setTimeout(()=>{ 
                    thisEl[0].firstChild.src = './cabbit-rotate-270-quad2-6.gif'
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

    //initiate state object that contains data for each frame 
    //Pause before frame is displayed then return a promise that resolves with the state object 
    preDisplay(index, quad, angle, pivot, pathEnd){
         
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
        
        else if ((quad == 4 && angle > 38.5) && (index > pivot)){  
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
                console.log("index: " + state.index)//July 18, 2023
            }, index*66.667)//  1/15 of a second = 66.667
        })
   
        return p
    
    }

    //Input state object returned from preDisplay promise
    //Append walking animation image to each path point per state obj params
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
            
            let walk0 = [this.gif.w0x1, this.gif.w0x2, this.gif.w0x3, this.gif.w0x4, this.gif.w0x5, this.gif.w0x6, this.gif.w0x7, this.gif.w0x8, this.gif.w0x9, this.gif.w0x10, this.gif.w0x11, this.gif.w0x12]
            let walk45 = [this.gif.w45x1, this.gif.w45x2, this.gif.w45x3, this.gif.w45x4, this.gif.w45x5,  this.gif.w45x6, this.gif.w45x7, this.gif.w45x8, this.gif.w45x9, this.gif.w45x10, this.gif.w45x11, this.gif.w45x12] 
            let walk90 = []
            let walk135 = [this.gif.w135x1, this.gif.w135x2, this.gif.w135x3, this.gif.w135x4, this.gif.w135x5,  this.gif.w135x6, this.gif.w135x7, this.gif.w135x8, this.gif.w135x9, this.gif.w135x10, this.gif.w135x11, this.gif.w135x12] 
            let walk180 = [this.gif.w180x1, this.gif.w180x2, this.gif.w180x3, this.gif.w180x4, this.gif.w180x5, this.gif.w180x6, this.gif.w180x7, this.gif.w180x8, this.gif.w180x9, this.gif.w180x10, this.gif.w180x11, this.gif.w180x12]
            let walk225 = [this.gif.w225x1, this.gif.w225x2, this.gif.w225x3, this.gif.w225x4, this.gif.w225x5,  this.gif.w225x6, this.gif.w225x7, this.gif.w225x8, this.gif.w225x9, this.gif.w225x10, this.gif.w225x11, this.gif.w225x12] 
            let walk270 = [this.gif.w270x1, this.gif.w270x2, this.gif.w270x3, this.gif.w270x4, this.gif.w270x5,  this.gif.w270x6, this.gif.w270x7, this.gif.w270x8, this.gif.w270x9, this.gif.w270x10, this.gif.w270x11, this.gif.w270x12] 
            let walk292 = [this.gif.w292x1,  this.gif.w292x2, this.gif.w292x3,  this.gif.w292x4,  this.gif.w292x5,   this.gif.w292x6,  this.gif.w292x7,  this.gif.w292x8,  this.gif.w292x9,  this.gif.w292x10,  this.gif.w292x11,  this.gif.w292x12] 
            
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

                let temp90x1 = new Image(this.width, this.height)  
                temp90x1.classList.add('cabbit')  
                temp90x1.src = './cabbit-walk-90-1.gif'  
                walk90.push(temp90x1)

                let temp90x2 = new Image(this.width, this.height)   
                temp90x2.classList.add('cabbit')  
                temp90x2.src =  './cabbit-walk-90-2.gif'   
                walk90.push(temp90x2)

                let temp90x3 = new Image(this.width, this.height)   
                temp90x3.classList.add('cabbit')  
                temp90x3.src =  './cabbit-walk-90-3.gif'   
                walk90.push(temp90x3) 

                let temp90x4 = new Image(this.width, this.height)   
                temp90x4.classList.add('cabbit')  
                temp90x4.src = './cabbit-walk-90-4.gif'    
                walk90.push(temp90x4)  

                let temp90x5 = new Image(this.width, this.height)   
                temp90x5.classList.add('cabbit')  
                temp90x5.src =  './cabbit-walk-90-5.gif'    
                walk90.push(temp90x5)

                let temp90x6 = new Image(this.width, this.height)   
                temp90x6.classList.add('cabbit')  
                temp90x6.src =  './cabbit-walk-90-6.gif'  
                walk90.push(temp90x6)

                let temp90x7 = new Image(this.width, this.height)   
                temp90x7.classList.add('cabbit')  
                temp90x7.src =  './cabbit-walk-90-7.gif'  
                walk90.push(temp90x7)   

                let temp90x8 = new Image(this.width, this.height)   
                temp90x8.classList.add('cabbit')  
                temp90x8.src =  './cabbit-walk-90-8.gif'   
                walk90.push(temp90x8) 

                let temp90x9 = new Image(this.width, this.height)   
                temp90x9.classList.add('cabbit')  
                temp90x9.src =  './cabbit-walk-90-9.gif'    
                walk90.push(temp90x9)

                let temp90x10 = new Image(this.width, this.height)   
                temp90x10.classList.add('cabbit')  
                temp90x10.src =  './cabbit-walk-90-10.gif'    
                walk90.push(temp90x10)

                let temp90x11 = new Image(this.width, this.height)   
                temp90x11.classList.add('cabbit')  
                temp90x11.src =  './cabbit-walk-90-11.gif'  
                walk90.push(temp90x11)   

                let temp90x12 = new Image(this.width, this.height)   
                temp90x12.classList.add('cabbit')  
                temp90x12.src =  './cabbit-walk-90-12.gif'    
                walk90.push(temp90x12) 
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

                this.currIndex = state.index 
                this.frameIndex = state.frameIndex  
                
                if (this.pathInterrupted == true){ 

                    if(state.index == 1){
                        $('.tempPoint').remove() 
                    }  

                    $(pathPt).eq(state.index).append(srcGif) //select the path point of the current state index
                    
                    setTimeout(() => { 
                            $(pathPt).eq(state.index).empty()   //after 1/15 of a second, clear the current frame
                    }, 70 )   
                        
                }

                else {     
                    //June 20, 2023 : console.log the  X location of walking character 

                    //change size of img depending on location

                    this.stopPt = [$(pathPt).eq(state.index)[0].offsetLeft , $(pathPt).eq(state.index)[0].offsetTop] 

                    let yMin = 500
                    let yMax = 700
                    let ySizeMin = 80 //percent
                    let ySizeMax = 100 //percent
                    let yDifference = ySizeMax-ySizeMin
                    

                    let xDist  
                    let zDist  
                    let xPercent  

                    let temp = this.stopPt[1]

                    if (this.stopPt[1] > yMin && this.stopPt[1] < yMax) {
                        xDist = temp - yMin
                        zDist =  yMax - yMin
                        xPercent = xDist/zDist 

                        console.log("xPErcent : " + xPercent)
                        console.log("yDifference : " + yDifference)
                        console.log("this width : " + this.width)
                        console.log("Multiplier : " + (ySizeMin+(xPercent*yDifference)))
                        /*
                        console.log("xDist : ")
                        console.log(xDist)
                        console.log("zDist : ")
                        console.log(zDist)
                        console.log("xPercent :")
                        console.log(xPercent)

                        console.log("Percent Increase : ")
                        console.log(ySizePercent + (xPercent*zDist))*/

                        

                        //srcGif.width =  this.width * (ySizePercent/100)
                                                    //90/100

                        let tempW = this.width * (ySizeMin+(xPercent*yDifference))
                        let tempH = this.height * (ySizeMin+(xPercent*yDifference))

                        srcGif.width = tempW/100
                        srcGif.height = tempH/100

                      
                       
                    }

                    else {
                        srcGif.width =  this.width   
                        srcGif.height =  this.height 
 
                    }

                    /*
                    let yDiff = (yMax - yMin) //--> 20
                    let maxSize = 100
                    let minSize = 60
                    let diffPercent = 100-60 //-> 40%
                    //frameDist = 5 
                    let diffPoints = yDiff/this.frameDistance  //-> 4
                    let diffMulti = diffPercent/diffPoints //= 10 
                    let currDifference = Math.abs(this.stopPt[1] - yMin)*/

                        //60 + i*diffMulti = 0; i = 0
                        //60 + i*diffMulti = 70; i = 1
                        //60 + i*diffMulti = 80; i = 2
                        //60 + i*diffMulti = 90; i = 3
                        //60 + i*diffMulti = 100; i = 4 

                    //from yMin to yMax, divide into segments
                    //let multiplier = currDifference/diffPoints // = 3.6 -> roundup -> 4
                    
                    

                    $('.tempPoint').remove()//this removes the temp point being used as the rotation axis 

                    console.log(srcGif)
        

                    $(pathPt).eq(state.index).append(srcGif) //append gif to path point of current frame index number
                     
                    document.getElementById('cabbitPositionX').innerText = $(pathPt).eq(state.index)[0].offsetLeft //prints to x pos on screen
                    document.getElementById('cabbitPositionY').innerText = $(pathPt).eq(state.index)[0].offsetTop //prints y pos to screen
                    
                    //Ju;y 22, 2023 - set top points
                    

                    setTimeout(() => { 
                            $(pathPt).eq(state.index).empty()   //then reset the frame after 1/15 of a second
                    }, 70 )   
                }
                
                if (this.pathInterrupted == false){
                    $('.tempPoint').remove()//this removes the temp point being used as the rotation axis
                } 
                
           }  
    
           if (state.index == state.pathEndFrame){
                state.stopFrameIndex = state.frameIndex 
                //this.currIndex = 0 //changed July 22, 2023
                console.log("pathend : " + state.pathEndFrame)//July 18, 2023
           }
    
           if (state.pathEnd == true){
                $('body').css('pointer-events','none')    
                resolve(state) //when resolved, it means this cycle for this particular animation frame from display to clear was completed
                                 
           }
            
        }) 
    
        return p 
        
    }

    //Input state object returned from displayChar promise
    //Append stop walking animation sequence image to each path point per state obj params
    stopDisplay(state, pathCount){ 

        let pathPt
        let gifSrc 

        if(pathCount == 0) {
            pathPt = '.' + 'pathPoint'
        }

        if(pathCount >= 1) {
            pathPt = '.' + 'pathPoint' + pathCount
        }   
/*
        //let walk0 = [this.gif.w0x1, this.gif.w0x2, this.gif.w0x3,  this.gif.w0x4, this.gif.w0x4a, this.gif.w0x5, this.gif.w0x5a, this.gif.w0x6, this.gif.w0x7, this.gif.w0x8, this.gif.w0x8a,  this.gif.w0x9, this.gif.w0x9a, this.gif.w0x10, this.gif.w0x11, this.gif.w0x12];
        let walk45 = [this.gif.w45x1, this.gif.w45x2, this.gif.w45x3,  this.gif.w45x4, this.gif.w45x4a, this.gif.w45x5, this.gif.w45x5a,  this.gif.w45x6, this.gif.w45x7, this.gif.w45x8, this.gif.w45x8a, this.gif.w45x9, this.gif.w45x9a, this.gif.w45x10, this.gif.w45x11, this.gif.w45x12];
        let walk90 = [this.gif.w90x1, this.gif.w90x2, this.gif.w90x3,   this.gif.w90x4, this.gif.w90x4a, this.gif.w90x5, this.gif.w90x5a, this.gif.w90x6, this.gif.w90x7, this.gif.w90x8, this.gif.w90x8a, this.gif.w90x9, this.gif.w90x9a, this.gif.w90x10, this.gif.w90x11, this.gif.w90x12];
        let walk135 = [this.gif.w135x1, this.gif.w135x2, this.gif.w135x3,   this.gif.w135x4, this.gif.w135x4a, this.gif.w135x5, this.gif.w135x5a, this.gif.w135x6, this.gif.w135x7, this.gif.w135x8, this.gif.w135x8a, this.gif.w135x9, this.gif.w135x9a, this.gif.w135x10, this.gif.w135x11, this.gif.w135x12];
        //let walk180 = [this.gif.w180x1, this.gif.w180x2, this.gif.w180x3,  this.gif.w180x4, this.gif.w180x4a, this.gif.w180x5, this.gif.w180x5a,  this.gif.w180x6, this.gif.w180x7, this.gif.w180x8, this.gif.w180x8a,  this.gif.w180x9, this.gif.w180x9a, this.gif.w180x10, this.gif.w180x11, this.gif.w180x12];
        let walk225 = [this.gif.w225x1, this.gif.w225x2, this.gif.w225x3,   this.gif.w225x4, this.gif.w225x4a, this.gif.w225x5, this.gif.w225x5a,  this.gif.w225x6, this.gif.w225x7, this.gif.w225x8, this.gif.w225x8a, this.gif.w225x9, this.gif.w225x9a, this.gif.w225x10, this.gif.w225x11, this.gif.w225x12];
        let walk270 = [this.gif.w270x1, this.gif.w270x2, this.gif.w270x3,   this.gif.w270x4, this.gif.w270x4a,  this.gif.w270x5, this.gif.w270x5a,   this.gif.w270x6, this.gif.w270x7, this.gif.w270x8, this.gif.w270x8a, this.gif.w270x9, this.gif.w270x9a, this.gif.w270x10, this.gif.w270x11, this.gif.w270x12];
        let walk292 = [ this.gif.w292x1,  this.gif.w292x2, this.gif.w292x3,  this.gif.w292x4, this.gif.w292x4a,  this.gif.w292x5, this.gif.w292x5a,  this.gif.w292x6,  this.gif.w292x7,  this.gif.w292x8, this.gif.w292x8a, this.gif.w292x9, this.gif.w292x9a, this.gif.w292x10,  this.gif.w292x11,  this.gif.w292x12];
*/
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

        let stop90 = [] 
        //July 8, 2023 : Add cabbit-walk-90 to stop90 array
        if(state.angle == 90) {

            let charGif1 = new Image(this.width, this.height)  
            charGif1.classList.add('cabbit')  
            charGif1.src = './cabbit-walk-90-1.gif'   
            stop90.push(charGif1)

            let charGif2 = new Image(this.width, this.height)  
            charGif2.classList.add('cabbit')  
            charGif2.src = './cabbit-walk-90-2.gif'   
            stop90.push(charGif2)

            let charGif3 = new Image(this.width, this.height)  
            charGif3.classList.add('cabbit')  
            charGif3.src = './cabbit-walk-90-3.gif'   
            stop90.push(charGif3)

            let charGif4 = new Image(this.width, this.height)  
            charGif4.classList.add('cabbit')  
            charGif4.src = './cabbit-walk-90-4.gif'   
            stop90.push(charGif4)

            let charGif4a = new Image(this.width, this.height)  
            charGif4a.classList.add('cabbit')  
            charGif4a.src = './cabbit-walk-90-4a.gif'   
            stop90.push(charGif4a)

            let charGif5 = new Image(this.width, this.height)  
            charGif5.classList.add('cabbit')  
            charGif5.src = './cabbit-walk-90-5.gif'   
            stop90.push(charGif5)

            let charGif5a = new Image(this.width, this.height)  
            charGif5a.classList.add('cabbit')  
            charGif5a.src = './cabbit-walk-90-5a.gif'   
            stop90.push(charGif5a)

            let charGif6 = new Image(this.width, this.height)  
            charGif6.classList.add('cabbit')  
            charGif6.src = './cabbit-walk-90-6.gif'   
            stop90.push(charGif6)

            let charGif7= new Image(this.width, this.height)  
            charGif7.classList.add('cabbit')  
            charGif7.src = './cabbit-walk-90-7.gif'   
            stop90.push(charGif7)

            let charGif8 = new Image(this.width, this.height)  
            charGif8.classList.add('cabbit')  
            charGif8.src = './cabbit-walk-90-8.gif'   
            stop90.push(charGif8)

            let charGif8a = new Image(this.width, this.height)  
            charGif8a.classList.add('cabbit')  
            charGif8a.src = './cabbit-walk-90-8a.gif'   
            stop90.push(charGif8a)

            let charGif9 = new Image(this.width, this.height)  
            charGif9.classList.add('cabbit')  
            charGif9.src = './cabbit-walk-90-9.gif'   
            stop90.push(charGif9)

            let charGif9a = new Image(this.width, this.height)  
            charGif9a.classList.add('cabbit')  
            charGif9a.src = './cabbit-walk-90-9a.gif'   
            stop90.push(charGif9a)

            let charGif10 = new Image(this.width, this.height)  
            charGif10.classList.add('cabbit')  
            charGif10.src = './cabbit-walk-90-10.gif'   
            stop90.push(charGif10)

            let charGif11 = new Image(this.width, this.height)  
            charGif11.classList.add('cabbit')  
            charGif11.src = './cabbit-walk-90-11.gif'   
            stop90.push(charGif11)

            let charGif12 = new Image(this.width, this.height)  
            charGif12.classList.add('cabbit')  
            charGif12.src = './cabbit-walk-90-12.gif'   
            stop90.push(charGif12)

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

        let stop270 = []

        if (state.angle == 270){
            let charGif = new Image(this.width, this.height)  
            charGif.classList.add('cabbit')  
            charGif.src = './cabbit-walk-270-1.gif'   
            stop270.push(charGif)

            let charGif1 = new Image(this.width, this.height)   
            charGif1.classList.add('cabbit')  
            charGif1.src = './cabbit-walk-270-2.gif'  
            stop270.push(charGif1)

            let charGif2 = new Image(this.width, this.height)   
            charGif2.classList.add('cabbit')  
            charGif2.src = './cabbit-walk-270-3.gif'  
            stop270.push(charGif2) 

            let charGif4 = new Image(this.width, this.height)   
            charGif4.classList.add('cabbit')  
            charGif4.src = './cabbit-walk-270-4.gif'    
            stop270.push(charGif4)

            let charGif4a = new Image(this.width, this.height)   
            charGif4a.classList.add('cabbit')  
            charGif4a.src = './cabbit-walk-270-4a.gif'    
            stop270.push(charGif4a)

            let charGif5 = new Image(this.width, this.height)   
            charGif5.classList.add('cabbit')  
            charGif5.src = './cabbit-walk-270-5.gif'   
            stop270.push(charGif5)

            let charGif5a = new Image(this.width, this.height)   
            charGif5a.classList.add('cabbit')  
            charGif5a.src = './cabbit-walk-270-5a.gif'    
            stop270.push(charGif5a)

            let charGif6 = new Image(this.width, this.height)   
            charGif6.classList.add('cabbit')  
            charGif6.src = './cabbit-walk-270-6.gif'  
            stop270.push(charGif6)

            let charGif7 = new Image(this.width, this.height)   
            charGif7.classList.add('cabbit')  
            charGif7.src = './cabbit-walk-270-7.gif'   
            stop270.push(charGif7)

            let charGif8 = new Image(this.width, this.height)   
            charGif8.classList.add('cabbit')  
            charGif8.src = './cabbit-walk-270-8.gif'   
            stop270.push(charGif8)

            let charGif8a = new Image(this.width, this.height)   
            charGif8a.classList.add('cabbit')  
            charGif8a.src = './cabbit-walk-270-8a.gif'   
            stop270.push(charGif8a)

            let charGif9 = new Image(this.width, this.height)   
            charGif9.classList.add('cabbit')  
            charGif9.src = './cabbit-walk-270-9.gif'   
            stop270.push(charGif9)

            let charGif9a = new Image(this.width, this.height)   
            charGif9a.classList.add('cabbit')  
            charGif9a.src = './cabbit-walk-270-9a.gif'   
            stop270.push(charGif9a) 

            let charGif10 = new Image(this.width, this.height)   
            charGif10.classList.add('cabbit')  
            charGif10.src = './cabbit-walk-270-10.gif'   
            stop270.push(charGif10)

            let charGif11 = new Image(this.width, this.height)   
            charGif11.classList.add('cabbit')  
            charGif11.src = './cabbit-walk-270-11.gif'   
            stop270.push(charGif11)

            let charGif12 = new Image(this.width, this.height)   
            charGif12.classList.add('cabbit')  
            charGif12.src = './cabbit-walk-270-12.gif'   
            stop270.push(charGif12)  

        }
        
        
        if (state.angle == 0){
            gifSrc = stop0
        }
        else if (state.angle == 90){
            gifSrc = stop90
        }  
        else if (state.angle == 180){
            gifSrc = stop180
        } 
        else if (state.angle == 270){
            gifSrc = stop270
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
var win = {};
win.width = $(window).width();
win.height = $(window).height();
win.url = window.location.href; 

var fps = 15; //FRAMES PER SECOND
var count = 0; 

//style="position : relative; height : 400px; width : 300px; left : -150px; top : -200px;

class character {
    constructor(startPt, endPt, path, frameDistance ) {
        this.xDist;
        this.yDist;
        this.startPt = startPt; 
        this.endPt = endPt;
        this.opp;
        this.adj;
        this.angle;
        this.path = path;
        this.frameDistance = frameDistance;
        this.currQuad;
        this.endAngle; 
    }
} 

 
character.prototype.moveCharacter = (char) => {

    //var xDist;
    //var yDist;
  
    var calibration = char.frameDistance*1.2; 

    var quadOpp;
    var quadAdj;
    var pivot = 0;
    var quadAngle;
    var divisor;
    var endPath = false; 

    char.opp = Math.pow((char.endPt[0] - char.startPt[0]), 1);
    char.adj = Math.pow((char.endPt[1] - char.startPt[1]), 1)*(-1)
    char.angle = Math.abs(Math.atan(char.opp/char.adj) * 180/Math.PI);
    //char.hypo = Math.sqrt((char.opp*char.opp)+(char.adj*char.adj));  
    
    //QUAD 1 :
    if (char.endPt[1] <= char.startPt[1] && char.endPt[0] >= char.startPt[0]){

        console.log("quad 1 PIVOT");
        char.currQuad = 1;//Define current quad number
        quadAngle = 38.5;
        quadOpp = Math.round(char.frameDistance*Math.sin(quadAngle/(180/Math.PI)));//10px opp distance - 1 frame
        quadAdj = Math.round(char.frameDistance*Math.cos(quadAngle/(180/Math.PI)));//10px

        //if end point is between 0 and 38.5 degrees
        if ((char.angle >= 38.5) && (char.angle < 90)){
            //pivot
            divisor = Math.abs(returnDivisor(char.startPt[1]-char.endPt[1],((char.startPt[1]-char.endPt[1])%quadOpp),quadOpp)); // divided
            char.xDist = char.startPt[0];
            char.yDist = char.startPt[1] - calibration;  

            //construct path diagonal until ....
            while (count < divisor){   
                char.xDist += quadAdj;  
                char.yDist -= quadOpp*4; // if frame distance is 10, then multiply quadOpp by 2
                document.getElementById('')
                $('.containerMain').append('<div id="' + count + '" class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
                count++;
                pivot++;  
            }  
                
            //construct horizontal line
            while (char.xDist < char.endPt[0]){
                count++;
                char.xDist += char.frameDistance*2; // Multiply char.xDist x2 if horizontal
                char.yDist -= char.frameDistance*1.2; //Previously -=6
                $('.containerMain').append('<div id="' + count + '" class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
            } 
            
            var j = 0;
            var k = 2;
            
            //stop path cycle 
            while (j<12){ 
                j++;
                count++;
                char.xDist += char.frameDistance*k; // Multiply char.xDist x2 if horizontal
                k = (k*.8);
                char.yDist -= char.frameDistance*1.2; //Previously -=6
                
                char.startPt[0] = char.xDist;
                char.startPt[1] = char.yDist;
                $('.containerMain').append('<div id="' + count + '" class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
            } 

            //Reset start Points
            $('#startPoint').css('left', char.endPt[0] + 'px');
            $('#startPoint').css('top', char.endPt[1] + 'px');

            if (char.endAngle == undefined){
                char.animateCharacterWalk(char, count, pivot);  
            }

            //if char.endAngle is defined, rotate, then animate : if quad 1, then cabbit-rotate-0-quad1-1 to 4
                 
            else { 
                //short pause
                char.rotateCharacter(char).then((result)=>{  
                    char.animateCharacterWalk(result, count, pivot); 
                });

            }
           
        }

        //If the end point angle is between 38.5 and 90
        else if ((90-char.angle) >= 38.5 && (90-char.angle) < 90) {
        
            console.log("diagonal then up");
            char.xDist = char.startPt[0];
            char.yDist = char.startPt[1] - calibration;
            divisor = Math.abs(returnDivisor(char.startPt[0]-char.endPt[0],((char.startPt[0]-char.endPt[0])%quadAdj), quadAdj));

            //construct path diagonal until 
            while (count < divisor*2){  
                char.xDist += quadAdj;  
                char.yDist -= quadOpp*4; 
                count++;
                pivot++;
                $('.containerMain').append('<div id="' + count + '" class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
            }   

            //construct vertical path
            if (char.startPt[1]-char.endPt[1] <= (char.frameDistance*20)){
                while(char.yDist > char.endPt[1]-(char.frameDistance*20)){
                    char.yDist -= calibration;
                    char.yDist -= char.frameDistance*1.5; 
                    $('.containerMain').append('<div id="' + count + '" class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
                } 
            }

            else if (char.startPt[1]-char.endPt[1] > (char.frameDistance*20) && char.startPt[1]-char.endPt[1] <= (char.frameDistance*40) ){
                while(char.yDist > char.endPt[1]-(char.frameDistance*30)){
                    count++;
                    char.yDist -= calibration;
                    char.yDist -= char.frameDistance*1.5; 
                    $('.containerMain').append('<div id="' + count + '"class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
                    } 
            }

            else if (char.startPt[1]-char.endPt[1] > (char.frameDistance*40) && char.startPt[1]-char.endPt[1] <= (char.frameDistance*60) ){
                while(char.yDist > char.endPt[1]-(char.frameDistance*50)){
                    count++;
                    char.yDist -= calibration;
                    char.yDist -= char.frameDistance*1.5; 
                    $('.containerMain').append('<div id="' + count + '" class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
                } 
            }
            
            else if (char.startPt[1]-char.endPt[1] > (char.frameDistance*60) && char.startPt[1]-char.endPt[1] <= (char.frameDistance*80) ){
                while(char.yDist > char.endPt[1]-(char.frameDistance*70)){
                    count++;
                    char.yDist -= calibration;
                    char.yDist -= char.frameDistance*1.5; 
                    $('.containerMain').append('<div id="' + count + '" class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
                } 
            }

            else if (char.startPt[1]-char.endPt[1] > (char.frameDistance*80) && char.startPt[1]-char.endPt[1] <= (char.frameDistance*100) ){
                while(char.yDist > char.endPt[1]-(char.frameDistance*90)){
                    count++;
                    char.yDist -= calibration;
                    char.yDist -= char.frameDistance*1.5; 
                    $('.containerMain').append('<div id="' + count + '" class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
                } 
            } 
            
            var j = 0;
            var k = 2;
            
            //stop path cycle 
            while (j<12){
                j++;
                count++;
                char.yDist -= char.frameDistance*k; // Multiply char.xDist x2 if horizontal
                k = (k*.8);
                char.yDist -= char.frameDistance*1.2; //Previously -=6
                char.startPt[0] = char.xDist;
                char.startPt[1] = char.yDist;
                $('.containerMain').append('<div id="' + count + '" class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
            } 

            //Reset start Points
            $('#startPoint').css('left', char.endPt[0] + 'px');
            $('#startPoint').css('top', char.endPt[1] + 'px');
             
            char.animateCharacterWalk(char, count, pivot); 
            
        } 
    }

    //QUAD TWO
    else if (char.endPt[1]<=char.startPt[1]&&char.endPt[0]<=char.startPt[0]){
        console.log("quad 2");
            
        quadAngle = 38.5;
        char.currQuad = 2;
        quadOpp = Math.round(char.frameDistance*Math.sin(quadAngle/(180/Math.PI)));//10px opp distance - 1 frame
        quadAdj = Math.round(char.frameDistance*Math.cos(quadAngle/(180/Math.PI)));//10px

        //if end point is between 38.5 and 0
        //char angle reference point is from 90 degrees
        if ((Math.abs(char.angle) > 38.5) && (Math.abs(char.angle) < 90)){
            //pivot
            console.log("PIVOT");
            divisor = Math.abs(returnDivisor(char.startPt[1]-char.endPt[1],((char.startPt[1]-char.endPt[1])%quadOpp),quadOpp)); // divided
             
            char.xDist = char.startPt[0];
            char.yDist = char.startPt[1] - calibration;
                
            //construct path diagonal until 
             //construct path diagonal until 
             while (count < divisor){  
                char.xDist -= quadAdj;  
                char.yDist -= quadOpp*4; // if frame distance is 10, then multiply quadOpp by 2
                $('.containerMain').append('<div id="' + count + '" class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
                count++;
                pivot++;  
            }  
                
            //construct horizontal line
            while (char.xDist > char.endPt[0]){
                count++;
                char.xDist -= char.frameDistance*2; // Multiply char.xDist x2 if horizontal
                char.yDist -= char.frameDistance*1.2; //Previously -=6
                $('.containerMain').append('<div id="' + count + '" class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
            } 
            
            var j = 0;
            var k = 2;
            
            //stop path cycle 
            while (j<12){
                j++;
                count++;
                char.xDist -= char.frameDistance*k; // Multiply char.xDist x2 if horizontal
                k = (k*.8);
                char.yDist -= char.frameDistance*1.2; //Previously -=6
                char.startPt[0] = char.xDist;
                char.startPt[1] = char.yDist;
                $('.containerMain').append('<div id="' + count + '" class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
            } 

            //Reset start Points
            $('#startPoint').css('left', char.endPt[0] + 'px');
            $('#startPoint').css('top', char.endPt[1] + 'px');
             
            if (char.endAngle == undefined){
                char.animateCharacterWalk(char, count, pivot);  
            }

            //if char.endAngle is defined, rotate, then animate : if quad 1, then cabbit-rotate-0-quad1-1 to 4
                 
            else { 
                //short pause
                char.rotateCharacter(char).then((result)=>{  
                    char.animateCharacterWalk(result, count, pivot); 
                }); 
            }

        }
        //If the end point angle is between  90 and 141.5
        else if ((90-(Math.abs(char.angle))) > 38.5 && (90-(Math.abs(char.angle))) < 90) {
            //diagonal then up
            console.log("diagonal then up");
            char.xDist = char.startPt[0];
            char.yDist = char.startPt[1] - calibration;
            divisor = Math.abs(returnDivisor(char.startPt[0]-char.endPt[0],((char.startPt[0]-char.endPt[0])%quadAdj), quadAdj));

            //construct path diagonal until 
            while (char.xDist >= char.endPt[0]){   
                char.xDist -= quadAdj;  
                char.yDist -= quadOpp*4;
                count++;
                pivot++;
                $('.containerMain').append('<div class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>'); 
            }   

            //construct vertical path
            if (char.startPt[1]-char.endPt[1] <= (char.frameDistance*20)){
                while(char.yDist > char.endPt[1]-(char.frameDistance*20)){
                    char.yDist -= calibration;
                    char.yDist -= char.frameDistance*1.5; 
                    $('.containerMain').append('<div id="' + count + '" class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
                } 
            }

            if (char.startPt[1]-char.endPt[1] <= (char.frameDistance*20)){ 
                while(char.yDist > char.endPt[1]-(char.frameDistance*10)){
                    count++;
                    char.yDist -= calibration;
                    char.yDist -= char.frameDistance*1.5; 
                    $('.containerMain').append('<div class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
                } 
            }

            else if (char.startPt[1]-char.endPt[1] > (char.frameDistance*10) && char.startPt[1]-char.endPt[1] <= (char.frameDistance*40) ){ 
                while(char.yDist > char.endPt[1]-(char.frameDistance*30)){
                    count++;
                    char.yDist -= calibration;
                    char.yDist -= char.frameDistance*1.5; 
                    $('.containerMain').append('<div class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
                    } 
            }

            else if (char.startPt[1]-char.endPt[1] > (char.frameDistance*40) && char.startPt[1]-char.endPt[1] <= (char.frameDistance*60) ){ 
                while(char.yDist > char.endPt[1]-(char.frameDistance*50)){
                    count++;
                    char.yDist -= calibration;
                    char.yDist -= char.frameDistance*1.5; 
                    $('.containerMain').append('<div class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
                } 
            }
            
            else if (char.startPt[1]-char.endPt[1] > (char.frameDistance*60) && char.startPt[1]-char.endPt[1] <= (char.frameDistance*80) ){ 
                while(char.yDist > char.endPt[1]-(char.frameDistance*70)){
                    count++;
                    char.yDist -= calibration;
                    char.yDist -= char.frameDistance*1.5; 
                    $('.containerMain').append('<div class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
                } 
            }

            else if (char.startPt[1]-char.endPt[1] > (char.frameDistance*80) && char.startPt[1]-char.endPt[1] <= (char.frameDistance*100) ){ 
                while(char.yDist > char.endPt[1]-(char.frameDistance*90)){
                    count++;
                    char.yDist -= calibration;
                    char.yDist -= char.frameDistance*1.5; 
                    $('.containerMain').append('<div class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
                } 
            }

            var j = 0;
            var k = 2;
            
            //stop path cycle 
            while (j<6){
                j++;
                count++;
                char.yDist -= char.frameDistance*k; // Multiply char.xDist x2 if horizontal
                k = (k*.8);
                char.yDist -= char.frameDistance*1.2; //Previously -=6
                char.startPt[0] = char.xDist;
                char.startPt[1] = char.yDist;
                $('.containerMain').append('<div id="' + count + '" class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
            } 

            //Reset start Points
            $('#startPoint').css('left', char.endPt[0] + 'px');
            $('#startPoint').css('top', char.endPt[1] + 'px');
            
            char.animateCharacterWalk(char, count, pivot); 
                
        } 
    }

    //QUAD THREE
    else if (char.endPt[1]>=char.startPt[1]&&char.endPt[0]<=char.startPt[0]){
        console.log("quad 3");  
        quadAngle = 38.5;
        char.currQuad = 3;
        quadOpp = Math.round(char.frameDistance*Math.sin(quadAngle/(180/Math.PI)));//10px opp distance - 1 frame
        quadAdj = Math.round(char.frameDistance*Math.cos(quadAngle/(180/Math.PI)));//10px

        
        if ((char.angle > 38.5) && (char.angle < 90) ){
            //pivot 

            divisor = Math.abs(returnDivisor(char.startPt[1]-char.endPt[1],((char.startPt[1]-char.endPt[1])%quadOpp),quadOpp)); // divided
            char.xDist = char.startPt[0];
            char.yDist = char.startPt[1] - calibration;  
            
            console.log("REmoved");
                
            //construct path diagonal until 
            while (count < divisor){  
               
                char.xDist -= quadAdj;  
                char.yDist += quadOpp/5;
                $('.containerMain').append('<div id="' + count + '" class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
                count++;
                pivot++;
            }   
        
            //construct horizontal line
            while (char.xDist > char.endPt[0]){
                char.xDist -= char.frameDistance*2;
                char.yDist -= calibration;         
                count++;
                $('.containerMain').append('<div id="' + count + '" class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
            }  

            var j = 0;
            var k = 2;
            
            //stop path cycle 
            while (j<12){
                j++;
                count++;
                char.xDist -= char.frameDistance*k; // Multiply char.xDist x2 if horizontal
                k = (k*.8);
                char.yDist -= char.frameDistance*1.2; //Previously -=6 
                char.startPt[0] = char.xDist;
                char.startPt[1] = char.yDist;
                $('.containerMain').append('<div id="' + count + '" class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
            } 

            //Reset start Points
            $('#startPoint').css('left', char.endPt[0] + 'px');
            $('#startPoint').css('top', char.endPt[1] + 'px'); 

            if (char.endAngle == undefined){
                char.animateCharacterWalk(char, count, pivot);  
            }

            //if char.endAngle is defined, rotate, then animate : if quad 1, then cabbit-rotate-0-quad1-1 to 4
                 
            else { 
                //short pause
                char.rotateCharacter(char).then((result)=>{  
                    char.animateCharacterWalk(result, count, pivot ); 
                }); 
            }
            
        }

        else if ((char.angle < 38.5) && (char.angle > 0)){
            console.log("diagonal then down");

            char.xDist = char.startPt[0];
            char.yDist = char.startPt[1] - calibration;  

            //diagonal
            while (char.xDist >= char.endPt[0]){   
                char.xDist -= quadAdj;  
                char.yDist += quadOpp/2; 
                count++;
                pivot++;
                $('.containerMain').append('<div class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>'); 
            } 

            var difference = char.endPt[1]-char.startPt[1];
            console.log("difference : " + difference);

            if (difference > 0 && difference < (char.frameDistance*10)){
                while(char.yDist < char.endPt[1]-(char.frameDistance*10)){
                    count++; 
                    char.yDist += quadOpp; 
                    $('.containerMain').append('<div class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
                } 
            }

            else if ((difference > (char.frameDistance*10)) && (difference <= (char.frameDistance*20))){
                while(char.yDist < char.endPt[1]-(char.frameDistance*15)){
                    count++; 
                    char.yDist += quadOpp; 
                    $('.containerMain').append('<div class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
                } 
            }

            else if ((difference > (char.frameDistance*10)) && (difference <= (char.frameDistance*25))){
                console.log("100-200");
                while(char.yDist < char.endPt[1]-(char.frameDistance*10)){
                    count++; 
                    char.yDist += quadOpp;
                    $('.containerMain').append('<div class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
                } 
            }

            else if ((difference > (char.frameDistance*25)) && (difference <= (char.frameDistance*30))){
                console.log("100-200");
                while(char.yDist < char.endPt[1]-(char.frameDistance*10)){
                    count++; 
                    char.yDist += quadOpp;
                    $('.containerMain').append('<div class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
                } 
            }

            else if ((difference > (char.frameDistance*30)) && (difference <= (char.frameDistance*35))){
                while(char.yDist < char.endPt[1]-(char.frameDistance*25)){
                    count++; 
                    char.yDist += quadOpp;
                    $('.containerMain').append('<div class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
                } 
            }

            else if ((difference > (char.frameDistance*35)) && (difference <= (char.frameDistance*40))){
                while(char.yDist < char.endPt[1]-(char.frameDistance*30)){
                    count++; 
                    char.yDist += quadOpp;
                    $('.containerMain').append('<div class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
                } 
            }

            else if ((difference > (char.frameDistance*40)) && (difference <= (char.frameDistance*45))){
                while(char.yDist < char.endPt[1]-(char.frameDistance*31)){
                    count++; 
                    char.yDist += quadOpp;
                    $('.containerMain').append('<div class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
                } 
            }

            else if ((difference > (char.frameDistance*45)) && (difference <= (char.frameDistance*50))){
                while(char.yDist < char.endPt[1]-(char.frameDistance*40)){
                    count++; 
                    char.yDist += quadOpp;
                    $('.containerMain').append('<div class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
                } 
            }

            var j = 0;
            var k = 2;
            
            //stop path cycle 
            while (j<6){
                j++;
                count++;
                char.yDist += char.frameDistance*k; // Multiply char.xDist x2 if horizontal
                k = (k*.8);
                char.yDist -= char.frameDistance*1.2; //Previously -=6
                char.startPt[0] = char.xDist;
                char.startPt[1] = char.yDist;
                $('.containerMain').append('<div id="' + count + '" class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
            } 

            //Reset start Points
            $('#startPoint').css('left', char.endPt[0] + 'px');
            $('#startPoint').css('top', char.endPt[1] + 'px'); 
             
            char.animateCharacterWalk(char, count, pivot); 

        } 

    }

    //QUAD 4
    else if (char.endPt[1]>char.startPt[1]&&char.endPt[0]>=char.startPt[0]){
        console.log("quad 4");
        console.log("char angle : " + char.angle);
        quadAngle = 38.5;
        char.currQuad = 4;

        quadOpp = Math.round(char.frameDistance*Math.sin(quadAngle/(180/Math.PI)));//10px opp distance - 1 frame
        quadAdj = Math.round(char.frameDistance*Math.cos(quadAngle/(180/Math.PI)));//10px

        //if end point is between 180 and 141.5 degrees
        if ((char.angle > 38.5) && (char.angle < 90)){
            //pivot
            console.log("Pivot"); 

            divisor = Math.abs(returnDivisor(char.startPt[1]-char.endPt[1],((char.startPt[1]-char.endPt[1])%quadOpp),quadOpp)); // divided
            
            char.xDist = char.startPt[0];
            char.yDist = char.startPt[1] - calibration; 
                
            //construct path diagonal until 
            while (count < divisor){  
                char.xDist += quadAdj;  
                char.yDist += quadOpp/5;
                $('.containerMain').append('<div id="' + count + '" class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
                count++;
                pivot++;
            }   
        
            //construct horizontal line
            while (char.xDist < char.endPt[0]){
                char.xDist += char.frameDistance*2;
                char.yDist -= calibration;  
                count++;
                $('.containerMain').append('<div id="' + count + '" class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
            }  

            var j = 0;
            var k = 2;
            
            //stop path cycle 
            while (j<12){
                j++;
                count++;
                char.xDist += char.frameDistance*k; // Multiply char.xDist x2 if horizontal
                k = (k*.8);
                char.yDist -= char.frameDistance*1.2; //Previously -=6
                char.startPt[0] = char.xDist;
                char.startPt[1] = char.yDist;
                $('.containerMain').append('<div id="' + count + '" class="pathPoint" style="left:' + char.xDist + 'px; top:' + char.yDist + 'px;"></div>');
            } 

            //Reset start Points
            $('#startPoint').css('left', char.endPt[0] + 'px');
            $('#startPoint').css('top', char.endPt[1] + 'px'); 
             
            if (char.endAngle == undefined){
                char.animateCharacterWalk(char, count, pivot);  
            }

            //if char.endAngle is defined, rotate, then animate : if quad 1, then cabbit-rotate-0-quad1-1 to 4
                 
            else { 
                //short pause
                char.rotateCharacter(char).then((result)=>{  
                    char.animateCharacterWalk(result, count, pivot); 
                }); 
            }

        }

    }

};

 

character.prototype.rotateCharacter = (char) => { 
 
    var gifSrc; 
    var url; 
    
    var thisEl = $('.pathPoint').eq(0); 
            thisEl[0].classList.add('tempPoint');
            thisEl[0].classList.remove('pathPoint');

    let p = new Promise((resolve, reject) => { 

        if (char.endAngle == 0 && char.currQuad == 1){
            gifSrc = '../images/motion/cabbit/cabbit-rotate-0-quad1-';     
            url = '../images/motion/cabbit/cabbit-rotate-0-quad1-' + 1 + '.gif';
            thisEl[0].firstChild.src = url;
            console.log(url);
            //$('.pathPoint').eq(0).html('<img id="tempPt" src=' + gifSrc + 1 + '.gif' + ' style="position : relative; height : 400px; width : 300px; left : -150px; top : -200px;">');

            setTimeout(()=>{
                url = '../images/motion/cabbit/cabbit-rotate-0-quad1-' + 2 + '.gif';
                thisEl[0].firstChild.src = url; 
                console.log(url);
            },76); 

            setTimeout(()=>{
                url = '../images/motion/cabbit/cabbit-rotate-0-quad1-' + 3 + '.gif';
                thisEl[0].firstChild.src = url; 
                console.log(url);
            },76*2); 

            setTimeout(()=>{
                url = '../images/motion/cabbit/cabbit-rotate-0-quad1-' + 4 + '.gif';
                thisEl[0].firstChild.src = url; 
                console.log(url);
                resolve(char); 
            },76*3); 
             
        }

        if(char.endAngle == 0 && char.currQuad == 2){
            gifSrc = '../images/motion/cabbit/cabbit-rotate-0-quad2-';   
            url = '../images/motion/cabbit/cabbit-rotate-0-quad2-' + 1 + '.gif';
            thisEl[0].firstChild.src = url;
            console.log(url);
            //$('.pathPoint').eq(0).html('<img id="tempPt" src=' + gifSrc + 1 + '.gif' + ' style="position : relative; height : 400px; width : 300px; left : -150px; top : -200px;">');

            setTimeout(()=>{
                url = '../images/motion/cabbit/cabbit-rotate-0-quad2-' + 2 + '.gif';
                thisEl[0].firstChild.src = url; 
                console.log(url);
            },76); 

            setTimeout(()=>{
                url = '../images/motion/cabbit/cabbit-rotate-0-quad2-' + 3 + '.gif';
                thisEl[0].firstChild.src = url; 
                console.log(url);
            },76*2); 

            setTimeout(()=>{
                url = '../images/motion/cabbit/cabbit-rotate-0-quad2-' + 4 + '.gif';
                thisEl[0].firstChild.src = url; 
                console.log(url);
            },76*3); 

            setTimeout(()=>{
                url = '../images/motion/cabbit/cabbit-rotate-0-quad2-' + 5 + '.gif';
                thisEl[0].firstChild.src = url; 
                console.log(url);
            },76*4); 

            setTimeout(()=>{
                url = '../images/motion/cabbit/cabbit-rotate-0-quad2-' + 6 + '.gif';
                thisEl[0].firstChild.src = url; 
                console.log(url);
                resolve(char); 
            },76*5); 

        }

        if (char.endAngle == 0 && char.currQuad == 3){
            gifSrc = '../images/motion/cabbit/cabbit-rotate-0-quad3-';      
            thisEl[0].firstChild.src = gifSrc + 1 + '.gif';
            //$('.pathPoint').eq(0).html('<img id="tempPt" src=' + gifSrc + 1 + '.gif' + ' style="position : relative; height : 400px; width : 300px; left : -150px; top : -200px;">');

            setTimeout(()=>{
                url = '../images/motion/cabbit/cabbit-rotate-0-quad3-' + 2 + '.gif';
                thisEl[0].firstChild.src = url; 
            },76); 

            setTimeout(()=>{
                url = '../images/motion/cabbit/cabbit-rotate-0-quad3-' + 3 + '.gif';
                thisEl[0].firstChild.src = url; 
            },76*2); 

            setTimeout(()=>{
                url = '../images/motion/cabbit/cabbit-rotate-0-quad3-' + 4 + '.gif';
                thisEl[0].firstChild.src = url; 
            },76*3);

            setTimeout(()=>{
                url = '../images/motion/cabbit/cabbit-rotate-0-quad3-' + 5 + '.gif';
                thisEl[0].firstChild.src = url; 
            },76*4); 

            setTimeout(()=>{
                url = '../images/motion/cabbit/cabbit-rotate-0-quad3-' + 6 + '.gif';
                thisEl[0].firstChild.src = url;   
                resolve(char); 
            },76*5);  

        }

        if (char.endAngle == 0 && char.currQuad == 4){
            gifSrc = '../images/motion/cabbit/cabbit-rotate-0-quad4-';    
            url = '../images/motion/cabbit/cabbit-rotate-0-quad4-' + 1 + '.gif';
            thisEl[0].firstChild.src = url;
            console.log(url);
            //$('.pathPoint').eq(0).html('<img id="tempPt" src=' + gifSrc + 1 + '.gif' + ' style="position : relative; height : 400px; width : 300px; left : -150px; top : -200px;">');

            setTimeout(()=>{
                url = '../images/motion/cabbit/cabbit-rotate-0-quad4-' + 2 + '.gif';
                thisEl[0].firstChild.src = url; 
                console.log(url);
            },76); 

            setTimeout(()=>{
                url = '../images/motion/cabbit/cabbit-rotate-0-quad4-' + 3 + '.gif';
                thisEl[0].firstChild.src = url; 
                console.log(url);
            },76*2); 

            setTimeout(()=>{
                url = '../images/motion/cabbit/cabbit-rotate-0-quad4-' + 4 + '.gif';
                thisEl[0].firstChild.src = url; 
                console.log(url);
                resolve(char); 
            },76*3); 
        } 
        
    });

    return p; 

} 

character.prototype.animateCharacterWalk = (char, count, pivot) => {
    
    setTimeout(function(){ 
        for(i=1; i<=count; i++){
            char.pauseDisplay(i, char.currQuad, char.angle, pivot, (count-6))
            .then((result) =>{ //****** 12-8-22 *** previously count-7
                char.endAngle = result.angle; 
                return char.displayChar(result);
            })
           .then((result) => {
                return char.stopDisplay(result); 
            })
            .then((result) => { 
                
            });
        }
    }, 300); 
}

function returnDivisor(x, y, z){
    return ((x-y)/z)/2;  // if frame distance is 10, then return (x-y)/z
} 

character.prototype.pauseDisplay = (index, quad, angle, pivot, pathEnd) => {

    var state = {}; 
    state.index;
    state.angle; // 0, 38.5, 90, 128.5, 180, 240, 270, 300
    state.pathEnd = false;
    state.pathEndFrame;
    state.frameIndex; 
    state.stopFrameIndex; 

//QUAD 1
    //if quad is 1 and character angle is greater than 38.5 and count <= pivot
        //then angle is cabbit walk 38.5
    if ((quad == 1 && angle > 38.5) && (index <= pivot)){ //angle is calculated from 90
        state.index = index;
        state.angle = 38.5;
    }
    
    //else if quad is 1 and char angle is greater than 38.5 and count > pivot
        //then angle is cabbit walk 0
    else if ((quad == 1 && angle > 38.5) && (index > pivot)){ //angle is calculated from 90
        state.index = index;
        state.angle = 0;
    }

    //else if quad is 1 and char angle is less than 38.5 and count <= pivot
        //then angle is cabbit walk 38.5
    else if ((quad == 1 && angle <= 38.5) && (index <= pivot)){ //angle is calculated from 90
        state.index = index;
        state.angle = 38.5;
    }

    //else if quad is 1 and char angle is lessthan 38.5 and count > pivot
        //then angle is cabbit walk 90
    else if ((quad == 1 && angle <= 38.5) && (index > pivot)){ //angle is calculated from 90
        state.index = index;
        state.angle = 90;
    } 

//QUAD 2
    if ((quad == 2 && angle > 38.5) && (index <= pivot)){ //angle is calculated from 90
        state.index = index;
        state.angle = 141.5;
    }
    
    //else if quad is 1 and char angle is greater than 38.5 and count > pivot
        //then angle is cabbit walk 0
    else if ((quad == 2 && angle > 38.5) && (index > pivot)){ //angle is calculated from 90
        state.index = index;
        state.angle = 180;
    }

    else  if ((quad == 2 && angle <= 38.5) && (index <= pivot)){ //angle is calculated from 90
        state.index = index;
        state.angle = 141.5;
    }
    
    //else if quad is 1 and char angle is greater than 38.5 and count > pivot
        //then angle is cabbit walk 0
    else if ((quad == 2 && angle <= 38.5) && (index > pivot)){ //angle is calculated from 90
        state.index = index;
        state.angle = 90;
    }


//QUAD 3
if ((quad == 3 && angle > 38.5) && (index <= pivot)){  
    state.index = index;
    state.angle = 225;
}
 
else if ((quad == 3 && angle > 38.5) && (index > pivot)){  
    state.index = index;
    state.angle = 180;
}

else  if ((quad == 3 && angle <= 38.5) && (index <= pivot)){  
    state.index = index;
    state.angle = 225;
}
 
else if ((quad == 3 && angle <= 38.5) && (index > pivot)){  
    state.index = index;
    state.angle = 270;
}

//QUAD 4
if ((quad == 4 && angle > 38.5) && (index <= pivot)){  
    state.index = index;
    state.angle = 292;
}
 
else if ((quad == 4 && angle > 38.5) && (index > pivot)){  
    state.index = index;
    state.angle = 0;
}  

if(state.index >= pathEnd){ 
    state.pathEnd = true;
}

if(state.index == pathEnd){
    state.pathEndFrame = state.index;
}

if(state.index > pathEnd){
    state.pathEndFrame = pathEnd;
}

let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(state);
    }, index*66.667);//  1/15 of a second = 66.667
})
return p;

}

character.prototype.displayChar = (state) => {
    let p = new Promise((resolve, reject) => {

        var gifSrc; //URL for image
 
        for(j=1; j<=state.index; j++){  
            if(j<12){ 
                state.frameIndex = j;
            }
            else if((j%12) == 0){ 
                state.frameIndex = 12;
            }
            else if(j>12){ 
                state.frameIndex = (j%12);
            } 
        }
 
        var cabbitWalk0 = [cabbitWalk0x1, cabbitWalk0x2, cabbitWalk0x3, cabbitWalk0x4, cabbitWalk0x5,  cabbitWalk0x6, cabbitWalk0x7, cabbitWalk0x8, cabbitWalk0x9, cabbitWalk0x10, cabbitWalk0x11, cabbitWalk0x12];
        var cabbitWalk45 = [cabbitWalk45x1, cabbitWalk45x2, cabbitWalk45x3, cabbitWalk45x4, cabbitWalk45x5,  cabbitWalk45x6, cabbitWalk45x7, cabbitWalk45x8, cabbitWalk45x9, cabbitWalk45x10, cabbitWalk45x11, cabbitWalk45x12];
        var cabbitWalk90 = [cabbitWalk90x1, cabbitWalk90x2, cabbitWalk90x3, cabbitWalk90x4, cabbitWalk90x5,  cabbitWalk90x6, cabbitWalk90x7, cabbitWalk90x8, cabbitWalk90x9, cabbitWalk90x10, cabbitWalk90x11, cabbitWalk90x12];
        var cabbitWalk135 = [cabbitWalk135x1, cabbitWalk135x2, cabbitWalk135x3, cabbitWalk135x4, cabbitWalk135x5,  cabbitWalk135x6, cabbitWalk135x7, cabbitWalk135x8, cabbitWalk135x9, cabbitWalk135x10, cabbitWalk135x11, cabbitWalk135x12];
        var cabbitWalk180 = [cabbitWalk180x1, cabbitWalk180x2, cabbitWalk180x3, cabbitWalk180x4, cabbitWalk180x5,  cabbitWalk180x6, cabbitWalk180x7, cabbitWalk180x8, cabbitWalk180x9, cabbitWalk180x10, cabbitWalk180x11, cabbitWalk180x12];
        var cabbitWalk225 = [cabbitWalk225x1, cabbitWalk225x2, cabbitWalk225x3, cabbitWalk225x4, cabbitWalk225x5,  cabbitWalk225x6, cabbitWalk225x7, cabbitWalk225x8, cabbitWalk225x9, cabbitWalk225x10, cabbitWalk225x11, cabbitWalk225x12];
        var cabbitWalk270 = [cabbitWalk270x1, cabbitWalk270x2, cabbitWalk270x3, cabbitWalk270x4, cabbitWalk270x5,  cabbitWalk270x6, cabbitWalk270x7, cabbitWalk270x8, cabbitWalk270x9, cabbitWalk270x10, cabbitWalk270x11, cabbitWalk270x12];
        var cabbitWalk292 = [ cabbitWalk292x1,  cabbitWalk292x2,  cabbitWalk292x3,  cabbitWalk292x4,  cabbitWalk292x5,   cabbitWalk292x6,  cabbitWalk292x7,  cabbitWalk292x8,  cabbitWalk292x9,  cabbitWalk292x10,  cabbitWalk292x11,  cabbitWalk292x12];

        if (state.angle == 38.5) { 
            gifSrc = cabbitWalk45[state.frameIndex-1]; 
        } 
        else if (state.angle == 0){
            gifSrc = cabbitWalk0[state.frameIndex-1];
        }
        else if (state.angle == 90){
            gifSrc = cabbitWalk90[state.frameIndex-1];
        } 
        else if (state.angle == 141.5){
            gifSrc = cabbitWalk135[state.frameIndex-1];
        }
        else if (state.angle == 180){
            gifSrc = cabbitWalk180[state.frameIndex-1];
        }
        else if (state.angle == 225){
            gifSrc = cabbitWalk225[state.frameIndex-1];
        }
        else if (state.angle == 270){
            gifSrc = cabbitWalk270[state.frameIndex-1];
        }
        else if (state.angle == 292){
            gifSrc = cabbitWalk292[state.frameIndex-1];
        } 
      
        if (state.pathEnd == false){
            //$('.pathPoint').eq(state.index).html('<img src=' + gifSrc + index + '.gif' + ' style="position : relative; height : 400px; width : 300px; left : -150px; top : -200px;">');      
            $('.pathPoint').eq(state.index).append(gifSrc);      
            $('.tempPoint').remove();// removes the last frame from the rotation cycle
            var thisIndex = state.index; 
    
            //Clears image from pathPoint after 1/15 sec
            setTimeout((thisIndex) => {
             // $('.pathPoint').eq(state.index).empty();  
            }, 76 ); 
       }  

       if (state.index == state.pathEndFrame){
            state.stopFrameIndex = state.frameIndex;
       }

       if (state.pathEnd == true){
            resolve(state);
       }
        
    });

    return p;
    
}

character.prototype.stopDisplay = (state) => { 

    var gifSrc;
    
    if (state.angle == 38.5) {
        gifSrc = '../images/motion/cabbit/cabbit-walk-45-';
    } 
    else if (state.angle == 0){
        gifSrc = '../images/motion/cabbit/cabbit-walk-0-';
    }
    else if (state.angle == 90){
        gifSrc = '../images/motion/cabbit/cabbit-walk-90-';
    } 
    else if (state.angle == 141.5){
        gifSrc = '../images/motion/cabbit/cabbit-walk-135-';
    }
    else if (state.angle == 180){
        gifSrc = '../images/motion/cabbit/cabbit-walk-180-';
    }
    else if (state.angle == 225){
        gifSrc = '../images/motion/cabbit/cabbit-walk-225-';
    }
    else if (state.angle == 270){
        gifSrc = '../images/motion/cabbit/cabbit-walk-270-';
    }
    else if (state.angle == 292){
        gifSrc = '../images/motion/cabbit/cabbit-walk-292-';
    }
 
    if (state.index == state.pathEndFrame){

        $('.pathPoint').eq(state.index).html('<img src=' + gifSrc + state.frameIndex + '.gif' + ' style="position : relative; height : 350px; width : 262.5px; left : -150px; top : -200px;">');      
        setTimeout((thisIndex) => {
            $('.pathPoint').eq(state.index).empty();  
        }, 76 ); 
        
    }

    else if (state.index > state.pathEndFrame){ 

        var difference = state.index - state.pathEndFrame;  
        var stopFrameIndex = state.frameIndex - difference;
        var thisIndex = state.frameIndex; 

        //2
        if (stopFrameIndex == 2 && difference == 4){
            thisIndex = "6";
        }

        if (stopFrameIndex == 2 && difference == 5){
            thisIndex = "6";
        }

        //3
        if (stopFrameIndex == 3 && difference == 2){
            thisIndex = "4a";
        }

        if (stopFrameIndex == 3 && difference == 3){
            thisIndex = "5";
        }

        if (stopFrameIndex == 3 && difference == 4){
            thisIndex = "5a";
        }

        if (stopFrameIndex == 3 && difference == 5){
            thisIndex = "6";
        }

        //4
        if (stopFrameIndex == 4 && difference == 1){
            thisIndex = "4a";
        }

        if (stopFrameIndex == 4 && difference == 2){
            thisIndex = "5";
        }

        if (stopFrameIndex == 4 && difference == 3){
            thisIndex = "5a";
        }

        if (stopFrameIndex == 4 && difference == 4){
            thisIndex = "6";
        }

        if (stopFrameIndex == 4 && difference == 5){
            thisIndex = "6";
        }

        //6
        if (stopFrameIndex == 6 && difference == 5){
            thisIndex = "10";
        }

        //7
        if (stopFrameIndex == 7 && difference == 2){
            thisIndex = "8a";
        }

        if (stopFrameIndex == 7 && difference == 3){
            thisIndex = "9";
        }

        if (stopFrameIndex == 7 && difference == 4){
            thisIndex = "10";
        }

        if (stopFrameIndex == 7 && difference == 5){
            thisIndex = "10";
        }

        //8
        if (stopFrameIndex == 8 && difference == 1){
            thisIndex = "8a";
        }

        if (stopFrameIndex == 8 && difference == 2){
            thisIndex = "9";
        }

        if (stopFrameIndex == 8 && difference == 3){
            thisIndex = "9a";
        }

        if (stopFrameIndex == 8 && difference == 4){
            thisIndex = "10";
        }

        if (stopFrameIndex == 8 && difference == 5){
            thisIndex = "10";
        }

        //9
        if (stopFrameIndex == 9 && difference == 1){
            thisIndex = "9a";
        }

        if (stopFrameIndex == 9 && difference == 2){
            thisIndex = "10";
        }

        if (stopFrameIndex == 9 && difference == 3){
            thisIndex = "11";
        }

        if (stopFrameIndex == 9 && difference == 4){
            thisIndex = "12";
        }

        if (stopFrameIndex == 9 && difference == 5){
            thisIndex = "12";
        }

        //10
        if (stopFrameIndex == 10 && difference == 3){
            thisIndex = "1";
        }

        if (stopFrameIndex == 10 && difference == 4){
            thisIndex = "2";
        }

        if (stopFrameIndex == 10 && difference == 5){
            thisIndex = "4";
        }

        //11
        if (stopFrameIndex == 11 && difference == 2){
            thisIndex = "1";
        }

        if (stopFrameIndex == 11 && difference == 3){
            thisIndex = "2";
        }

        if (stopFrameIndex == 11 && difference == 4){
            thisIndex = "3";
        }

        if (stopFrameIndex == 11 && difference == 5){
            thisIndex = "4";
        }

        //12
        if (stopFrameIndex == 12 && difference == 1){
            thisIndex = difference;
        }

        if (stopFrameIndex == 12 && difference == 2){
            thisIndex = difference;
        }

        if (stopFrameIndex == 12 && difference == 3){
            thisIndex = difference; 
        }

        if (stopFrameIndex == 12 && difference == 4){
            thisIndex = difference;
        }
             
        if (stopFrameIndex == 12 && difference == 5){
            thisIndex = difference;
        }  

        $('.pathPoint').eq(state.index).html('<img src=' + gifSrc + thisIndex + '.gif' + ' style="position : relative; height : 350px; width : 262.5px; left : -150px; top : -200px;">');      
        if((difference) <= 4 ){
            setTimeout((thisIndex) => {
               $('.pathPoint').eq(state.index).empty();  
            }, 76 ); 
        } 
       
    }

}

    //Generate Background
    //Generate objects
    //load character

    var cabbit = new character([700,700], [], [], 5); 
    //calibrate start point

    //$('#startPoint').css('left', cabbit.startPt[0] + 'px');
    //$('#startPoint').css('top', cabbit.startPt[1] + 'px');

    $('body').on('mouseup', function(e){  

        console.log("end Angle : " + cabbit.endAngle);

        //Set end Pt
        cabbit.endPt[0] = e.pageX;
        cabbit.endPt[1] = e.pageY;  

        //change css position of end pt
        //$('#endPoint').css('left', cabbit.endPt[0]);
        //$('#endPoint').css('top', cabbit.endPt[1]);  

        var prevCount;
        var points = $('.pathPoint'); 
        var offsetTop = (($('#startPoint')[0].offsetTop)) + "px"; // ******change to percent percentage
        
        if (count > 1){

            prevCount = count;

            for(j=0; j<count-1; j++){
                points[j].remove();  
            } 
            
            $('.pathPoint').css('top', offsetTop);
            cabbit.startPt[1] = ($('#startPoint')[0].offsetTop);
    
            //$('.pathPoint').remove();
            count = 0; 
            
            cabbit.moveCharacter(cabbit);
        }

        else {  
            cabbit.moveCharacter(cabbit); 
        } 
      
    }
    ); 
 

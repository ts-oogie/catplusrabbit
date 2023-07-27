import {generateBackground} from './generateBG.js'  
import {generateCharacter} from './generateCharacter.js' 
//import {checkInterval} from './utils.js'   

export function generateScene(sceneNum, win, char){ 

    let screenPercent
    let sceneComplete = false   

    let charPosition = {
        cabbit : [800, 600]
    }     

    let cabbit = char

    function bodyEventListener(cabbit){

        document.getElementsByTagName('body')[0].addEventListener('click', (e)=>{

            let itemClass
            let count = 0   
    
            // 1. SET POINTER to none
            $('body').css('pointer-events','none')     
    
            // 2. END POINTS ARE SET
            cabbit.endPt[0] = e.pageX 
            cabbit.endPt[1] = e.pageY  

            console.log("cabbit endAngle : ")
            console.log(cabbit.endAngle)
    
            // 3. CALCULATE ANGLE
            cabbit.opp = Math.pow((cabbit.endPt[0] - cabbit.startPt[0]), 1)
            cabbit.adj = Math.pow((cabbit.endPt[1] - cabbit.startPt[1]), 1) 
            cabbit.angle = Math.abs(Math.atan(cabbit.opp/cabbit.adj) * 180/Math.PI) 
            
           alert("X : " + win.width*(cabbit.endPt[0]/win.width) + "  Y : " + win.height*(cabbit.endPt[1]/win.height) )
           alert(" ScreenX : " + win.width + " ScreenY : " + win.height) 
           
            // 4B. IF character is not in motion, path not interrupted
            if (cabbit.count > 1 && cabbit.inMotion == false){   

                //alert("cabbit count : " + cabbit.count)
    
                //THIS IS WHERE WE TOGGLE START POINTS AND CALIBRATE THEM IF THEY ARE OFF
                 
                let offsetTop  // ******change to percent percentage  
                let calibration = win.height/18.32 
                
                if(cabbit.pathCount == 0){
                    itemClass = '.pathPoint'
                }
                else{
                    itemClass = '.pathPoint' + cabbit.pathCount
                } 
                
                var points = $(itemClass)   
    
                //cabbit.pathCount = 0
    
                //endAngle = 0; pathCount = 0
                if (cabbit.endAngle == 0){  
                    console.log("_____________________")
                    console.log("end angle : 0") 
                    cabbit.startPt[1] = ($('#startPoint')[0].offsetTop)  
                    //alert("start Pt x : " + cabbit.startPt[0] + "start Pt y : " + cabbit.startPt[1])
                    //alert("$StartPoint[0].offsetTop : " + ($('#startPoint')[0].offsetTop))
    
                    //CURRENT QUAD == 1
                    if (cabbit.currQuad == 1){
                        console.log("curr quad 1")
                        //selected quad == 1   
                        if(cabbit.endPt[0] > cabbit.startPt[0] && cabbit.endPt[1] < cabbit.startPt[1]){ 
                            //cabbit.endPt[0] = cabbit.endPt[0] - (win.width*.0277777777777)
                            console.log("selected quad 1")
                            if ((cabbit.angle >= 38.5) && (cabbit.angle < 90)){ 
                                console.log("selected pivot")
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            } 
                            else if ((90-cabbit.angle) > 38.5 && (90-cabbit.angle) < 90) { 
                                console.log("selected diagonal up!")
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/3.3) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                                 
                            }
                            
                        }
                        //selected quad == 2
                        else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] < cabbit.startPt[1]){
                            console.log("selected quad 2")
                            if ((Math.abs(cabbit.angle) > 38.5) && (Math.abs(cabbit.angle) < 90)){
                                console.log("selected pivot")
                                
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/8.5) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            else if ((90-(Math.abs(cabbit.angle))) > 38.5 && (90-(Math.abs(cabbit.angle))) < 90) {
                                console.log("selected diagonal up")
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            //cabbit.endPt[0] = cabbit.endPt[0] + (win.width*.0277777777777) 
                            
                        }
                        //selected quad == 3
                        else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] > cabbit.startPt[1]){
                            //cabbit.endPt[0] = cabbit.endPt[0] + (win.width*.0277777777777)
                            console.log("selected quad 3")
                            if ((cabbit.angle > 38.5) && (cabbit.angle < 90) ){ 
                                console.log("selected pivot")
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-(calibration)) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            else if ((cabbit.angle < 38.5) && (cabbit.angle > 0)){ 
                                console.log("selected diagonal down")
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-(calibration)) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            
                        }
                        //selected quad == 4
                        else if (cabbit.endPt[1]>cabbit.startPt[1]&&cabbit.endPt[0]>=cabbit.startPt[0]){ 
    
                            //cabbit.endPt[0] = cabbit.endPt[0] - (win.width*.0277777777777)
                            console.log("selected quad 4")
                            if ((cabbit.angle > 38.5) && (cabbit.angle < 90)){ 
                                console.log("selected pivot")
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-(calibration/2)) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            else if ((cabbit.angle < 38.5) && (cabbit.angle > 0)){ 
                                console.log("selected diagonal")
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-(calibration/2)) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            } 
                        }  
                    } 
    
                    else if(cabbit.currQuad == 4){
                        console.log("curr quad 4")
                        //selected quad == 1
                        if(cabbit.endPt[0] > cabbit.startPt[0] && cabbit.endPt[1] < cabbit.startPt[1]){ 
                            //cabbit.endPt[0] = cabbit.endPt[0] - (win.width*.0277777777777) 
                            console.log("selected quad 1")
                            offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/3) + 'px' 
                            cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-(calibration/2)) // MINUS CALIBRATION
                            for(let j=0; j<cabbit.count-1; j++){
                                points[j].remove()
                            } 
                        }
                        //selected quad == 2
                        else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] < cabbit.startPt[1]){
                            console.log("selected quad 2")
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/10) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop+(calibration/4)) // MINUS CALIBRATION 
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                }   
                        }
    
                        //selected quad == 3
                        else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] > cabbit.startPt[1]){ 
                            console.log("selected quad 3")
                            offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                            cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-(calibration/2)) // MINUS CALIBRATION
                            for(let j=0; j<cabbit.count-1; j++){
                                points[j].remove()
                            } 
                        }
    
                        //selected quad == 4
                        else if(cabbit.endPt[0] > cabbit.startPt[0] && cabbit.endPt[1] > cabbit.startPt[1]){ 
                            console.log("selected quad 4")
                            offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                            cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-(calibration/2)) // MINUS CALIBRATION
                            for(let j=0; j<cabbit.count-1; j++){
                                points[j].remove()
                            } 
                        }
                    }
                    
    
                }
    
                //endAngle == 90; pathCount = 0
                else if(cabbit.endAngle == 90){  
                    console.log("_____________________")
                    console.log("End angle : 90")
                    offsetTop = (($('#startPoint')[0].offsetTop)) + "px"  
                    cabbit.startPt[1] = ($('#startPoint')[0].offsetTop) 
                    //if currQuad == 1 
                    if(cabbit.currQuad == 1){ 
                        console.log("curr quad 1")
                        //selected quad == 1 
                        if(cabbit.endPt[0] > cabbit.startPt[0] && cabbit.endPt[1] < cabbit.startPt[1]){ 
                            console.log("selected quad 1")
                            //if pivot
                            if ((cabbit.angle >= 38.5) && (cabbit.angle < 90)){
                                console.log("selected pivot")
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop+calibration/2 ) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            } 
                            //if diagonal up
                            else if ((90-cabbit.angle) >= 38.5 && (90-cabbit.angle) < 90) { 
                                console.log("selected diagonal angle")
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop+calibration ) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            } 
                        }
                        //selected quad == 2
                        else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] < cabbit.startPt[1]){
                            console.log("selected quad 2") 
                            if ((Math.abs(cabbit.angle) > 38.5) && (Math.abs(cabbit.angle) < 90)){
                                console.log("selected pivot")
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration*.7) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-(calibration/3)) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            else if ((90-(Math.abs(cabbit.angle))) > 38.5 && (90-(Math.abs(cabbit.angle))) < 90) {
                                console.log("selected diagonal up")
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                        }
                        //selected quad == 3
                        else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] > cabbit.startPt[1]){
                            console.log("selected quad 3")
                            if ((cabbit.angle > 38.5) && (cabbit.angle < 90) ){ 
                                console.log("selected pivot")
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/1) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-(calibration/10)) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            } 
                            else if ((cabbit.angle < 38.5) && (cabbit.angle > 0)){ 
                                console.log("selected diagonal")
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/1) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-(calibration/10)) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            } 
                        }
    
                        //selected quad == 4
                        else if(cabbit.endPt[0] > cabbit.startPt[0] && cabbit.endPt[1] > cabbit.startPt[1]){ 
                            console.log("selected quad 4")
                            offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration*1.1) + 'px' 
                            cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-(calibration/10)) // MINUS CALIBRATION
                            for(let j=0; j<cabbit.count-1; j++){
                                points[j].remove()
                            } 
                        }
    
                        
                    }
                    //if currQuad == 2
                    else if(cabbit.currQuad == 2){
                        //selected quad == 1  
                        console.log("curr quad 2")
                        if(cabbit.endPt[0] > cabbit.startPt[0] && cabbit.endPt[1] < cabbit.startPt[1]){  
                            console.log("selected quad 1")
                            if ((Math.abs(cabbit.angle) > 38.5) && (Math.abs(cabbit.angle) < 90)){
                                console.log("selected pivot")
                                
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-calibration/2) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            else if ((90-(Math.abs(cabbit.angle))) > 38.5 && (90-(Math.abs(cabbit.angle))) < 90) {
                                console.log("selected diagonal up")
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop/2) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                        }
                        //selected quad == 2
                        else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] < cabbit.startPt[1]){ 
                            if ((Math.abs(cabbit.angle) > 38.5) && (Math.abs(cabbit.angle) < 90)){
                                console.log("selected pivot")
                                
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-calibration) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            else if ((90-(Math.abs(cabbit.angle))) > 38.5 && (90-(Math.abs(cabbit.angle))) < 90) {
                                console.log("selected diagonal up")
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop/2) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                        }
                        //selected quad == 3
                        else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] > cabbit.startPt[1]){
                            console.log("selected quad 3")
                            offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-calibration +  'px' 
                            cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-calibration) // MINUS CALIBRATION
                            for(let j=0; j<cabbit.count-1; j++){
                                points[j].remove()
                            } 
                        }
                        //selected quad == 4
                        else if(cabbit.endPt[0] > cabbit.startPt[0] && cabbit.endPt[1] > cabbit.startPt[1]){ 
                            console.log("selected quad 4")
                            offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                            cabbit.startPt[1] = ($('#startPoint')[0].offsetTop) // MINUS CALIBRATION
                            for(let j=0; j<cabbit.count-1; j++){
                                points[j].remove()
                            } 
                        }
                    } 
                } 
    
                else if(cabbit.endAngle == 180){
                    //currQuad == 2
                    console.log("_____________________")
                    console.log("end angle : 180")
                    cabbit.currIndex = 0
                    offsetTop = (($('#startPoint')[0].offsetTop)) + "px"  
                    cabbit.startPt[1] = ($('#startPoint')[0].offsetTop)  
                    if (cabbit.currQuad == 2){
                        
                        console.log("curr quad 2")
                        //selected quad == 1
                        if(cabbit.endPt[0] > cabbit.startPt[0] && cabbit.endPt[1] < cabbit.startPt[1]){
    
                            if ((Math.abs(cabbit.angle) > 38.5) && (Math.abs(cabbit.angle) < 90)){
                                console.log("selected pivot")
                                
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-calibration/2) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            else if ((90-(Math.abs(cabbit.angle))) > 38.5 && (90-(Math.abs(cabbit.angle))) < 90) {
                                console.log("selected diagonal up")
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop/2) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            console.log("selected quad 1")
                            
                        }
                        //curr quad == 2, pivot
                        else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] > cabbit.startPt[1]){
                            console.log("selected quad 2")
                            offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/4) + 'px' 
                            cabbit.startPt[1] = ($('#startPoint')[0].offsetTop ) // MINUS CALIBRATION
                            for(let j=0; j<cabbit.count-1; j++){
                                points[j].remove()
                            } 
                        }
                        //selected quad == 3
                        else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] < cabbit.startPt[1]){
                            console.log("selected quad 3")
                            offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/3) + 'px' 
                            cabbit.startPt[1] = ($('#startPoint')[0].offsetTop ) // MINUS CALIBRATION
                            for(let j=0; j<cabbit.count-1; j++){
                                points[j].remove()
                            } 
                        }
                        //selected quad == 4
                        else if(cabbit.endPt[0] > cabbit.startPt[0] && cabbit.endPt[1] > cabbit.startPt[1]){
                            console.log("selected quad 4")
                            offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/4) + 'px' 
                            cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-(calibration/2)) // MINUS CALIBRATION
                            for(let j=0; j<cabbit.count-1; j++){
                                points[j].remove()
                            } 
                        }  
                   } 
                    
                    //currQuad == 3  
                    else if(cabbit.currQuad == 3){
                        //selected quad == 1
                        console.log("curr quad 3")
                        if(cabbit.endPt[0] > cabbit.startPt[0] && cabbit.endPt[1] > cabbit.startPt[1]){
                            //June 29, 2023 : added calibration to shift endpt left when currquad is 3 and selected quad is 1 
                            //cabbit.endPt[0] = cabbit.endPt[0] - (win.width*.0277777777777)
                            console.log("selected quad 1") 
                            console.log("currIndex : " + cabbit.currIndex)
                            offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                            console.log("offsetTop : ")
                            console.log(offsetTop)
                            cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-calibration/2) // MINUS CALIBRATION
                            for(let j=0; j<cabbit.count-1; j++){
                                points[j].remove()
                            } 
                        }
                        //selected quad == 2, pivot
                        else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] > cabbit.startPt[1]){ 
                            //cabbit.endPt[0] = cabbit.endPt[0] + (win.width*.0277777777777) //JUNE 29, 2023
                            console.log("selected quad 2")
                            offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/4) + 'px' 
                            cabbit.startPt[1] = ($('#startPoint')[0].offsetTop ) // MINUS CALIBRATION
                            for(let j=0; j<cabbit.count-1; j++){
                                points[j].remove()
                            } 
                        }
                        //selected quad == 3
                        else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] < cabbit.startPt[1]){
                            //cabbit.endPt[0] = cabbit.endPt[0] + (win.width*.0277777777777) //JUNE 29, 2023 
                            console.log("selected quad 3")
                            offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/4) + 'px' 
                            cabbit.startPt[1] = ($('#startPoint')[0].offsetTop ) // MINUS CALIBRATION
                            for(let j=0; j<cabbit.count-1; j++){
                                points[j].remove()
                            } 
                        }
                        //selected quad == 4
                        else {
                            //cabbit.endPt[0] = cabbit.endPt[0] - (win.width*.0277777777777)
                            console.log("selected quad 4")
                            offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                            cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-(calibration/2)) // MINUS CALIBRATION
                            for(let j=0; j<cabbit.count-1; j++){
                                points[j].remove()
                            } 
                        }  
                    }
    
                } 
    
                else if(cabbit.endAngle == 270){
                    console.log("_____________________")
                    console.log("end angle : 270")
                    if(cabbit.currQuad == 3){
                        console.log("curr quad 3")
                        //selected quad == 1
                        if(cabbit.endPt[0] > cabbit.startPt[0] && cabbit.endPt[1] < cabbit.startPt[1]){ 
                            console.log("selected quad 1")
                            offsetTop = $('#' + cabbit.currIndex)[0].offsetTop+(calibration/4) + 'px' 
                            cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-calibration/2) // MINUS CALIBRATION
                            for(let j=0; j<cabbit.count-1; j++){
                                points[j].remove()
                            } 
                        }
                        //selected quad == 2, pivot
                        else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] < cabbit.startPt[1]){ 
                            console.log("selected quad 2")
                            offsetTop = $('#' + cabbit.currIndex)[0].offsetTop+(calibration) + 'px' 
                            cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-calibration/2 ) // MINUS CALIBRATION
                            for(let j=0; j<cabbit.count-1; j++){
                                points[j].remove()
                            } 
                        }
                        //selected quad == 3
                        else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] > cabbit.startPt[1]){ 
                            console.log("selected quad 3")
                            offsetTop = $('#' + cabbit.currIndex)[0].offsetTop+(calibration/2) + 'px' 
                            cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-calibration/2 ) // MINUS CALIBRATION
                            for(let j=0; j<cabbit.count-1; j++){
                                points[j].remove()
                            } 
                        }
                        //selected quad == 4
                        else { 
                            console.log("selected quad 4")
                            offsetTop = $('#' + cabbit.currIndex)[0].offsetTop+(calibration/2) + 'px' 
                            cabbit.startPt[1] = ($('#startPoint')[0].offsetTop+(calibration/4)) // MINUS CALIBRATION
                            for(let j=0; j<cabbit.count-1; j++){
                                points[j].remove()
                            } 
                        }  
                    }
                    else if(cabbit.currQuad == 4){  
                        //QUAD 1
                        console.log("curr quad 4")
                        if(cabbit.endPt[0] > cabbit.startPt[0] && cabbit.endPt[1] < cabbit.startPt[1]){ 
                            console.log("selected quad 1")
                            offsetTop = $('#' + cabbit.currIndex)[0].offsetTop+(calibration/2) + 'px' 
                            cabbit.startPt[1] = ($('#startPoint')[0].offsetTop+calibration/2) // MINUS CALIBRATION
                            for(let j=0; j<cabbit.count-1; j++){
                                points[j].remove()
                            } 
                        }
                        //selected quad == 2, pivot
                        else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] < cabbit.startPt[1]){ 
                            console.log("selected quad 2")
                            offsetTop = $('#' + cabbit.currIndex)[0].offsetTop + 'px' 
                            cabbit.startPt[1] = ($('#startPoint')[0].offsetTop+calibration/4) // MINUS CALIBRATION
                            for(let j=0; j<cabbit.count-1; j++){
                                points[j].remove()
                            } 
                        }
                        //selected quad == 3
                        else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] > cabbit.startPt[1]){ 
                            console.log("selected quad 3")
                            offsetTop = $('#' + cabbit.currIndex)[0].offsetTop + 'px' 
                            cabbit.startPt[1] = ($('#startPoint')[0].offsetTop+calibration/4 ) // MINUS CALIBRATION
                            for(let j=0; j<cabbit.count-1; j++){
                                points[j].remove()
                            } 
                        }
                        //selected quad == 4
                        else {
                            console.log("selected quad 4")
                            offsetTop = $('#' + cabbit.currIndex)[0].offsetTop  + 'px'  //#1
                            cabbit.startPt[1] = ($('#startPoint')[0].offsetTop+(calibration/4)) // MINUS CALIBRATION
                            for(let j=0; j<cabbit.count-1; j++){
                                points[j].remove()
                            } 
                        }  
                    }
                }
                
                $(itemClass).css('top', offsetTop);
    
                //MAKE SURE TO ADD this TO EVERY CASE
                //cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-calibration)
    
                cabbit.count = count
                cabbit.moveCharacter()  

            } 
    
            else {   
                cabbit.moveCharacter()  
            }
                
              
        })  
    }

    function stopInt(){
        clearInterval(thisInterval)  
    }  

    if(sceneNum == 0){
        screenPercent = 75
        generateBackground(0, screenPercent)   
        setTimeout(() => { 
            generateScene(1, win)  
        }, 100)  
    }
    else if(sceneNum == 1){

        screenPercent = 90
        generateBackground(1, screenPercent)     

        cabbit = generateCharacter(
            'cabbit', 
            charPosition, 
            win, 
            screenPercent-30,
            0 
        )     

        //Listens for body click event : 
        bodyEventListener(cabbit)

        document.getElementById('cabbitPositionX').innerText = charPosition.cabbit[0]
        document.getElementById('cabbitPositionY').innerText = charPosition.cabbit[1]  

        const thisInterval = setInterval(()=>{
                //if char Position X is less than or equal to 370
                let thisPos = document.getElementById('cabbitPositionX').innerText

                if(thisPos <= win.width*.20){  
                    stopInt()   
                    setTimeout(()=>{ 
                            
                        generateScene(2, win, cabbit)  
                        cabbit.endAngle = undefined
                        cabbit.startPt[0] = 1500
                        cabbit.startPt[1] = 650 

                    }, 2000)
                    
                } 
                        }, 66.67) 

        function stopInt(){
            clearInterval(thisInterval)  
        }  

         
    }

    else if(sceneNum == 2){
        screenPercent = 90
        let pathPts = $('.pathPoint')
            pathPts.remove()    

            generateBackground(2, screenPercent)    

            document.getElementById('startPoint').style.left = cabbit.startPt[0] + 'px' 
            document.getElementById('startPoint').style.top = cabbit.startPt[1] + 'px'  
            
            
    }
  
    
}
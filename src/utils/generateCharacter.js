import {cabbitGifs} from './gifs.js'
import {characterObject} from './character.js'
import {setCharSize} from './utils.js'

export function generateCharacter(name, charPosition, win, screenPercent){

    let charSize = setCharSize(win.width, screenPercent)
    let frameDistance = win.width*.002604166666667 

    switch(name){

        case 'cabbit':

            let cabbitGIFs = cabbitGifs('cabbit', charSize[0], charSize[1])
            let cabbit = new characterObject(charPosition.cabbit, [], frameDistance, cabbitGIFs, charSize[0], charSize[1], name)

            document.getElementsByTagName('body')[0].addEventListener('click', (e)=>{

                let itemClass
                let count = 0  

                

                //set end points
                cabbit.endPt[0] = e.pageX
                cabbit.endPt[1] = e.pageY   

                //If screen is clicked while cabbit is moving, path is being interrupted
                if (cabbit.count > 1 && cabbit.inMotion == true){   

                    cabbit.pathInterrupted = true
                    cabbit.pathCount++

                    if(cabbit.pathCount - 1 == 0){
                        itemClass = '.pathPoint'
                    }
                    else {
                        itemClass = '.pathPoint' + (cabbit.pathCount-1) 
                    } 
 
                    let offsetTop = $('#' + cabbit.currIndex)[0].offsetTop + 'px' 

                    let str1 = $('#' + cabbit.currIndex)[0].style.left 
                    let str2 = $('#' + cabbit.currIndex)[0].offsetTop + 'px' 
                    str1 = eval(str1.substring(0, str1.length - 2))
                    str2 = eval(str2.substring(0, str2.length - 2))
                    
                    //on click, reset start points
                    cabbit.startPt[0] = str1
                    cabbit.startPt[1] = str2 

                    $('#endPoint').css('left', cabbit.endPt[0])
                    $('#endPoint').css('top', cabbit.endPt[1]) 

                    var points = $(itemClass)    

                    if (cabbit.endAngle == 0){  
                        
                        //selected quad == 1
                        if(cabbit.endPt[0] >= cabbit.startPt[0] && cabbit.endPt[1] <= cabbit.startPt[1]){
                            for (let j=0; j<cabbit.count-1; j++){
                                points[j].remove()
                            }   
                            count--
                        } 

                        //selected quad == 2
                        else if(cabbit.endPt[1] <= cabbit.startPt[1] && cabbit.endPt[0] <= cabbit.startPt[0]){
                            for (let j=0; j<cabbit.count-1; j++){
                                points[j].remove()
                            }   
                            count--
                        }

                        //selected quad == 3
                        else if(cabbit.endPt[1] >= cabbit.startPt[1] && cabbit.endPt[0] <= cabbit.startPt[0]){
                            for (let j=0; j<cabbit.count-1; j++){
                                points[j].remove()
                            }   
                            count--
                        }

                        //selected quad == 4 
                        else if(cabbit.endPt[0] > cabbit.startPt[0] && cabbit.endPt[1] > cabbit.startPt[1] && cabbit.currIndex >= cabbit.pivot){
                            for (let j=0; j<cabbit.count-1; j++){
                                points[j].remove()
                            }    
                        } 

                    }    

                    //if cabbit is moving diagonally at 292  
                    else if(cabbit.endAngle == 292){ 

                        let src
                        /*
                        console.log("start pt x : " + cabbit.startPt[0])
                        console.log("end pt x : " + cabbit.endPt[0])

                        console.log("start pt y : " + cabbit.startPt[1])
                        console.log("end pt y : " + cabbit.endPt[1]) */

                        switch(cabbit.frameIndex){
                            case 1:
                                src = 'w292x2'
                                break
                            case 2:
                                src = 'w292x3'
                                break
                            case 3:
                                src = 'w292x4'
                                break
                            case 4:
                                src = 'w292x5'
                                break
                            case 5:
                                src = 'w292x6'
                                break
                            case 6:
                                src = 'w292x7'
                                break
                            case 7:
                                src = 'w292x8'
                                break
                            case 8:
                                src = 'w292x9'
                                break
                            case 9:
                                src = 'w292x10'
                                break
                            case 10:
                                src = 'w292x11'
                                break
                            case 11:
                                src = 'w292x12'
                                break  
                            case 12:
                                src = 'w292x1'
                                break
                        } 

                        //selected quad 4, pivot
                        if (cabbit.endPt[1] >= cabbit.startPt[1] && cabbit.endPt[0] >= cabbit.startPt[0]){
                            
                            for (let j=0; j<cabbit.count-1; j++){
                                points[j].remove()
                            }   

                            $('#bgMain').append('<div class="' + 'tempPoint' + '" style="left:' + (cabbit.startPt[0]) + 'px; top:' + (cabbit.startPt[1]) + 'px;"></div>')
                            $('.tempPoint').append('<img width="' + cabbit.width + '" height="' + cabbit.height + '" class="' + 'cabbit' + '" />')
                            $('.cabbit')[0].src = cabbitGIFs[src].src  

                            count++

                        } 
                        /*
                        //selected quad 4, diagonal then down
                        else if(){}

                        //selected quad 1, pivot
                        else if(){}

                        //selected quad 1, diagonal up
                        else if(){}

                        //selected quad 2, pivot
                        else if(){}

                        //selected quad 2, diagonal up
                        else if(){}

                        //selected quad 3, pivot
                        else if(){}

                        //selected quad 3, diagonal down
                        else if(){}*/

                    } 
                    
                    cabbit.count = count
                    cabbit.moveCharacter() 
                    
                }
                
                //IF character is not in motion, path 
                else if (cabbit.count > 1 && cabbit.inMotion == false){   
                     
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

                        offsetTop = (($('#startPoint')[0].offsetTop)) + "px"  
                        cabbit.startPt[1] = ($('#startPoint')[0].offsetTop) 

                        //CURRENT QUAD == 1
                        if (cabbit.currQuad == 1){
                            //selected quad == 1  
                            if(cabbit.endPt[0] > cabbit.startPt[0] && cabbit.endPt[1] < cabbit.startPt[1]){
                      
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            //selected quad == 2
                            else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] < cabbit.startPt[1]){
                                 
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            //selected quad == 3
                            else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] < cabbit.startPt[1]){
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-(calibration)) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            //selected quad == 4
                            else {
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-(calibration/2)) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }  
                        }

                        else if(cabbit.currQuad == 4){
                            if(cabbit.endPt[0] > cabbit.startPt[0] && cabbit.endPt[1] < cabbit.startPt[1]){
                      
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            //selected quad == 2
                            else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] < cabbit.startPt[1]){
                                 
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop+(calibration/4)) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            //selected quad == 3
                            else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] > cabbit.startPt[1]){
                             
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-(calibration/2)) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            //selected quad == 4
                            else if(cabbit.endPt[0] > cabbit.startPt[0] && cabbit.endPt[1] > cabbit.startPt[1]){
                                 
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

                        offsetTop = (($('#startPoint')[0].offsetTop)) + "px"  
                        cabbit.startPt[1] = ($('#startPoint')[0].offsetTop) 
                        //if currQuad == 1 
                        if(cabbit.currQuad == 1){ 
                            //selected quad == 1 
                            if(cabbit.endPt[0] > cabbit.startPt[0] && cabbit.endPt[1] < cabbit.startPt[1]){
                                 
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-calibration ) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            //selected quad == 2
                            else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] > cabbit.startPt[1]){
                                
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-(calibration*2)) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            //selected quad == 3
                            else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] < cabbit.startPt[1]){
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-(calibration)) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            //selected quad == 4
                            else if(cabbit.endPt[0] > cabbit.startPt[0] && cabbit.endPt[1] > cabbit.startPt[1]){
                                
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-(calibration/2)) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }

                            
                        }
                        //if currQuad == 2
                        else if(cabbit.currQuad == 2){
                            //selected quad == 1  
                            if(cabbit.endPt[0] > cabbit.startPt[0] && cabbit.endPt[1] < cabbit.startPt[1]){ 
                                 
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-calibration   + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-calibration/2) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            //selected quad == 2
                            else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] < cabbit.startPt[1]){
                              
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-calibration + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            //selected quad == 3
                            else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] > cabbit.startPt[1]){
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-calibration +  'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-calibration) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            //selected quad == 4
                            else if(cabbit.endPt[0] > cabbit.startPt[0] && cabbit.endPt[1] > cabbit.startPt[1]){
                                
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
                       if (cabbit.currQuad == 2){
                            //selected quad == 1
                            if(cabbit.endPt[0] > cabbit.startPt[0] && cabbit.endPt[1] < cabbit.startPt[1]){
                                
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-calibration/4) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            //selected quad == 2, pivot
                            else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] > cabbit.startPt[1]){
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/4) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop ) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            //selected quad == 3
                            else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] < cabbit.startPt[1]){
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/4) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop ) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            //selected quad == 4
                            else {
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-(calibration/2)) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }  
                       } 
                        
                        //currQuad == 3
                        else if(cabbit.currQuad == 3){
                            //selected quad == 1
                            if(cabbit.endPt[0] > cabbit.startPt[0] && cabbit.endPt[1] > cabbit.startPt[1]){
                                
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-calibration/4) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            //selected quad == 2, pivot
                            else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] > cabbit.startPt[1]){
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/4) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop ) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            //selected quad == 3
                            else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] < cabbit.startPt[1]){
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/4) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop ) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            //selected quad == 4
                            else {
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop-(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-(calibration/2)) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }  
                        }

                    } 

                    else if(cabbit.endAngle == 270){
                        if(cabbit.currQuad == 3){
                            alert("Q3")
                            //selected quad == 1
                            if(cabbit.endPt[0] > cabbit.startPt[0] && cabbit.endPt[1] < cabbit.startPt[1]){ 
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop+(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-calibration/2) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            //selected quad == 2, pivot
                            else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] < cabbit.startPt[1]){ 
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop+(calibration) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-calibration/2 ) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            //selected quad == 3
                            else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] > cabbit.startPt[1]){ 
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop+(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-calibration/2 ) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            //selected quad == 4
                            else { 
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop+(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop+(calibration/4)) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }  
                        }
                        else if(cabbit.currQuad == 4){  
                            //QUAD 1
                            if(cabbit.endPt[0] > cabbit.startPt[0] && cabbit.endPt[1] < cabbit.startPt[1]){ 
                                
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop+(calibration/2) + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop+calibration/2) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            //selected quad == 2, pivot
                            else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] < cabbit.startPt[1]){ 
                                 
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop+calibration/4) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            //selected quad == 3
                            else if(cabbit.endPt[0] < cabbit.startPt[0] && cabbit.endPt[1] > cabbit.startPt[1]){ 
                                
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop+calibration/4 ) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }
                            //selected quad == 4
                            else {
                                offsetTop = $('#' + cabbit.currIndex)[0].offsetTop  + 'px' 
                                cabbit.startPt[1] = ($('#startPoint')[0].offsetTop+(calibration/4)) // MINUS CALIBRATION
                                for(let j=0; j<cabbit.count-1; j++){
                                    points[j].remove()
                                } 
                            }  
                        }
                    }
                    
                    $(itemClass).css('top', offsetTop);

                    //MAKE SURE TO ADD THIS TO EVERY CASE
                    //cabbit.startPt[1] = ($('#startPoint')[0].offsetTop-calibration)


                    cabbit.count = count
                    cabbit.moveCharacter() 

                } 

                else {  
                    cabbit.moveCharacter() 
                }
                    
                  
            })  
    }  
}
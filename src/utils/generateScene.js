import {generateBackground} from './generateBG.js'  
import {generateCharacter} from './generateCharacter.js'  
import {updateLocation} from './utils.js'


export function generateScene(sceneNum, win){ 

    let screenPercent
    let sceneComplete = false   

    let charPosition = {
        cabbit : [800, 400]
    }  
    
    let prevExit

    switch(sceneNum){  
        case 0:
            screenPercent = 75
            generateBackground(0, screenPercent)   
            setTimeout(() => { 
                generateScene(1, win)  
            }, 100) 
            return
        case 1: 
            //scene 11 
            screenPercent = 90
            generateBackground(1, screenPercent)  
            generateCharacter(
                'cabbit', 
                charPosition, 
                win, 
                screenPercent-30 
            ) 

           // document.getElementById('cabbitPositionX').innerText = charPosition.cabbit[0]
           // document.getElementById('cabbitPositionY').innerText = charPosition.cabbit[1]
 
           /* setInterval(()=>{
                charPosition.cabbit[0] = eval(document.getElementById('cabbitPositionX').innerText)  
                charPosition.cabbit[1] = eval(document.getElementById('cabbitPositionY').innerText) 
                console.log(charPosition.cabbit)
                //if the x coordinates is less than 300, then set prevExit to left, generateScene 2
                //if x coordinates is greater than 1400, then set prevExit to right, generate scene 3

            }, 66.667) */


            return 

    } 
}
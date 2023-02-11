import {generateBackground} from './generateBG.js'
import {generateCharacter} from './generateCharacter.js'
import {thisClick} from './utils.js'  

export function generateScene(sceneNum, win){ 

    let screenPercent
    let sceneComplete = false   
    let charPosition = {
        cabbit : [700, 400]
    } 

    switch(sceneNum){  
        case 0:
            screenPercent = 75
            generateBackground(0, screenPercent)   
            setTimeout(() => { 
                generateScene(1, win)  
            }, 5000) 
            return
        case 1: 
            //scene 11
            screenPercent = 75 
            generateBackground(1, screenPercent) 
            generateCharacter('cabbit', charPosition, win, screenPercent)
            return 

    } 
}
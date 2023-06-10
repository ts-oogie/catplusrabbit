import {generateBackground, generateForeground} from './generateBG.js'  
import {generateCharacter} from './generateCharacter.js' 
import {generateZone} from './generateZone.js'

export function generateScene(sceneNum, win){ 

    let screenPercent
    let sceneComplete = false   

    let charPosition = {
        cabbit : [700, 400]
    } 

    document.getElementsByTagName('body')[0].addEventListener('click', (e)=>{

    })  

    switch(sceneNum){  
        case 0:
            screenPercent = 75
            generateBackground(0, screenPercent)   
            setTimeout(() => { 
                generateScene(1, win)  
            }, 3000) 
            return
        case 1: 
            //scene 11
            screenPercent = 75
            generateBackground(1, screenPercent)  
            generateCharacter('cabbit', charPosition, win, screenPercent-5)
            generateZone()
            

            return 

    } 
}
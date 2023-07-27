import {cabbitGifs} from './gifs.js'
import {characterObject} from './character.js'
import {setCharSize} from './utils.js'

export function generateCharacter(name, charPosition, win, screenPercent, currIndex){ 

    let charSize = setCharSize(win.width, screenPercent)
    let frameDistance = win.width*(screenPercent/100)*.004339622//(win.width*.002604166666667)//(screenPercent/100)  

    switch(name){

        case 'cabbit':

            //When character is generated... it is watching the body listening to any clicks
            //when body is clicked, the cabbit.endPts are set
            //it analyzes the currQuad and endQuad, clears old path points, and sets startpoint (which is the start of the stop walking cycle - yes its a confusing name)

            let cabbitGIFs = cabbitGifs('cabbit', charSize[0], charSize[1])
            let cabbit = new characterObject(charPosition.cabbit, [], frameDistance, cabbitGIFs, charSize[0], charSize[1], name, currIndex) 
    
            return cabbit

           
    }  
}
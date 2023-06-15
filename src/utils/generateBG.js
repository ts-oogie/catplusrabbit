//import {fgGif} from './gifs.js' 
import '../assets/bg/11-small.jpg'
import '../assets/bg/braveNotice.gif'
import '../assets/bg/fgFrame.gif'

export function generateBackground(scene, size){ 
    const thisSize = size + '%'
    
    let thisBG = document.getElementById('bgMain') 
    let thisFG = document.getElementById('fgMain')

    if(scene == 0){  
        thisBG.style.backgroundImage = "url(braveNotice.gif)"
        thisBG.style.backgroundPosition = "center center"
        thisBG.style.backgroundSize = thisSize
        thisBG.style.zIndex = "-10" 
    }
     
    else if(scene == 1){ 
        thisBG.style.backgroundImage = "url(11-small.jpg)"
        thisBG.style.backgroundPosition = "center center"
        thisBG.style.backgroundSize = thisSize
        thisBG.style.zIndex = "-10" 

        const fgSize = size + 10 + "%"

        thisFG.style.backgroundImage = "url(fgFrame.gif)"
        thisBG.style.backgroundPosition = "center center"
        thisFG.style.backgroundSize = fgSize
        thisBG.style.zIndex = "0"  
    } 

   
}

 
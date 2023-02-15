import {fgGif} from './gifs.js' 

export function generateBackground(scene, size){ 
    const thisSize = size + '%'
    let thisBG = document.getElementById('bgMain') 

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
    } 
}

export function generateForeground(name, size, win){

    let fgGIF = fgGif(name, win.width, win.height)

    const thisSize = size + '%'
    let thisFG = document.getElementById('fgMain')  
    /*
    thisFG.style.backgroundImage = "url(" + fgGIF + ")"
    thisFG.style.backgroundPosition = "center center"
    thisFG.style.backgroundSize = thisSize
    thisFG.style.zIndex = "10" */

}
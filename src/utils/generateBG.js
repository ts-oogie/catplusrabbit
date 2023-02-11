import smallBG from '../assets/bg/11-small.jpg'

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
export function setCharSize(winWidth, screenPercent, custom){
    let thisArr = []
    let wFactor, hFactor, charWidth, charHeight

        wFactor =  custom || 4.5
        hFactor = 1.3
        charWidth = (winWidth*(screenPercent*.01))/wFactor
        charHeight = charWidth*hFactor
    
    thisArr.push(charWidth)
    thisArr.push(charHeight)

    return thisArr
    
} 

export class win {
    constructor(window){
        this.width = window.innerWidth
        this.height = window.innerHeight 
        this.url = window.location.href
        this.charSize = []
    }
}

export function thisClick(status){
    alert("Clicked")
}


 






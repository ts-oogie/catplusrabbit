
export function generateZone(arr){ 

    arr.forEach((obj) => {
        //console.log("switchScene : " + obj.switch2Scene)
        obj.points.forEach((item) => {
            console.log(item)
        })
    })
    //type : object, area, switchScene
    //trigger : click, character
        //click : on mouse enter of area make mouse active, otherwise make inactive
        //character : if location of character is within zone, then trigger
    //zone :  array of points [ [[],[],[],[]], [[],[],[],[]], [[],[],[],[]] ]
            //for each array, cycle through... 
            //first array is the top left, second array is the top right, third is bottom right, fourth us bottom left

    //Example : generateZone("switchScene", zone)
        //if character location is within zone(s), then generateScene(1, win)


}
import './styles/spiritAnimal.scss'  
import {generateScene, sceneObject} from './utils/generateScene.js'
import {win} from './utils/utils.js'
import {$,jQuery} from 'jquery';
// export for others scripts to use
window.$ = $;
window.jQuery = jQuery;

let windowInst = new win(window)
let running = true  

//Generate Scene
//let scene = new sceneObject()

generateScene(0, windowInst) 



//while(running == true){
    //if(){}  add event listener to scene.name, if changes, then run generate scene with new scene.name
//}

import './styles/spiritAnimal.scss'  
import {generateScene, sceneObject} from './utils/generateScene.js'
import {win, locale} from './utils/utils.js'
import {$,jQuery} from 'jquery';

// export for others scripts to use
window.$ = $;
window.jQuery = jQuery;

let windowInst = new win(window)
//let running = true  

//alert("HEIGHT : " + window.innerHeight) 

generateScene(0, windowInst)  


 

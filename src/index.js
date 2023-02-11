import './styles/spiritAnimal.scss'  
import {generateScene} from './utils/generateScene.js'
import {win} from './utils/utils.js'

let windowInst=  new win(window)
let running = true 

//Generate Scene
generateScene(0, windowInst) 


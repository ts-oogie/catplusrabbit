export function rotateCharacter(){ 

    let thisEl

    if (this.pathInterrupted == true){
        let itemClass = '.' + 'pathPoint' + this.pathCount 
        thisEl = $(itemClass).eq(0).append("<img width='" + this.width + "' height='" + this.height + "' class='cabbit' />") //add img child with this.height and this.width 
        thisEl[0].classList.add('tempPoint')
        thisEl[0].classList.remove('pathPoint' + this.pathCount)
    } 

    else {
        //hack job 
        thisEl = $('.pathPoint') 
         
        thisEl[0].classList.add('tempPoint')
        thisEl[0].classList.remove('pathPoint') 
    } 
   
    /*
    let rotate0q1 = [this.gif.r0q1x1, this.gif.r0q1x2, this.gif.r0q1x3, this.gif.r0q1x4]
    let rotate0q2 = [this.gif.r0q2x1, this.gif.r0q2x2, this.gif.r0q2x3, this.gif.r0q2x4, this.gif.r0q2x5, this.gif.r0q2x6, this.gif.r0q2x7]
    let rotate0q3 = [this.gif.r0q3x1, this.gif.r0q3x2, this.gif.r0q3x3, this.gif.r0q3x4, this.gif.r0q3x5, this.gif.r0q3x6]
    let rotate0q4 = [this.gif.r0q4x1, this.gif.r0q4x2, this.gif.r0q4x3, this.gif.r0q4x4]*/

    let p = new Promise((resolve, reject) => { 

        if (this.endAngle == 0 && this.currQuad == 1){ 
            thisEl[0].firstChild.src = './cabbit-rotate-0-quad1-1.gif'; 
            //$('.pathPoint').eq(0).html('<img id="tempPt" src=' + gifSrc + 1 + '.gif' + ' style="position : relative; height : 400px; width : 300px; left : -150px; top : -200px;">');

            setTimeout(()=>{ 
                thisEl[0].firstChild.src = './cabbit-rotate-0-quad1-2.gif'; 
            },76); 

            setTimeout(()=>{ 
                thisEl[0].firstChild.src = './cabbit-rotate-0-quad1-3.gif';
         
            },76*2); 

            setTimeout(()=>{ 
                thisEl[0].firstChild.src = './cabbit-rotate-0-quad1-4.gif'; 
                resolve(this); 
            },76*3); 
             
        }

        if(this.endAngle == 0 && this.currQuad == 2){ 
            thisEl[0].firstChild.src = './cabbit-rotate-0-quad2-1.gif';

            //$('.pathPoint').eq(0).html('<img id="tempPt" src=' + gifSrc + 1 + '.gif' + ' style="position : relative; height : 400px; width : 300px; left : -150px; top : -200px;">');

            setTimeout(()=>{ 
                thisEl[0].firstChild.src = './cabbit-rotate-0-quad2-2.gif';

            },76); 

            setTimeout(()=>{ 
                thisEl[0].firstChild.src = './cabbit-rotate-0-quad2-3.gif';
  
            },76*2); 

            setTimeout(()=>{ 
                thisEl[0].firstChild.src = './cabbit-rotate-0-quad2-4.gif';
       
            },76*3); 

            setTimeout(()=>{ 
                thisEl[0].firstChild.src = './cabbit-rotate-0-quad2-5.gif';
            
            },76*4); 

            setTimeout(()=>{ 
                thisEl[0].firstChild.src = './cabbit-rotate-0-quad2-6.gif';
         
                resolve(); 
            },76*5); 

        }

        if (this.endAngle == 0 && this.currQuad == 3){ 
            thisEl[0].firstChild.src = './cabbit-rotate-0-quad3-1.gif';
            //$('.pathPoint').eq(0).html('<img id="tempPt" src=' + gifSrc + 1 + '.gif' + ' style="position : relative; height : 400px; width : 300px; left : -150px; top : -200px;">');

            setTimeout(()=>{ 
                thisEl[0].firstChild.src = './cabbit-rotate-0-quad3-2.gif';
            },76); 

            setTimeout(()=>{ 
                thisEl[0].firstChild.src = './cabbit-rotate-0-quad3-3.gif';
            },76*2); 

            setTimeout(()=>{ 
                thisEl[0].firstChild.src = './cabbit-rotate-0-quad3-4.gif';
            },76*3);

            setTimeout(()=>{ 
                thisEl[0].firstChild.src = './cabbit-rotate-0-quad3-5.gif';
            },76*4); 

            setTimeout(()=>{ 
                thisEl[0].firstChild.src = './cabbit-rotate-0-quad3-6.gif';
                resolve(); 
            },76*5);  

        }

        if (this.endAngle == 0 && this.currQuad == 4){ 
            thisEl[0].firstChild.src = './cabbit-rotate-0-quad4-1.gif';

            //$('.pathPoint').eq(0).html('<img id="tempPt" src=' + gifSrc + 1 + '.gif' + ' style="position : relative; height : 400px; width : 300px; left : -150px; top : -200px;">');

            setTimeout(()=>{ 
                thisEl[0].firstChild.src = './cabbit-rotate-0-quad4-2.gif';
   
            },76); 

            setTimeout(()=>{ 
                thisEl[0].firstChild.src = './cabbit-rotate-0-quad4-3.gif';
   
            },76*2); 

            setTimeout(()=>{ 
                thisEl[0].firstChild.src = './cabbit-rotate-0-quad4-4.gif';
   
                resolve(this); 
            },76*3); 
        } 

        if (this.endAngle == 38.5 && this.currQuad == 4){ 
            thisEl[0].firstChild.src = './cabbit-rotate-0-quad4-1.gif';

            //$('.pathPoint').eq(0).html('<img id="tempPt" src=' + gifSrc + 1 + '.gif' + ' style="position : relative; height : 400px; width : 300px; left : -150px; top : -200px;">');

            setTimeout(()=>{ 
                thisEl[0].firstChild.src = './cabbit-rotate-0-quad4-2.gif';
   
            },76); 

            setTimeout(()=>{ 
                thisEl[0].firstChild.src = './cabbit-rotate-0-quad4-3.gif';
   
            },76*2); 

            setTimeout(()=>{ 
                thisEl[0].firstChild.src = './cabbit-rotate-0-quad4-4.gif';
   
                resolve(this); 
            },76*3); 
        } 
        
    });

    return p; 
}
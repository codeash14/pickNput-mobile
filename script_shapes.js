const $reloadBtn = document.querySelector('.reload-btn');
const $box = document.querySelector('.box');
const $rectangle = document.querySelector('.rectangle');
const $allRectangle = document.querySelectorAll('.rectangle');
const $numberOfRectangles = $allRectangle.length - 1;
const $bodyOverlay = document.querySelector('.body-overlay');

let $activeShape = null;
let $score= 0;



$reloadBtn.addEventListener('click', () => {
    location.reload();
});


const chooseShape = (e) =>{
    const parent = e.target.parentElement;
 
    if($activeShape === null){
        if(parent.childElementCount > 0 && parent.firstElementChild.classList.contains('circle') || parent.firstElementChild.classList.contains('square') || parent.firstElementChild.classList.contains('triangle') || parent.firstElementChild.classList.contains('rect')){
                parent.firstElementChild.classList.toggle('shape-active');
                $activeShape = parent.firstElementChild;
                if($activeShape.classList.contains('shape-error')){
                    $activeShape.classList.remove('shape-error');
                }

         }else if(e.target.classList.contains('rectangle') && e.target.childElementCount >0){
            e.target.firstElementChild.classList.toggle('shape-active');
            $activeShape = e.target.firstElementChild;
            
         }

    }else {
        moveShapeToSelectedRectangle(e);
    }
    
}

const moveShapeToSelectedRectangle = (e) =>{
    target = e.target;
    if (target === $activeShape || target === $activeShape.parentElement.children[1] || target === $activeShape.parentElement.children[2] || target === $activeShape.parentElement.children[3]){
        $activeShape.classList.remove('shape-active');
        $activeShape=null;
    }

    if (target.classList.contains('rectangle') && target.childElementCount < 4 && $activeShape !== null){

            if(target.children.length === 0 || target.children[0].title === $activeShape.title){
                const el = document.createElement('div')

                el.setAttribute('title', $activeShape.title);
                el.setAttribute('class', $activeShape.classList);
                el.classList.remove('shape-active');

                target.prepend(el);
                $activeShape.remove();
            }else {
                $activeShape.classList.add('shape-error');
                $activeShape.classList.remove('shape-active');
            }
            $activeShape=null;

        }else if(target.parentElement.classList.contains('rectangle') && target.parentElement.childElementCount < 4){
            if (target.parentElement.children.length === 0 || target.parentElement.children[0].title === $activeShape.title){
                const el = document.createElement('div')

                el.setAttribute('title', $activeShape.title);
                el.setAttribute('class', $activeShape.classList);
                el.classList.remove('shape-active');

                target.parentElement.prepend(el);
                $activeShape.remove();
            } else {
                $activeShape.classList.add('shape-error');
                $activeShape.classList.remove('shape-active');
            }
            $activeShape = null;
        }
}

const checkingSortShapes = () => {
    const countParents = $allRectangle.length;
    const colorOfRectangles = [];

    
    for (let i = 0; i < countParents; i++) {
        const element = $allRectangle[i]
        if(element.childElementCount === 4){
            const titleShape = element.children[1].title;

            if (titleShape === element.firstElementChild.title && titleShape === element.lastElementChild.title){
                $score++;
                colorOfRectangles.push(titleShape);
            }
        }
        if(colorOfRectangles.length === $numberOfRectangles){
            $bodyOverlay.style.display = "flex";
        }
    }
}


$box.addEventListener('click', e =>{
    chooseShape(e)
    checkingSortShapes();
});




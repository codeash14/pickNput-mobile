const $reloadBtn = document.querySelector('.reload-btn');
const $box = document.querySelector('.box');
const $rectangle = document.querySelector('.rectangle');
const $allRectangle = document.querySelectorAll('.rectangle');
const $numberOfRectangles = $allRectangle.length - 1;
const $bodyOverlay = document.querySelector('.body-overlay');

let $activeWaste = null;
let $score= 0;



$reloadBtn.addEventListener('click', () => {
    location.reload();
});


const chooseWaste = (e) =>{
    const parent = e.target.parentElement;
 
    if($activeWaste === null){
        if(parent.childElementCount > 0 && parent.firstElementChild.classList.contains('leaves') || parent.firstElementChild.classList.contains('poop') || parent.firstElementChild.classList.contains('banana') || parent.firstElementChild.classList.contains('can') || parent.firstElementChild.classList.contains('waste') || parent.firstElementChild.classList.contains('wrapper')){
                parent.firstElementChild.classList.toggle('waste-active');
                $activeWaste = parent.firstElementChild;
                if($activeWaste.classList.contains('waste-error')){
                    $activeWaste.classList.remove('waste-error');
                }

         }else if(e.target.classList.contains('rectangle') && e.target.childElementCount >0){
            e.target.firstElementChild.classList.toggle('waste-active');
            $activeWaste = e.target.firstElementChild;
            
         }

    }else {
        moveWasteToSelectedRectangle(e);
    }
    
}

const moveWasteToSelectedRectangle = (e) =>{
    target = e.target;
    if (target === $activeWaste || target === $activeWaste.parentElement.children[1] || target === $activeWaste.parentElement.children[2] || target === $activeWaste.parentElement.children[3]){
        $activeWaste.classList.remove('waste-active');
        $activeWaste=null;
    }

    if (target.classList.contains('rectangle') && target.childElementCount < 3 && $activeWaste !== null){

            if(target.children.length === 0 || target.children[0].title === $activeWaste.title){
                const el = document.createElement('div')

                el.setAttribute('title', $activeWaste.title);
                el.setAttribute('class', $activeWaste.classList);
                el.classList.remove('waste-active');

                target.prepend(el);
                $activeWaste.remove();
            }else {
                $activeWaste.classList.add('waste-error');
                $activeWaste.classList.remove('waste-active');
            }
            $activeWaste=null;

        }else if(target.parentElement.classList.contains('rectangle') && target.parentElement.childElementCount < 3){
            if (target.parentElement.children.length === 0 || target.parentElement.children[0].title === $activeWaste.title){
                const el = document.createElement('div')

                el.setAttribute('title', $activeWaste.title);
                el.setAttribute('class', $activeWaste.classList);
                el.classList.remove('waste-active');

                target.parentElement.prepend(el);
                $activeWaste.remove();
            } else {
                $activeWaste.classList.add('waste-error');
                $activeWaste.classList.remove('waste-active');
            }
            $activeWaste = null;
        }
}

const checkingSortWastes = () => {
    const countParents = $allRectangle.length;
    const colorOfRectangles = [];

    
    for (let i = 0; i < countParents; i++) {
        const element = $allRectangle[i]
        if(element.childElementCount === 3){
            const titleWaste = element.children[1].title;

            if (titleWaste === element.firstElementChild.title && titleWaste === element.lastElementChild.title){
                $score++;
                colorOfRectangles.push(titleWaste);
            }
        }
        if(colorOfRectangles.length === $numberOfRectangles){
            $bodyOverlay.style.display = "flex";
        }
    }
}


$box.addEventListener('click', e =>{
    chooseWaste(e)
    checkingSortWastes();
});




const $reloadBtn = document.querySelector('.reload-btn');
const $box = document.querySelector('.box');
const $rectangle = document.querySelector('.rectangle');
const $allRectangle = document.querySelectorAll('.rectangle');
const $numberOfRectangles = $allRectangle.length - 1;
const $bodyOverlay = document.querySelector('.body-overlay');


let $activeWaste = null;
let $scorebd= 3;
let $scorenbd=3;


$reloadBtn.addEventListener('click', () => {
    location.reload();
});


const chooseWaste = (e) =>{
    
    if($activeWaste === null && (e.target.title==='biodegradable' || e.target.title==='nonbiodegradable')){
                e.target.classList.toggle('waste-active');

                $activeWaste = e.target;  
    }else {
        moveWasteToSelectedRectangle(e);
    }
    
}

const moveWasteToSelectedRectangle = (e) =>{
    target = e.target;

    if(target.classList.contains('rectangle') && target.classList.contains('rect-color-bd')){
        if($activeWaste.title==='biodegradable'){

                const el = document.createElement('div')

                el.setAttribute('title', $activeWaste.title);
                el.setAttribute('class', $activeWaste.classList);
                $activeWaste.classList.remove('waste-error');
                $scorebd--;
                target.prepend(el);
                $activeWaste.remove();
            }else {
                $activeWaste.classList.add('waste-error');
                $activeWaste.classList.remove('waste-active');
            }
            $activeWaste=null;
    }
    else if(target.classList.contains('rectangle') && target.classList.contains('rect-color-nbd')){
        if($activeWaste.title==='nonbiodegradable'){

                const el = document.createElement('div')

                el.setAttribute('title', $activeWaste.title);
                el.setAttribute('class', $activeWaste.classList);
                $activeWaste.classList.remove('waste-error');
                $scorenbd--;
                target.prepend(el);
                $activeWaste.remove();
            }else {
                $activeWaste.classList.add('waste-error');
                $activeWaste.classList.remove('waste-active');
            }
            $activeWaste=null;
    }else {
                $activeWaste.classList.add('waste-error');
                $activeWaste.classList.remove('waste-active');
            }


}

const checkingSortWastes = () => {
        if($scorenbd === 0 && $scorebd===0){
            $bodyOverlay.style.display = "flex";
        }
    }



$box.addEventListener('click', e =>{
    chooseWaste(e)
    checkingSortWastes();
});




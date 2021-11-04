import { gsap } from "gsap";

/**
* Function for Dropdown and Select. For full docs see link.
* @see https://wiki.bsgdigital.com/ru/developer/dropdown-js
*/
export default ()=>{

    const selectArray = document.querySelectorAll('[data-select]');

    const SHOW_ELEMENTS = 2;
    if(selectArray.length == 0) {return}

    selectArray.forEach(select => {
        selectHandle(select);
    })

    function selectHandle(select){
        const selectList = select.querySelector('[data-select-list]');
        const title = select.querySelector('[data-select-name]');
        const currentTitle = title.querySelector('span');
        const selectListEl = selectList.querySelectorAll('[data-select-item]');
        let maxHeight = 0;

        selectListEl.forEach((element, index) => {
            //set max height to open list
            if(index <= (SHOW_ELEMENTS - 1)){
                maxHeight += element.offsetHeight;
            }
            //click to list element
            element.addEventListener('click', (event)=>{
                setTitle(event.target);
                callbackFunction(event.target, element);
                hideFilter();
            })
        });
        //set initial styles to select element
        gsap.set(selectList, {
            height: 0,
            overflow: maxHeight>0?'auto': 'hidden'
        })

        title.addEventListener('click', ()=>{
            select.classList.contains('is-active')?hideFilter():showFilter();
        })

        document.addEventListener("click", toggleDropdown);

        //closes dropdown when click outside
        function toggleDropdown(event) {
            if (select.contains(event.target)) return;
            hideFilter();
        }

        function showFilter(){

            gsap.to(selectList,{
                height: maxHeight>0?maxHeight: 'auto',
                onStart: ()=>{
                    select.classList.add('is-active')
                }
            })
        }

        function hideFilter(){
            gsap.to(selectList,{
                height: 0,
                onComplete: ()=>{
                    select.classList.remove('is-active')
                }
            })
        }

        //set Title from active element
        function setTitle(el){
            currentTitle.innerHTML = el.closest('[data-select-item]').querySelector('span').innerHTML
        }

        //If you need to add some functions after select item, please add here your code
        function callbackFunction(option,element){
        }
    }
}

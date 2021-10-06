import { gsap } from "gsap";

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
            if(index <= (SHOW_ELEMENTS - 1)){
                maxHeight += element.offsetHeight;
            }
            element.addEventListener('click', (event)=>{
                setTitle(event.target);
                callbackFunction(event.target, element);
                hideFilter();
            })
        });

        gsap.set(selectList, {
            height: 0,
            overflow: maxHeight>0?'auto': 'hidden'
        })

        title.addEventListener('click', ()=>{
            select.classList.contains('is-active')?hideFilter():showFilter();
        })

        document.addEventListener("click", toggleDropdown);

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

        function setTitle(el){
            currentTitle.innerHTML = el.closest('[data-select-item]').querySelector('span').innerHTML
        }

        function callbackFunction(option,element){
            console.log(element, option)
        }
    }
}
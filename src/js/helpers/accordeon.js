import { gsap } from "gsap";

export default () =>{

    const accordeonArray = document.querySelectorAll('[data-accordeon-element]');
    if (accordeonArray.length == 0){ return}

    accordeonArray.forEach(element => {
        const button = element.querySelector('[data-accordeon-button]');
        const content = element.querySelector('[data-accordeon-content]');
        
        gsap.set(content, {
            height: 0
        })

        button.addEventListener('click', ()=>{
            element.classList.contains('is-open')?close(element, content):open(element, content)
        })
    })

    function open(element, content){
        gsap.to(content, {
            height: 'auto',
            onStart: ()=>{
                element.classList.add('is-open');
                //closeOther(element); 
                //Turn this on, when you need to close other opened accordeons
            }
        })
    }

    function close(element, content){
        gsap.to(content, {
            height: 0,
            onStart: ()=>{
                element.classList.remove('is-open')
            }
        })
    }
    
    function closeOther(current){
        accordeonArray.forEach(element => {
            const content = element.querySelector('[data-accordeon-content]');
            element != current? close(element, content): false 
        })
    }
}
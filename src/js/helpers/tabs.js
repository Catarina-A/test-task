/**
* Function for Tabs - add and removes active buttons and contents classes, content tabs should be absolute. For full docs see link.
* @param { string } butons - Buttons that select tabs
* @param { string } tabs - Tabs
* @param { string } wrapper - Tabs parent wrapper (need to set the height of biggest tab, optional) 
* @see https://wiki.bsgdigital.com/ru/developer/tabs
*/

export function tabSimple(buttons, tabs, wrapper){
    const tabButtons = document.querySelectorAll(buttons);
    const tabContent = document.querySelectorAll(tabs);
    const tabContentWrapper = document.querySelector(wrapper);

    let containerHeight = 0;

    tabButtons.length > 0 && tabContent.length > 0 ? tabHandle():false;

    function tabHandle(){
        
        tabContentWrapper? setWrapperHeight():false;

        setActiveAnchor(tabButtons[0].dataset.tabActive);

        tabButtons.forEach(button =>{
            button.addEventListener('click', ()=>{
                const activeTab = button.dataset.tabActive;
                setActiveAnchor(activeTab);
            })
        })

        function setWrapperHeight() {
            tabContent.forEach(content =>{
                content.scrollHeight> containerHeight? containerHeight = content.scrollHeight: false
                tabContent[0].classList.add('is-active');
            })
            tabContentWrapper.style.height = containerHeight + 'px';
        }
        
        function setActiveAnchor(anchor){
            tabButtons.forEach(but =>{
                but.classList.remove('is-active')
            })
            tabContent.forEach((tab, ind) =>{
                const tabName = tab.dataset.tabName;
                if(tabName == anchor){
                    tab.classList.add('is-active');
                    tabButtons[ind].classList.add('is-active');
                } else {
                    tab.classList.remove('is-active');
                }
            })
        }
    }
}

import { gsap } from "gsap";
export function tabAnimations(buttons, contents, wrapper){
    const tabButtons = document.querySelectorAll(buttons);
    const tabContent = document.querySelectorAll(contents);
    const tabContentWrapper = document.querySelector(wrapper);

    let containerHeight = 0;

    tabButtons.length > 0 && tabContent.length > 0 ? tabHandle():false;

    function tabHandle(){

        tabContentWrapper? setWrapperHeight():false;

        setActiveAnchor(tabButtons[0].dataset.tabActive);
        
        tabButtons.forEach(button =>{
            button.addEventListener('click', ()=>{
                const activeTab = button.dataset.tabActive;
                setActiveAnchor(activeTab);
            })
        })

        function setWrapperHeight() {
            tabContent.forEach(content =>{
                content.scrollHeight> containerHeight? containerHeight = content.scrollHeight: false
                tabContent[0].classList.add('is-active');
            })
            tabContentWrapper.style.height = containerHeight + 'px';
        }
        
        function setActiveAnchor(anchor){
            tabButtons.forEach(but =>{
                but.classList.remove('is-active')
            })
            tabContent.forEach((tab, ind) =>{
                const tabName = tab.dataset.tabName;
                if(tabName == anchor){
                    gsap.to(tab, {
                        y: 0,
                        opacity: 1,
                        onStart: ()=> {
                            tab.classList.add('is-active');
                            tabButtons[ind].classList.add('is-active')
                        }
                    })
                    
                } else {
                    gsap.to(tab, {
                        y: 50,
                        opacity: 0,
                        onComplete: ()=> tab.classList.remove('is-active')
                    })
                }
            })
        }
    }
}
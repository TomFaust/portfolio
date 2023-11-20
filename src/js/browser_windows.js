export function browserSwitch(windowName){
    let root = document.getElementById(windowName);
    if(root){

        let select = root.getElementsByClassName('address_select')[0];
        let slides = root.querySelectorAll('.browser_screen');

        if(select && slides){

            slides.forEach(slide => {
                let option = document.createElement('option');
                option.value = slide.dataset.subject;
                option.innerText = slide.dataset.url;
                
                select.appendChild(option);

                slide.addEventListener('click',function(){
                    window.open(slide.dataset.url)
                })
            });

            select.addEventListener('change',(e)=>{
                let tagret = e.target;

                console.log(slides);

                slides.forEach(slide => {
                    if(slide.dataset.subject === e.target.value){
                        slide.classList.remove('d-none');
                    }else{
                        slide.classList.add('d-none');
                    }
                })
                
            })

        }
    }
}

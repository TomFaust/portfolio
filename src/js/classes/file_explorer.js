export class FileExplorer{

    constructor(root){
        
        let icons = root.querySelectorAll('.clickableIcon');
        let panels = root.querySelectorAll('.folderPanel');
        let select = root.querySelector('.address_select');
        
        if(icons && panels){
            let option = document.createElement('option');
                option.innerText = "C:/portfolio/past_work/";
                option.value = "main";
                select.appendChild(option);

            icons.forEach(icon =>{

                let option = document.createElement('option');
                option.innerText = "C:/portfolio/past_work/" + icon.dataset.panel;
                option.value = icon.dataset.panel;

                select.appendChild(option);

                icon.addEventListener('click',(e)=>{

                    panels.forEach(panel => {
                        if(panel.dataset.subject === icon.dataset.panel){
                            select.value = icon.dataset.panel;
                            panel.classList.remove('d-none');
                        }else{
                            panel.classList.add('d-none');
                        }
                    })

                },true);
            })

            select.value = "main"
        }
    
    }
}

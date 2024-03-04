export class FileExplorer{

    constructor(root){
        
        let icons = root.querySelectorAll('.mainIcon');
        let panels = root.querySelectorAll('.folderPanel');
        
        if(icons && panels){
            icons.forEach(icon =>{
                icon.addEventListener('click',(e)=>{

                    panels.forEach(panel => {
                        if(panel.dataset.subject === icon.dataset.panel){
                            panel.classList.remove('d-none');
                        }else{
                            panel.classList.add('d-none');
                        }
                    })

                },true);
            })
        }
    
    }
}

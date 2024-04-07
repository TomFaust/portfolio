export class InteractiveTable{

    constructor(container){
        document.querySelectorAll('table.interactive').forEach(element => {
            element.addEventListener('click', (event) => {
              const row = event.target.closest('tr')
              if (row) {
                row.classList.toggle('highlighted');
              }
            })
        });
    }

}
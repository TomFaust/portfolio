import List from 'list.js';

export class Search{

    lists = []
    searchInput = null;

    constructor(lists = [], options = [],searchInput){

        this.searchInput = document.querySelector(searchInput);

        lists.forEach((list) =>{
            
            this.lists.push(new List(list,options))
        })

        this.searchInput.addEventListener('input',(e) =>{
            this.searchLists(e.target.value)
        })

    }

    searchLists(searchValue){
        this.lists.forEach((list) =>{
            list.search(searchValue)
        })
    }

}
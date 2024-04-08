export class DoubletapHandler{

    constructor(element, tapFunction){
        element.addEventListener("touchstart", (e) => {this.tapHandler(e,tapFunction)});
    }

    tapHandler(event,tapFunction) {
        if(!this.tapedTwice) {
            this.tapedTwice = true;
            setTimeout( () => { this.tapedTwice = false; }, 300 );
            return false;
        }
        event.preventDefault();
        tapFunction();
    }

}
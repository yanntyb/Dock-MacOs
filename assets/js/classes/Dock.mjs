import {Item} from "./Item.mjs";

class Dock{
    constructor(){
        this.item = [];
        this.numberOfItem = 0;
        this.parent = document.body;
        this.div = document.createElement("div");
        this.createDom();
    }

    createDom(){
        this.parent.appendChild(this.div);
        this.div.id = "dock";
    }

    addItem(src){
        this.item[this.numberOfItem] = new Item(this.div,src);
        this.setEvent();
    }

    setEvent(){
        this.removeEvent();
        for(let item of this.item){
            item.image.addEventListener("mouseenter", this.eventEnter);
            item.image.addEventListener("mouseleave", this.eventLeave)
        }
    }

    removeEvent(){
        for(let item of this.item){
            item.image.removeEventListener("mouseover",this.eventEnter);
            item.image.removeEventListener("mouseover",this.eventLeave);
        }
    }

    eventEnter(){
        this.style.transform = "translate(0,-30%)";
    }

    eventLeave(){
        this.style.transform = "translate(0,0)";
    }



}

export {Dock};
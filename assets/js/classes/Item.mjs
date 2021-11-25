class Item{
    constructor(parent,src){
        this.parent = parent;
        this.src = src;
        this.image = document.createElement("img");
        this.createDom();
    }

    createDom(){
        this.parent.appendChild(this.image);
        this.image.classList.add("item");
        this.image.setAttribute("src",this.src);
    }

}

export {Item};
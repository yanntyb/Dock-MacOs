class Item{
    constructor(parent,href,index,first,imageLink){
        this.parent = parent;
        this.href = href;
        this.id = index;
        this.imageLink = imageLink;
        this.image = document.createElement("a");
        this.createDom();
    }


    createDom(){

        this.parent.appendChild(this.image);
        this.image.classList.add("item");
        this.image.setAttribute("href",this.href);
        this.image.setAttribute("target","blank");
        this.image.dataset.id = this.id;
        this.image.style.backgroundImage = `url(${this.imageLink})`;
        const witdh = getComputedStyle(this.image).width;
        this.image.style.height = witdh;

    }

}

export {Item};
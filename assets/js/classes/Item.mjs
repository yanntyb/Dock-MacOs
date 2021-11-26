class Item{
    constructor(parent,href,index,first,imageLink,save){
        this.parent = parent;
        this.href = href;
        this.id = index;
        this.imageLink = imageLink;
        this.save = save;
        this.image = document.createElement("a");
        this.createDom();
        this.saveToLocalStorage();
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

    saveToLocalStorage(){
        if(this.save){
            console.log(this.save);
            let currentLocal = JSON.parse(localStorage.getItem("items")) || [];
            currentLocal[this.id] = {
                "href": this.href,
                "id": this.id,
                "imglink": this.imageLink
            };
            localStorage.setItem("items",JSON.stringify(currentLocal));
        }

    }
}

export {Item};
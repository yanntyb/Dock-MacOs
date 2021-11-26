import {Item} from "./Item.mjs";

class Dock{
    constructor(){
        this.item = [];
        this.numberOfItem = 0;
        this.parent = document.body;
        this.moveLeft = this.parent.querySelector("#left");
        this.moveTop = this.parent.querySelector("#top");
        this.moveBottom = this.parent.querySelector("#bottom");
        this.moveRight = this.parent.querySelector("#right");
        this.div = document.createElement("div");
        this.__init__();


    }

    /**
     * create element in DOM
     */
    createDom(){
        this.parent.appendChild(this.div);
        this.div.id = "dock";
        this.div.dataset.side = "false";

    }

    /**
     * Attache event to middle window's arrows to move the Dock
     */
    addEventMove(){
        const witdh = getComputedStyle(this.div.querySelector("a")).width;
        this.moveLeft.addEventListener("click", () => {
            this.changeCss("true","column","flex-start","flex-end","5%","0%","100%")
            for(let item of this.item){
                item.image.style.width = witdh;
            }

        });
        this.moveBottom.addEventListener("click", () => {
            this.changeCss("false","row","center","flex-end","0%","5%","5%")

        });
        this.moveRight.addEventListener("click", () => {
            this.changeCss("true","column","flex-end","flex-end","0%","0%","100%","5%")
            for(let item of this.item){
                item.image.style.width = witdh;
            }

        })
        this.moveTop.addEventListener("click", () => {
            this.changeCss("false","row","center","flex-start","0%","5%","5%")

        })
    }

    /**
     * Add an item to the Dock
     * @param src
     * @param first
     * @param imageLink
     * @param saveToLocalStorage
     */
    addItem(src,first,imageLink,saveToLocalStorage = false){
        const item = new Item(this.div,src,this.numberOfItem,first,imageLink,saveToLocalStorage)
        this.item.push(item);
        if(first){
            item.image.addEventListener("click", (e) => {
                e.preventDefault();
                this.createModal();
            })
        }
        this.numberOfItem++;
        this.setEvent();
    }

    /**
     * Reset animation events
     */
    setEvent(){
        this.removeEvent();
        for(let item of this.item){
            item.image.addEventListener("mouseenter", this.eventEnter);
            item.image.addEventListener("mouseleave", this.eventLeave)
        }
    }

    /**
     * Remove animation event
     */
    removeEvent(){
        for(let item of this.item){
            item.image.removeEventListener("hover",this.eventEnter);
            item.image.removeEventListener("mouseleave",this.eventLeave);
        }
    }

    /**
     * Animation on item hover
     */
    eventEnter(){
        this.style.transform = "scale(2,2)";
        this.style.zIndex = "10";
        const child = this.parentNode.childNodes;
        let indexGauche = 0;
        for(let i = indexGauche; i < child.length; i++){
            child[i].style.transform = "scale(1,1)";
            if(this.parentNode.dataset.side === "true"){
                child[i].style.marginTop = "0%";
            }
            else{
                child[i].style.marginRight = "0.5%";
            }

        }
        for(let i = this.dataset.id; i < child.length; i++){

            if(indexGauche === 4){
                break;
            }
            const translate = 1.2*(Math.exp((-1/5)*(1.5*indexGauche**2))) + 1;
            child[i].style.transform = `scale(${translate},${translate})`
            if(this.parentNode.dataset.side === "true"){
                child[i].style.marginBottom = translate + "%";
            }
            else{
                child[i].style.marginRight = translate + "%";
            }

            indexGauche++;
        }

        let indexDroite = 0;
        for(let i = indexDroite; i > 0; i--){
            child[i].style.transform = "scale(1,1)";
        }
        for(let i = this.dataset.id; i >= 0; i--){
            if(indexDroite === 4){
                break;
            }
            const translate = 1.2*(Math.exp((-1/5)*(1.5*Math.abs(indexDroite)**2))) + 1;
            child[i].style.transform = `scale(${translate},${translate})`;
            if(this.parentNode.dataset.side === "true"){
                child[i].style.marginBottom = translate + "%";
            }
            else{
                child[i].style.marginLeft = translate + "%";
            }
            indexDroite++;
        }

    }

    /**
     * Reset position and scale
     */
    eventLeave(){
        const child = this.parentNode.childNodes;
        for(let i = 0; i < child.length; i++){
            child[i].style.transform = "scale(1,1)";
            if(this.parentNode.dataset.side === "true"){
                child[i].style.marginBottom = "0";
                child[i].style.marginTop = "0";
            }
            else{
                child[i].style.marginRight = "0.5%";
                child[i].style.marginLeft = "0";
            }


            child[i].style.zIndex = "1";
        }
    }

    /**
     * Create add item modal windows
     */
    createModal(){
        this.removeModal();
        this.modal = document.createElement("div");
        this.parent.appendChild(this.modal);
        this.modal.id = "modal";
        this.modal.innerHTML = 
            `
            <div>
                <i id="close" class="far fa-times-circle"></i>
                <h1>Ajouter un item</h1>
                <input id="link" type="text" placeholder="Lien">
                <input id="image" type="text" placeholder="Lien de l'image">
                
                <input type="submit" value="Ajouter">
            </div>
            `;
        const submit = this.modal.querySelector("input[type=submit]");
        let value = this.modal.querySelector("#link");
        let imageLink = this.modal.querySelector("#image")
        submit.addEventListener("click",() => {
            if(value.value !== "" && imageLink.value !== ""){

                this.addItem(value.value,false,imageLink.value,true);
                value.value = "";
                imageLink.value = "";
                this.removeModal();
            }
        })

        const close = this.modal.querySelector("#close");
        close.addEventListener("click", ()=> {
            this.removeModal();
        })
    }

    /**
     * Remove add Item modal windows
     */
    removeModal(){
        if(this.parent.querySelector("#modal")){
            this.parent.removeChild(this.parent.querySelector("#modal"));
        }
    }

    /**
     * Function to change css value according to parameter
     * Used when Dock change position
     * @param dataSide
     * @param divFlexDirection
     * @param divAlignItems
     * @param parentAlignItem
     * @param divMarginLeft
     * @param divMargin
     * @param divHeight
     * @param divMarginRight
     */
    changeCss(dataSide,divFlexDirection,divAlignItems,parentAlignItem,divMarginLeft,divMargin,divHeight,divMarginRight = "0%"){
        this.div.dataset.side = dataSide;
        this.parent.style.alignItems = parentAlignItem;
        this.div.style.flexDirection = divFlexDirection;
        this.div.style.alignItems = divAlignItems;
        this.div.style.margin = divMargin;
        this.div.style.marginLeft = divMarginLeft;
        this.div.style.marginRight = divMarginRight;
        this.div.style.height = divHeight;
    }

    /**
     * Init Dock default item
     * @private
     */
    __init__(){
        this.createDom();
        this.addItem("",true,"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAATlBMVEX///8AAADa2trz8/PMzMz7+/vPz8+VlZVsbGxJSUkkJCRxcXEGBgbd3d3u7u45OTm4uLjl5eVfX195eXkaGhpCQkKvr69WVlY7OztUVFS3J5L2AAADPklEQVR4nO2d2XaqQBREaRGZBMQBzf//6L1mWEYZuldAT51j7eck1l6GHmwsouhlJJs0ywtX5Fm6SV73si9jXW7djW25lg60MKu9e2S/kg61JIee35WDdKzFqPNBQedOtXS0ZaiOI4LOHSvpcEsQj/pdiaXjzSdpJg0b/fNGOSnoXCkdcC5rj6Bz2ifGk9fwJB1xHjuvoHM76ZCzmB5mvmikQ86hDhB0TvO83wUZdtIxZ3AOMjxLx5xByGWo+kKMiyDDQu/SrQ0SdK6VDvpnqkBDvTuMVaCh3t0+DWmIDw1piA8NaYgPDWmIDw1piA8NaYgPDWmIDw1piA8NaYgPDWmIDw1piA8NaYgPDWmIDw1piA8NaYgPDWmIDw1piA8NaYgPDWmIDw1piA8NaYgPDWmIDw1piI99Q9Dv48dttVqGKqR/58pusVdsfQUUdXe+hHVZoFJczt14380urIoEn2a4mGntL63Sw6nfIJb4etW08dgDF1v5B71xuRt0Qod1XfyahOrxdkrNHG+D6li/qHbyH8HhhlgLfLfchq4eNfK14u2XGNth/znTS6d4KteZ39pUf8//iT/Z+n9MMdsk2khneDKbKJWO8GTSKJOO8GQys+uZH/JI95beTxFJJ3g6b/Ae2r8O7Y+l9udD+2sa++tS+3uLN9gf2t/jv8HnNPY/awt5kIhObo8/sf+Zt/1zC5NnT83Dgbe988P+o7KsnwFfsX6O/zmodh+N7k1/0Uzdi/E96Ji+n2ZhQO+JWhD797XRkIb40JCG+NCQhvjQkIb40JCG+NCQhvjQkIb40JCG+NCQhvjQkIb40JCG+NCQhvjQkIb40JCG+NCQhvjQkIb40JCG+NCQhvjQkIb40JCG+NCQhvjQkIb40JCG+Ng3tP99/DbQsJUO+mfisI6N4sVVD0sSVpZykY45g48gw7N0zBl0QYaddMwZ1EGGvj4ZaEIuxEY65CxCOnjGK49U4K/XOvn/CDT+7tDhVi5F+HrgHp/LpI9kerBp+sVx6ognDRUv2G5U482aR727ijvqsQE1Vz3X3zHccnvw/6IeVv065r3enf0w6/J3Nfq2VD8NDpBs0iwvXJFn6eaFc8Q/b8ZMsSF2Ac4AAAAASUVORK5CYII=",false);
        this.addItem("https://media.macosicons.com/parse/files/macOSicons/07409fed6f293b972371aa6d10a18c80_low_res_QuickTime_macOS_Big_Sur__V2_.png",false,"https://media.macosicons.com/parse/files/macOSicons/07409fed6f293b972371aa6d10a18c80_low_res_QuickTime_macOS_Big_Sur__V2_.png");
        this.addItem("https://media.macosicons.com/parse/files/macOSicons/41f1ca01496ce366570d1ee0e0383ebf_low_res_BloomRPC.png",false,"https://media.macosicons.com/parse/files/macOSicons/41f1ca01496ce366570d1ee0e0383ebf_low_res_BloomRPC.png");
        this.addItem("https://media.macosicons.com/parse/files/macOSicons/5edf8f739d3ebdac92dd8dd872567604_low_res_Remnote_Redesign_v2.png",false,"https://media.macosicons.com/parse/files/macOSicons/5edf8f739d3ebdac92dd8dd872567604_low_res_Remnote_Redesign_v2.png");
        this.addItem("https://media.macosicons.com/parse/files/macOSicons/e9a24b783e88c7d76f3f243678e2b035_low_res_JetBrains_DataSpell.png",false,"https://media.macosicons.com/parse/files/macOSicons/e9a24b783e88c7d76f3f243678e2b035_low_res_JetBrains_DataSpell.png");
        this.addItem("https://media.macosicons.com/parse/files/macOSicons/771eb344395f38b74f1d140b6c19849d_low_res_Screenflick_3.png",false,"https://media.macosicons.com/parse/files/macOSicons/771eb344395f38b74f1d140b6c19849d_low_res_Screenflick_3.png");
        this.addItem("https://media.macosicons.com/parse/files/macOSicons/90c6cf9c9fad9f93d289ba3ccc46f523_low_res_Blender_Alpha__Alt_.png",false,"https://media.macosicons.com/parse/files/macOSicons/90c6cf9c9fad9f93d289ba3ccc46f523_low_res_Blender_Alpha__Alt_.png");
        this.addItem("https://media.macosicons.com/parse/files/macOSicons/3f1218717f069ca2c293d3e94b2af48d_low_res_Spotify.png",false,"https://media.macosicons.com/parse/files/macOSicons/3f1218717f069ca2c293d3e94b2af48d_low_res_Spotify.png");
        this.addItem("https://media.macosicons.com/parse/files/macOSicons/37579ea544a36cfdf16ca18b69107d47_low_res_QuickTime_Big_Sur.png",false,"https://media.macosicons.com/parse/files/macOSicons/37579ea544a36cfdf16ca18b69107d47_low_res_QuickTime_Big_Sur.png");
        this.addItem("https://media.macosicons.com/parse/files/macOSicons/486fca4912a7d42d5a72b03879c9193c_low_res_Google_Calendar.png",false,"https://media.macosicons.com/parse/files/macOSicons/486fca4912a7d42d5a72b03879c9193c_low_res_Google_Calendar.png");
        this.addItem("https://media.macosicons.com/parse/files/macOSicons/25a2d50b05fd819a4b9d8f277bb2ca2a_low_res_Microsoft_Office_Compact_Folder.png",false,"https://media.macosicons.com/parse/files/macOSicons/25a2d50b05fd819a4b9d8f277bb2ca2a_low_res_Microsoft_Office_Compact_Folder.png");
        this.addItem("https://media.macosicons.com/parse/files/macOSicons/8bb153667a21ea12b3603fdaf55b96a0_low_res_QQ_Music.png",false,"https://media.macosicons.com/parse/files/macOSicons/8bb153667a21ea12b3603fdaf55b96a0_low_res_QQ_Music.png");
        this.addItem("https://media.macosicons.com/parse/files/macOSicons/a8f231aa4e57109979c2124671a0b881_low_res_Files_Alt.png",false,"https://media.macosicons.com/parse/files/macOSicons/a8f231aa4e57109979c2124671a0b881_low_res_Files_Alt.png");
        this.addItem("https://media.macosicons.com/parse/files/macOSicons/8910897a14a609051cf90f2d794ab916_low_res_PyCharm.png",false,"https://media.macosicons.com/parse/files/macOSicons/8910897a14a609051cf90f2d794ab916_low_res_PyCharm.png");
        this.addItem("",false,"https://media.macosicons.com/parse/files/macOSicons/76eb07ab6a18acda402b9c8eff1ff2cb_low_res_VLC.png");
        this.addEventMove();
        let currentLocalStorage = JSON.parse(localStorage.getItem("items")) || [];
        for(let item of Object.keys(currentLocalStorage)){
            if(currentLocalStorage[item] !== null){
                this.addItem(currentLocalStorage[item].href,false,currentLocalStorage[item].imglink,false);
            }
        }
    }
}

export {Dock};
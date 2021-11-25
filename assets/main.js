import "./css/reset.css";
import "./css/component/dock.css";

import {Dock} from "./js/classes/Dock.mjs";

const dock = new Dock();
for(let i = 0 ; i < 10; i++){
    dock.addItem("https://play-lh.googleusercontent.com/PCpXdqvUWfCW1mXhH1Y_98yBpgsWxuTSTofy3NGMo9yBTATDyzVkqU580bfSln50bFU");
}

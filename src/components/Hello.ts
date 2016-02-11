"use strict"

import VueComponent from "vue-class-component";

@VueComponent({
    template: require("./Hello.html")
})
export class Hello {
    data() {
        return {
            msg: "Hello!!!"
        };
    }
}

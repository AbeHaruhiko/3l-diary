export default {
    methods: {
        sayHello: function () {
            alert("hello");
        }
    },
    template: require("./Hello.html"),
    data: function() {
        return {
            msg: "Hello!"
        };
    },
    hoge: function(hogehoge: string): boolean {
        return hoge;
    }
}

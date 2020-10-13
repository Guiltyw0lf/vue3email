const app = Vue.createApp({
    data() {
        return {
            cart: [],
            premium: true
        }
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },

        removeCart(id) {
            this.cart.splice(this.cart.indexOf(), 1)
        }, 

        emptyCart() {
            this.cart.splice(0, this.cart.length);
        }, 
        
    }
})
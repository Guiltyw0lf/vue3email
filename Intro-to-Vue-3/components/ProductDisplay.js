app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        },

        cart: {
            type: Array
        }
    },
    template:
        /*html*/
        `<div class="product-display">
        <div class="product-container">
        <div class="product-image">
          <img v-bind:src="image">
        </div>
        <div class="product-info">
          <h1>{{ title }}</h1>
  
          <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p>
  
          <p>Shipping: {{ shipping }}</p>
          <ul>
            <li v-for="detail in details">{{ detail }}</li>
          </ul>
  
          <div 
            v-for="(variant, index) in variants" 
            :key="variant.id" 
            @mouseover="updateVariant(index)" 
            class="color-circle" 
            :style="{ backgroundColor: variant.color }">
          </div>
          
          <button 
            class="button" 
            :class="{ disabledButton: !inStock }" 
            :disabled="!inStock" 
            v-on:click="addToCart">
            Add to Cart
          </button>

          <button 
          class="button" 
          :class="{ disabledButton: !inStock }" 
          :disabled="!inStock" 
          v-on:click="removeFromCart">
          Remove from Cart
         </button>

         <button 
         class="button" 
         :class="{ disabledButton: !inStock }" 
         :disabled="!inStock" 
         v-on:click="emptyCart">
         Empty Cart
        </button>

         <button 
         class="button" 
         :class="{ disabledButton: !inStock }" 
         :disabled="!inStock" 
         v-on:click="sendEmail">
         Order
        </button>

    <form id="app" class="form">  
        <p><label for="name">Email pro odeslani objednavky</label>
        <input type="text" name="name" id="name" placeholder="example@email.com">
        </p>
        <p>
        <input class="submit" type="submit" value="odeslat">
        </p>
    </form>
        
    <table class="table">
        <tr class="head">
          <th>Name</th>
          <th>Abount </th> 
          <th>Total</th>
        </tr>
        <tr>
          <td>Jill</td>
          <td></td>
          <td>50</td>
        </tr>

    </table>


  
     </div>
      </div>
      

      <review-list v-if="reviews.length" :reviews="reviews"></review-list>
      <review-form @review-submitted="addReview"></review-form>
      </div>`,
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            selectedVariant: 0,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [{
                    id: 2234,
                    color: 'green',
                    image: './assets/images/socks_green.jpg',
                    quantity: 50,
                    price: 149,
                },
                {
                    id: 2235,
                    color: 'blue',
                    image: './assets/images/socks_blue.jpg',
                    quantity: 50,
                    price: 199,
                },
            ],
            reviews: [],


        }

    },


    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id && this.variants[this.selectedVariant].price)
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
        },

        emptyCart() {
            this.$emit('empty-cart', this.variants[this.selectedVariant].id)
        },
        updateVariant(index) {
            this.selectedVariant = index
        },
        addReview(review) {
            this.reviews.push(review)
        },
        sendEmail() {
            let total = 0;
            Object.values(this.cart).forEach(function(product) {
            total += product;
            });
            console.log(total);
            /* alert("vase objednavka byla odeslana");
             axios.post("https://mandrillapp.com/api/1.0/messages/send.json", JSON.stringify({
                 key: "FH5wdRhRxPYJIilzrdl36g",
                 message: {
                     html: "<p>Vazeny zakazniku vase objednavka "+ this.cart.length +" byla dorucena <br> Dekujeme</p>",
                     text: "Toto je testovaci objednavka",
                     subject: "potvrzeni objednavky",
                     from_email: "duch@vanoce.cz",
                     from_name: "Vue Mastery Socks",
                     to: [{
                         email: "info@bitterend.io",
                         name: "Pitomci z bitterendu",
                         type: "to"
                     }],
                     headers: {
                         ReplyTo: "duch@vanoce.cz"
                     },
                     important: false
                 }
             }), {
                 "headers": {
                     "content-type": "application/json",
                 },
             }); */

        },
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }
            return 2.99
        }


    }
})
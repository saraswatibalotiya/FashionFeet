
// import Noty from 'noty'
import { initAdmin } from './admin.js'
// import {function ka naam} from funciton ka path

import moment from 'moment'

// let addtocart = document.querySelectorAll('.add-to-cart')

// function updateCart(product){
//     axios.post('../app/controller/cartController',product).then(res =>{
//         console.log(res)  
//     })


// }


// addtocart.forEach((btn1) => {
//     btn1.addEventListener('click', (e) => {
//         let product = JSON.parse(btn1.dataset.pro)
//         console.log(product)
//         updateCart(product)
        

//     })


// })

const alertMsg = document.querySelector('#success-alert')
const alertMsg = document.querySelector('#alert')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}

initAdmin()



// console.log('Client-side code running');

// const button = document.getElementById('shop');
// button.addEventListener('click', function(e) {
//   console.log('button was clicked');
// })
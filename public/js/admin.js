// const express = require('express')
// const { axios } = require('axios');
import { axios } from 'axios';
// import moment from 'moment'
// import Noty from 'noty'

function initAdmin() {
    const orderTableBody = document.querySelector('#OrderTableBody')//table body
    let orders = [] //empty array for order
    let markup

    //Axios is a Javascript library used to make HTTP requests from node. js or XMLHttpRequests from the browser 
    // it is used gor ajax call
    axios.get('/adminOrders', {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(res => {
        orders = res.data//data is stroed in order
        markup = generateMarkup(orders) // a function is called and order is given to it 
        orderTableBody.innerHTML = markup // render markup in ordertablebodu
    }).catch(err => {
        console.log(err)
    })



    function generateMarkup(orders) {
        //orders jo recieve ho rhi h uskpe map call krrhe h
        //map ek functn h javascript m array k upar call krte h ye uske upar loop krega jo bhi return krega uska arrayb reserve hoga
        return orders.map(order => {
            return `
        <tr>
            <th scope="row" >
                <p>${order._id}</p>
                <div>${renderItems(order.items)}</div> 
            </th>
            <td>${order.customerId.name}</td>
            <td >${order.address}</td>
            
            <td >
                ${order.createdAt}
            </td>
        </tr>
            
            `
        }).join('')//we are calling join here, array h tr ka hum usko join krrhe h
        //same tr k baad next tr aayega then complete markup create hoga
    }

    function renderItems(items) {
        let parsedItems = Object.values(items)//items ko le rhi h aur object.values ko call krrhi h isse items ka array milege
        return parsedItems.map((menuItem) => {
            return ` <p>${menuItem.item.name} - ${menuItem.qty} pcs </p>`
        }).join('')
    }
    // Socket
    // socket.on('orderPlaced', (order) => {
    //     new Noty({
    //         type: 'success',
    //         timeout: 1000,
    //         text: 'New order!',
    //         progressBar: false,
    //     }).show();
    //     orders.unshift(order)
    //     orderTableBody.innerHTML = ''
    //     orderTableBody.innerHTML = generateMarkup(orders)
    // })
}

module.exports = initAdmin;
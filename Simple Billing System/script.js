function generateInputs() {

    const count = Number(document.getElementById("productCount").value);
    const custname=document.getElementById("customerName").value;
    let warning_products = document.getElementById("warning");

    let container = document.getElementById("productsContainer");

    container.innerHTML = "";

    if (custname.length==0 && count==0){
        warning_products.innerHTML="<strong>WARNING :</strong> Number of Products should be greater than 0. <br> Please Enter A Valid Name."
    }
    else{
        if (custname.length>0){
            if (count>0){
                for(let i = 1; i <= count; i++) {

                    container.innerHTML += `
                        <div class="product-box">
                        <h3>Product ${i}</h3>

                        <input type="text" id="name${i}" placeholder="Product Name">

                        <input type="number" id="qty${i}" placeholder="Quantity">

                        <input type="number" id="price${i}" placeholder="Price">
                        </div>
                    `;
                }
            }
            else{
                warning_products.innerHTML="<strong>WARNING :</strong> Number of Products should be greater than 0."
            }
        }
        else{
            warning_products.innerHTML="<strong>WARNING :</strong> Please Enter A Valid Name."
        }
    }
}

function generateBill() {

    const count = Number(document.getElementById("productCount").value);

    let total = 0;
    let itemsHTML = "";

    for(let i = 1; i <= count; i++) {

        const productName = document.getElementById(`name${i}`).value;
        const qty = Number(document.getElementById(`qty${i}`).value);
        const price = Number(document.getElementById(`price${i}`).value);

        const itemTotal = qty * price;

        total += itemTotal;

        itemsHTML += `
            <tr>
                <td>${productName}</td>
                <td>${qty}</td>
                <td>₹${price}</td>
                <td>₹${itemTotal}</td>
            </tr>
        `;
    }

    let discount = 0;

    if(total >= 5000){
        discount = total * 0.20;
    }
    else if(total >= 3000){
        discount = total * 0.10;
    }
    else if(total >= 1000){
        discount = total * 0.05;
    }

    let subtotal = total - discount;

    let gst = subtotal * 0.18;

    let finalBill = subtotal + gst;

    let payment = document.getElementById("paymentMethod").value;

    let paymentMessage = "";

    switch(payment){

        case "Cash":
        paymentMessage = "Please pay at the counter.";
        break;

        case "UPI":
        paymentMessage = "UPI Accepted: billing@upi";
        break;

        case "Card":
        paymentMessage = "Debit/Credit Cards Accepted.";
        break;
    }

    document.getElementById("bill").innerHTML = `
        <h2>Invoice</h2>

        <p><strong>Customer:</strong> ${document.getElementById("customerName").value}</p>

        <table>
            <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
            </tr>

            ${itemsHTML}
        </table>

        <div class="summary">
        <p><strong>Original Total:</strong> ₹${total.toFixed(2)}</p>
        <p><strong>Discount:</strong> ₹${discount.toFixed(2)}</p>
        <p><strong>GST (18%):</strong> ₹${gst.toFixed(2)}</p>
        <p><strong>Final Bill:</strong> ₹${finalBill.toFixed(2)}</p>
        </div>

        <div class="payment">
            <strong>Payment Method:</strong> ${payment}
            <br><br>
            ${paymentMessage}
        </div>
    `;
}

const products=document.getElementById("products");
const generatebill=document.getElementById("generateBill");

products.addEventListener('click',generateInputs);
generatebill.addEventListener('click',generateBill);

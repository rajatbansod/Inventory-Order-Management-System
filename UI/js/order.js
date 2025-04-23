var productPrices = {};

$(function () {
    //Json data by api call for order table
    $.get(productListApiUrl, function (response) {
        productPrices = {}
        if(response) {
            var options = '<option value="">--Select--</option>';
            $.each(response, function(index, product) {
                options += '<option value="'+ product.Product_id +'">'+ product.Name +'</option>';
                productPrices[product.Product_id] = product.Price_per_unit;
            });
            $(".product-box").find("select").empty().html(options);
        }
    });
});

$("#addMoreButton").click(function () {
    var row = $(".product-box").html();
    $(".product-box-extra").append(row);
    $(".product-box-extra .remove-row").last().removeClass('hideit');
    $(".product-box-extra .product-price").last().text('0.0');
    $(".product-box-extra .product-qty").last().val('1');
    $(".product-box-extra .product-total").last().text('0.0');
});

$(document).on("click", ".remove-row", function (){
    $(this).closest('.row').remove();
    calculateValue();
});

$(document).on("input", ".product-price", function () {
    calculateValue();
});


$(document).on("click", ".view-order", function() {
    // const order = response[$(this).data("index")];
    const index = $(this).data("index");
    const order = allOrders[index];

$(function () {
    $.get(orderListApiUrl, function (response) {
        allOrders = response; // ✅ store it globally
        var html = '';
        $.each(response, function (index, order) {
            html += '<tr>';
            html += '<td>' + order.Order_id + '</td>';
            html += '<td>' + order.Customer_name + '</td>';
            html += '<td>' + order.Total + '</td>';
            html += '<td>' + order.datetime + '</td>';
            html += '<td><button class="btn btn-info btn-sm view-order" data-index="' + index + '">View</button></td>';
            html += '</tr>';
        });
        $("table tbody").html(html);
    });
});


    let detailHtml = "<ul>";
    $.each(order.order_details, function(i, item) {
        detailHtml += `<li>${item.product_name} - ${item.quantity} x ${item.price_per_unit} = ${item.total_price}</li>`;
    });
    detailHtml += "</ul>";
    $("#orderDetailsModal .modal-body").html(detailHtml);
    $("#orderDetailsModal").modal("show");
});


$(document).on("change", ".cart-product", function (){
    var product_id = $(this).val();
    var price = productPrices[product_id];
    $(this).closest('.row').find('.product-price').val(price);
    calculateValue();
});

$(document).on("change", ".product-qty", function (e){
    calculateValue();
});


$("#saveUOM").on("click", function() {
    const uom = $("#uom_name").val();
    callApi("POST", "http://127.0.0.1:5000/insertUOM", {
        data: JSON.stringify({ uom_name: uom })
    });
});

html += '<td><button class="btn btn-info btn-sm view-order" data-index="'+index+'">View</button></td>';


$("#saveOrder").on("click", function(){
    var formData = $("form").serializeArray();
    var requestPayload = {
        customer_name: null,
        total: null,
        order_details: []
    };
    var lastElement = [];
    for(var i=0;i<formData.length;++i) {
        var element = formData[i];

        switch(element.name) {
            case 'customerName':
                requestPayload.customer_name = element.value;
                break;
            case 'product_grand_total':
                requestPayload.grand_total = element.value;
                break;
            case 'product':
                requestPayload.order_details.push({
                    product_id: element.value,
                    quantity: null,
                    total_price: null
                });                
                break;
            case 'qty':
                lastElement = requestPayload.order_details[requestPayload.order_details.length-1];
                if(lastElement) lastElement.quantity = element.value
                break;
            case 'item_total':
                lastElement = requestPayload.order_details[requestPayload.order_details.length-1];
                if(lastElement) lastElement.total_price = element.value
                break;
        }
        if (!requestPayload.customer_name || requestPayload.customer_name.trim() === "") {
            alert("Customer name is required.");
            return;
        }
        
        if (requestPayload.order_details.length === 0) {
            alert("Please add at least one product.");
            return;
        }
        
        for (let i = 0; i < requestPayload.order_details.length; i++) {
            const item = requestPayload.order_details[i];
            if (!item.product_id || !item.quantity || item.quantity <= 0) {
                alert("Invalid product or quantity in row " + (i + 1));
                return;
            }
        }
        
    }

    callApi("POST", orderSaveApiUrl, new FormData(Object.assign(document.createElement('form'), {
        elements: [{ name: 'data', value: JSON.stringify(requestPayload) }]
      })));
      
});
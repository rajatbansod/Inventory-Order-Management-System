// $(function () {
//     //Json data by api call for order table
//     $.get(orderListApiUrl, function (response) {
//         if(response) {
//             var table = '';
//             var totalCost = 0;
//             $.each(response, function(index, order) {
//                 totalCost += parseFloat(order.Total);
//                 table += '<tr>' +
//                     '<td>'+ order.Order_id +'</td>'+
//                     '<td>'+ order.Customer_name +'</td>'+
//                     '<td>'+ order.Total +'</td>'+
//                     '<td>'+ order.datetime.toFixed(2) +' Rs</td></tr>';
//             });
//             table += '<tr><td colspan="3" style="text-align: end"><b>Total</b></td><td><b>'+ totalCost.toFixed(2) +' Rs</b></td></tr>';
//             $("table").find('tbody').empty().html(table);
//         }
//     });
// });

var allOrders = [];

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

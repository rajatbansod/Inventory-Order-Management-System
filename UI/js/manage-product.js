

var productModal = $("#productModal");
    $(function () {
        var productListApiUrl = 'http://127.0.0.1:5000/getallproducts';
        //JSON data by API call
        $.get( productListApiUrl, function (response) {
            if(response) {
                var table = '';
                $.each(response, function(index, product) {
                    table += '<tr data-id="'+ product.Product_id +'" data-name="'+ product.Name +'" data-unit="'+ product.uom_id +'" data-price="'+ product.Price_per_unit +'">' +
                        '<td>'+ product.Name +'</td>'+
                        '<td>'+ product.uom_name +'</td>'+
                        '<td>'+ product.Price_per_unit +'</td>'+
                        '<td>' +
                            '<span class="btn btn-xs btn-warning edit-product">Edit</span> ' +
                            '<span class="btn btn-xs btn-danger delete-product">Delete</span>' +
                        '</td></tr>';

                });
                $("table").find('tbody').empty().html(table);
            }
        });
    });  

    // table += '<td>' +
    // '<span class="btn btn-xs btn-warning edit-product">Edit</span> ' +
    // '<span class="btn btn-xs btn-danger delete-product">Delete</span>' +
    // '</td></tr>';

    $(document).on("click", ".edit-product", function (){
        const tr = $(this).closest('tr');
        $("#id").val(tr.data('id'));
        $("#name").val(tr.data('name'));
        $("#price").val(tr.data('price'));
        $("#uoms").val(tr.data('unit'));
        productModal.find('.modal-title').text('Edit Product');
        productModal.modal('show');
    });
    

    // Save Product
    $("#saveProduct").on("click", function () {
        // If we found id value in form then update product detail
        var data = $("#productForm").serializeArray();
        var requestPayload = {
            id: $("#id").val(), 
            Name: null,
            Unit_id: null,
            Price_per_unit: null
        };
        for (var i=0;i<data.length;++i) {
            var element = data[i];
            switch(element.name) {
                case 'name':
                    requestPayload.Name = element.value;
                    break;
                case 'uoms':
                    requestPayload.Unit_id = element.value;
                    break;
                case 'price':
                    requestPayload.Price_per_unit = element.value;
                    break;
            }
        }
        callApi("POST", productSaveApiUrl, {
            'data': JSON.stringify(requestPayload)
        });
    });

    $(document).on("click", ".delete-product", function (){
        var tr = $(this).closest('tr');
        var data = {
            product_id : tr.data('id')
        };
        var isDelete = confirm("Are you sure to delete "+ tr.data('name') +" item?");
        if (isDelete) {
            callApi("POST", productDeleteApiUrl, data);
            setTimeout(() => location.reload(), 500);
        }
    });

    productModal.on('hide.bs.modal', function(){
        $("#id").val('0');
        $("#name, #unit, #price").val('');
        productModal.find('.modal-title').text('Add New Product');
    });

    productModal.on('show.bs.modal', function(){
        //JSON data by API call
        $.get(uomListApiUrl, function (response) {
            if(response) {
                var options = '<option value="">--Select--</option>';
                $.each(response, function(index, uom) {
                    options += '<option value="'+ uom.uom_id +'">'+ uom.uom_name +'</option>';
                });
                $("#uoms").empty().html(options);
            }
        });
    });
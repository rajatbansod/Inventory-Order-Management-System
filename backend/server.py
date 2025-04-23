from flask import Flask, request, jsonify
import json
from sql_connection import get_sql_connection
import products_dao
import uom_dao
import orders_dao


app = Flask(__name__) 
connection = get_sql_connection()

@app.route('/getallproducts',methods=['GET'])
def getallproducts():
   products = products_dao.get_all_products(connection)
   respones = jsonify(products)
   respones.headers.add('Access-Control-Allow-Origin','*')
   return respones

@app.route('/getUOM',methods=['GET'])
def get_UOM():
   respones = uom_dao.get_uoms(connection)
   respones = jsonify(respones)
   respones.headers.add('Access-Control-Allow-Origin','*')
   return respones

@app.route('/insertProduct',methods=['POST'])
def insert_product():
   request_payload = json.loads(request.form['data'])
   product_id = products_dao.insert_new_product(connection, request_payload)
   response = jsonify({
        'product_id':product_id
   })
   response.headers.add('Access-Control-Allow-Origin','*')
   return response


@app.route('/deleteProduct',methods=['POST'])
def delete_product():
   product_id = products_dao.delete_product(connection, request.form['product_id'])
   response = jsonify({
        'product_id':return_id
   })
   response.headers.add('Access-Control-Allow-Origin','*')
   return response


@app.route('/insertOrder',methods=['POST'])
def insert_order():
   print("Received data:", request.form.get('data')) 
   request_payload = json.loads(request.form['data'])
   order_id = orders_dao.insert_order(connection, request_payload)
   response = jsonify({
        'order_id':order_id
   })
   response.headers.add('Access-Control-Allow-Origin','*')
   return response


@app.route('/insertUOM', methods=['POST'])
def insert_uom():
    request_payload = json.loads(request.form['data'])
    uom_id = uom_dao.insert_uom(connection, request_payload)
    response = jsonify({'uom_id': uom_id})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/getAllOrders', methods=['GET'])
def get_all_orders():
    orders = orders_dao.get_all_orders(connection)
    response = jsonify(orders)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    print("staring")
    app.run(port=5000)
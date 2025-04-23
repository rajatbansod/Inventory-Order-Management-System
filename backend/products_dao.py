import mysql.connector
from sql_connection import get_sql_connection

def get_all_products(connection):
    cursor = connection.cursor()
    query = ("SELECT products.Product_id, products.Name, products.Unit_id, products.Price_per_unit, uom.uom_namel FROM products inner join uom on products.Unit_id=uom.uom_id;")

    cursor.execute(query)

    response = []
    for (Product_id, Name, Unit_id, Price_per_unit, uom_namel) in cursor:
            response.append({
            'Product_id': Product_id,
            'Name': Name,
            'uom_id': Unit_id,
            'Price_per_unit':  Price_per_unit, 
            'uom_name':uom_namel
        })    
  
    return response

def insert_new_product(connection, product):
         cursor = connection.cursor()

         query = ("insert into products (Name, Unit_id, Price_per_unit) VALUES (%s, %s, %s)")
         data = (product['Name'], product['Unit_id'], product['Price_per_unit'])
         
         cursor.execute(query,data)
         connection.commit()

         return cursor.lastrowid
         

def delete_product(connection, Product_id):
    cursor = connection.cursor()
    
    query = "DELETE FROM products WHERE Product_id = %s"
    cursor.execute(query, (Product_id,))
    
    connection.commit()
    return cursor.lastrowid

# if __name__=='__main__':
#     connection = get_sql_connection()
#     print(insert_new_product(connection,{
#          'Name': 'potatoes',
#          'Unit_id':1,
#          'Price_per_unit': 20
#     }))    

if __name__=='__main__':
    connection = get_sql_connection()
    print(delete_product(connection,8))
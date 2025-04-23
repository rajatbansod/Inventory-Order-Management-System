import mysql.connector
import mysql


__cnx = None 
def get_sql_connection():
 global __cnx

 if __cnx is None:
        __cnx = mysql.connector.connect(user='root', password='Pass@2092002', host='127.0.0.1',database='grocery store')
        
        return __cnx  
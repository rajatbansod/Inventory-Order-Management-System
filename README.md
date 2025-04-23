# Inventory-Order-Management-System
🛍️ Simple Inventory &amp; Order Management System A lightweight web application for managing products, units of measure, and customer orders. Built with HTML, CSS, JavaScript (jQuery), and integrated with a Flask backend via RESTful APIs.
     
📺 This project follows the instructional series from the Codebasics YouTube channel

# 🚀 Features

🛒 Product Management

- Add, update, and delete products
- Assign units of measure (UOM)
- Set pricing per unit

📦 Order Management

- Create orders with multiple product items
- Automatic calculation of item and order totals
- View order details and breakdowns

📊 Dashboard

- Displays a list of all customer orders
- Summarizes total revenue and order data

🧮 Unit of Measure (UOM)

- Add new UOMs dynamically
- Available in product management modal

# 📁 Directory Structure

    ├── backend/
    │   ├── server.py              # Main Flask server
    │   ├── sql_connection.py      # DB connection setup
    │   ├── products_dao.py        # Product DB operations
    │   ├── orders_dao.py          # Order DB operations
    │   └── uom_dao.py             # UOM DB operations
    │
    ├── frontend/
    │   ├── index.html             # Dashboard interface
    │   ├── manage-product.html    # Product management UI
    │   ├── order.html             # Order creation form
    │   ├── js/
    │   │   ├── common.js
    │   │   ├── dashboard.js
    │   │   ├── manage-product.js
    │   │   └── order.js
    │   └── css/
    │       ├── bootstrap.min.css
    │       ├── custom.css
    │       ├── sidebar-menu.css
    │       └── style.css

# ⚙️ Setup Guide

1. Clone the Repository
    
       git clone https://github.com/yourusername/grocery-store-management-system.git
       cd grocery-store-management-system  

2. Configure the Database

- Ensure MySQL is installed and running
- Create a database called grocery store
- Create tables: products, uom, orders, and order_details
- Update credentials in sql_connection.py if needed

3. Backend Setup

       cd backend
       pip install flask mysql-connector-python
       python server.py

4. Frontend Access

- Open the frontend/index.html using Live Server or any static server

# 📌 Notes

- APIs are CORS-enabled to allow smooth frontend-backend communication
- External product mock API used: https://fakestoreapi.com/products
- Clean, responsive UI using Bootstrap 3 and Material Design icons

# 📷 Screenshots

# 🤝 Contributing

Contributions are welcome! Please open issues or submit pull requests to improve the project.

# 🙌 Acknowledgements

- Codebasics YouTube channel for the tutorial foundation
- Bootstrap & jQuery for frontend styling and interaction
- Flask for powering the RESTful API
- Fake Store API for mock product data during development

   

MarketPlace (PHP + MySQL + XAMPP) — Project README
Overview
MarketPlace is a simple web-based marketplace application where users can:

Create an account and sign in
Post items for sale (with an optional image upload)
Browse all posted items on the homepage
View a single item’s details + seller info
Contact the seller via Telegram username
Add items to a cart
Leave comments on items (shared for all users via the database)
View and manage their profile (including changing password)
This project is built with:

Frontend: HTML, CSS, JavaScript
Backend: PHP (MySQLi + Sessions)
Database: MySQL (phpMyAdmin)
Server: Apache via XAMPP
Project URL (example): http://localhost/MarketPlace/
Project Structure (Important Folders)
pages/
Contains the main HTML pages (index.html, signin.html, signup.html, post.html, item.html, profile.html, cart.html, navbar.html)
php/
Backend PHP endpoints (auth, items, comments, uploads)
js/
Frontend logic (auth, navbar, items, profile, cart)
css/
Styling for pages
uploads/
Uploaded item images are stored here (created automatically if missing)
Setup Guide (Start to End)
1) Install & Start XAMPP
Install XAMPP
Start:
Apache
MySQL
2) Put the Project in the Correct Folder
Move the project into:

C:\xampp\htdocs\MarketPlace
Then you should be able to open:

http://localhost/MarketPlace/pages/index.html
Database Setup (phpMyAdmin)
1) Create Database
In phpMyAdmin:

Create a database named: marketplace
2) Create / Improve Tables
Use the SQL below (run in phpMyAdmin > SQL).
If you already have tables, use the ALTER TABLE approach instead of dropping anything.

A) users table
sql
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  location VARCHAR(100) NOT NULL,
  telegram_username VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_users_email (email),
  UNIQUE KEY uq_users_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
B) items table (single image stored in this table)
sql
CREATE TABLE IF NOT EXISTS items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(120) NOT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  description TEXT NULL,
  category VARCHAR(60) NULL,
  image VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_items_user_id (user_id),
  INDEX idx_items_created_at (created_at),
  CONSTRAINT fk_items_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
C) comments table (so all users see comments)
sql
CREATE TABLE IF NOT EXISTS comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  item_id INT NOT NULL,
  user_id INT NOT NULL,
  comment_text VARCHAR(500) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_comments_item_id (item_id),
  INDEX idx_comments_user_id (user_id),
  CONSTRAINT fk_comments_item FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE,
  CONSTRAINT fk_comments_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
How the App Works (User Flow)
1) Sign Up
Go to: pages/signup.html
Fill:
Username, Phone, Location, Telegram Username, Email, Password
Account is saved in the users table.
2) Sign In
Go to: pages/signin.html
After login:
User session is created on the server ($_SESSION)
Basic user data is stored in localStorage for quick frontend usage
Navbar automatically switches to show Logout instead of Sign In/Sign Up
3) Post an Item
Go to: pages/post.html
Only signed-in users can post.
Image upload is optional (stored in uploads/ and filename saved in items.image)
4) Browse Items
Homepage loads items from the database and displays them as cards.
Clicking an item opens:
pages/item.html?id=<ITEM_ID>
5) Item Details + Seller Contact
On the item page you can:

View item details + image
See the seller name
Click Contact Seller
Opens Telegram using the seller’s telegram_username (example: https://t.me/username)
6) Comments (Visible to All Users)
Users can post comments on item pages.
Comments are saved in the comments table and displayed for everyone.
7) Cart
Item page includes Add to Cart
Cart is stored in localStorage (simple approach).
Cart page (pages/cart.html) displays items, total, and supports remove/clear.
8) Profile + Change Password
Profile page shows saved user info:
Username, Phone, Location, Telegram, Email
Change password:
Prompts for old + new password
Updates password securely in DB (hashed)
Backend Endpoints (PHP)
Common endpoints used by the frontend:

Auth
php/signup.php
php/signin.php
php/check_auth.php
php/logout.php
php/change_password.php
Items
php/add_item.php
php/get_items.php
php/get_item.php
Comments
php/add_comment.php
php/get_comments.php
Notes / Troubleshooting
Images not showing
Ensure folder exists:
MarketPlace/uploads/
Make sure Apache has permission to write to it (XAMPP usually does).
Comments not visible for all users
Ensure you created the comments table.
Test quickly in browser:
http://localhost/MarketPlace/php/get_comments.php?item_id=1
URL Casing
If your folder name is MarketPlace, keep the same casing in URLs:

/MarketPlace/php/...
/MarketPlace/uploads/...
Status
Core marketplace features implemented
Auth + profile fields supported
Item posting and browsing working
Seller Telegram contact supported
Shared comments stored in DB
Cart implemented using localStorage

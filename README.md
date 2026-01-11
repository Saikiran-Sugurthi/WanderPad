Got it 👍
Here is a **short, clean, professional README** written in **plain text**, so it looks good when printed or copied anywhere.
No markdown blocks, no clutter.

---

WanderPad

WanderPad is a full-stack Airbnb-style web application where users can explore listings, create their own stays, upload images, and leave reviews. The application uses server-side rendering with EJS and follows the MVC architecture.

---

Features

• User authentication (Signup, Login, Logout)
• Create, edit, and delete listings
• Image uploads using Cloudinary
• Reviews and ratings on listings
• Authorization (only listing owners can edit or delete)
• Flash messages for user feedback

---

Tech Stack

Frontend:
EJS, Bootstrap, CSS

Backend:
Node.js, Express.js

Authentication:
Passport.js, Express Session, MongoDB session store

Database & Services:
MongoDB Atlas, Mongoose
Cloudinary, Multer

---

Project Structure

controllers – route logic
models – database schemas
routes – Express routes
views – EJS templates
public – static assets (CSS, images, favicon)
init – database seed scripts
utils – error handling and helpers
index.js – server entry point

---

Environment Variables

Create a .env file in the project root with the following values:

MONGO_URL=your_mongodb_atlas_url
SECRET=your_session_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret

The .env file is ignored using .gitignore and should not be pushed to GitHub.

---

Running the Project Locally

1. Install dependencies
   npm install

2. Seed the database (optional)
   node init/app.js

3. Start the server
   npm start

Open the application at:
[http://localhost:3000](http://localhost:3000)

---

Deployment

The application is deployed as a single service due to server-side rendering.

Recommended setup:
Backend + EJS → Render
Database → MongoDB Atlas
Image storage → Cloudinary


---

Author

Sai Kiran Sugurthi


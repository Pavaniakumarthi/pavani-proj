# CRM Backend (Fixed) - Ready to run

This project is a ready-to-run Node.js + Express + Sequelize (SQLite) CRM backend.
Defaults:
- Port: 3000
- DB: SQLite (crm_db.sqlite in project root)
- JWT secret is provided in `.env` (change for production)

How to run:
1. Extract the zip.
2. Open a terminal in the project folder.
3. Run:
   npm install
   npm start
4. API base: http://localhost:3000

APIs:
- POST /api/employees/register
- POST /api/employees/login
- POST /api/enquiries/public
- GET /api/enquiries/public
- GET /api/enquiries/private (requires Authorization header)
- PATCH /api/enquiries/:id/claim (requires Authorization header)

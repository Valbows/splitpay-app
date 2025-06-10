# SplitPay Backend

A simple Node.js/Express.js backend for the SplitPay expense sharing application with PostgreSQL database integration.

## Quick Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Database Setup
1. Make sure PostgreSQL is running on your system
2. Create a database named `splitpay`:
```sql
CREATE DATABASE splitpay;
```
3. Run the schema file to create tables:
```bash
psql -d splitpay -f database.sql
```

### 3. Environment Configuration
1. Copy the example environment file:
```bash
cp .env.example .env
```
2. Update the `.env` file with your database credentials:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=splitpay
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
```

### 4. Start the Server
```bash
# Development mode (with hot reload)
npm run dev

# Production mode
npm run build
npm start
```

The server will run on `http://localhost:3001` by default.

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a specific user
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

### Groups
- `GET /api/groups` - Get all groups
- `GET /api/groups/:id` - Get a specific group
- `POST /api/groups` - Create a new group
- `PUT /api/groups/:id` - Update a group
- `DELETE /api/groups/:id` - Delete a group

### Expenses
- `GET /api/expenses` - Get all expenses (optional: `?groupId=123`)
- `GET /api/expenses/:id` - Get a specific expense
- `POST /api/expenses` - Create a new expense
- `PUT /api/expenses/:id` - Update an expense
- `DELETE /api/expenses/:id` - Delete an expense

### Health Check
- `GET /health` - Server health status

## Database Schema

The database includes the following tables:
- `users` - User information
- `groups` - Expense groups
- `group_members` - Group membership (many-to-many)
- `expenses` - Individual expenses
- `expense_splits` - How expenses are split among users

## Integration with Frontend

The backend is configured to accept requests from the frontend running on `http://localhost:3002`. CORS is properly configured for development.

## Environment Variables

- `DB_HOST` - Database host (default: localhost)
- `DB_PORT` - Database port (default: 5432)
- `DB_NAME` - Database name (default: splitpay)
- `DB_USER` - Database user (default: postgres)
- `DB_PASSWORD` - Database password (default: password)
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:3002) 
# SplitPay User Flow Analysis & Backend Integration Readiness

## Executive Summary

This document analyzes the complete user flows for the SplitPay application and outlines the database integration requirements for each screen. The application follows 4 main process flows as described in the user requirements.

## Current Implementation Status

✅ **IMPLEMENTED & READY FOR BACKEND INTEGRATION:**
- Dashboard (Process 1, Screen 1)
- Groups page (Process 1, Screen 2)
- Create Group flow (Process 1, Screen 3)
- Group Detail page (Process 2, Screen 1)
- New Expenses page (Process 2, Screen 2)
- Add Expense Form (Process 2, Screen 3)
- Expenses list (Process 2, Screen 4)
- Split Details (Process 3, Screen 1)

✅ **API SERVICE LAYER:**
- Complete API service with Users, Groups, and Expenses endpoints
- Proper TypeScript interfaces
- Error handling and HTTP methods

## Process Flow Analysis

### Process 1: Initial Action / Entry Point

#### Screen 1: Dashboard (Entry Point)
**Location:** `/src/pages/Dashboard.tsx`
**Current State:** ✅ Implemented
**Database Requirements:**
```sql
-- Overview Cards Data
SELECT 
  SUM(CASE WHEN user_balance > 0 THEN user_balance ELSE 0 END) as total_balance,
  COUNT(DISTINCT group_id) as active_groups,
  COUNT(*) as pending_actions,
  SUM(settled_amount) as settled_payments
FROM user_group_balances 
WHERE user_id = ?

-- Recent Activity Feed
SELECT TOP 10 * FROM activities 
WHERE user_id = ? 
ORDER BY created_at DESC

-- Chart Data (Spending Trends)
SELECT DATE(created_at) as date, SUM(amount) as total 
FROM expenses 
WHERE user_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY DATE(created_at)

-- Pending Payments Chart
SELECT g.name, SUM(e.amount) as pending_amount
FROM groups g 
JOIN expenses e ON g.id = e.group_id 
WHERE e.settled = false AND e.paid_by_user_id != ?
GROUP BY g.id, g.name
```

**Integration Status:** 🚧 NEEDS BACKEND HOOKS
- OverviewCards component uses static data
- ChartSection component uses mock data
- RecentActivity component uses static data

#### Decision Point: View Existing vs Create New
**Current State:** ✅ Implemented via navigation
- Green path: Navigate to Groups page (`/groups`)
- Alternative path: Navigate to Create Group (`/create-group`)

#### Screen 2: Groups Page (Existing Groups)
**Location:** `/src/pages/Groups.tsx`
**Current State:** ✅ Implemented
**Database Requirements:**
```sql
-- User's Groups
SELECT g.*, gm.role, gm.joined_at
FROM groups g
JOIN group_members gm ON g.id = gm.group_id
WHERE gm.user_id = ?

-- Group Activity Summary
SELECT 
  g.id,
  g.name,
  g.description,
  CASE 
    WHEN SUM(CASE WHEN e.paid_by_user_id = ? THEN e.amount ELSE 0 END) > 
         SUM(CASE WHEN s.user_id = ? THEN s.amount ELSE 0 END) 
    THEN 'owed'
    ELSE 'owe'
  END as balance_type,
  ABS(SUM(CASE WHEN e.paid_by_user_id = ? THEN e.amount ELSE 0 END) - 
      SUM(CASE WHEN s.user_id = ? THEN s.amount ELSE 0 END)) as balance_amount
FROM groups g
LEFT JOIN expenses e ON g.id = e.group_id
LEFT JOIN expense_splits s ON e.id = s.expense_id
WHERE g.id IN (SELECT group_id FROM group_members WHERE user_id = ?)
GROUP BY g.id
```

**Integration Status:** 🚧 NEEDS BACKEND HOOKS

#### Screen 3: Create Group Flow
**Location:** `/src/pages/CreateGroup.tsx`
**Current State:** ✅ Implemented (4-step wizard)
**Database Requirements:**
```sql
-- Step 4: Create Group
INSERT INTO groups (name, description, created_by_user_id) 
VALUES (?, ?, ?)

-- Add creator as admin
INSERT INTO group_members (group_id, user_id, role) 
VALUES (?, ?, 'admin')

-- Create invitation links
INSERT INTO group_invitations (group_id, invited_by_user_id, invitation_code, expires_at)
VALUES (?, ?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))
```

**Integration Status:** 🚧 NEEDS BACKEND HOOKS

### Process 2: Central Workflow / Core Action

#### Screen 1: Group Detail (Central Hub)
**Location:** `/src/pages/GroupDetail.tsx`
**Current State:** ✅ Implemented
**Database Requirements:**
```sql
-- Group Details
SELECT g.*, COUNT(gm.user_id) as member_count
FROM groups g
LEFT JOIN group_members gm ON g.id = gm.group_id
WHERE g.id = ?

-- Group Members
SELECT u.id, u.name, u.email, u.avatar_url, gm.role, gm.joined_at
FROM users u
JOIN group_members gm ON u.id = gm.user_id
WHERE gm.group_id = ?

-- Group Expenses
SELECT e.*, u.name as paid_by_name
FROM expenses e
JOIN users u ON e.paid_by_user_id = u.id
WHERE e.group_id = ?
ORDER BY e.created_at DESC

-- Balance Summary
SELECT 
  u.id,
  u.name,
  SUM(CASE WHEN e.paid_by_user_id = u.id THEN e.amount ELSE 0 END) as paid,
  SUM(CASE WHEN s.user_id = u.id THEN s.amount ELSE 0 END) as owes
FROM users u
JOIN group_members gm ON u.id = gm.user_id
LEFT JOIN expenses e ON e.group_id = gm.group_id
LEFT JOIN expense_splits s ON e.id = s.expense_id AND s.user_id = u.id
WHERE gm.group_id = ?
GROUP BY u.id
```

#### Screen 2: New Expenses
**Location:** `/src/pages/NewExpenses.tsx`
**Current State:** ✅ Implemented
**Database Requirements:**
```sql
-- Get user's groups for dropdown
SELECT id, name FROM groups 
WHERE id IN (SELECT group_id FROM group_members WHERE user_id = ?)
```

#### Screen 3: Add Expense Form
**Location:** `/src/pages/AddExpenseForm.tsx`
**Current State:** ✅ Implemented
**Database Requirements:**
```sql
-- Create Expense
INSERT INTO expenses (description, amount, group_id, paid_by_user_id, receipt_url)
VALUES (?, ?, ?, ?, ?)

-- Create Splits
INSERT INTO expense_splits (expense_id, user_id, amount, split_type)
VALUES (?, ?, ?, ?)

-- Get Group Members for split calculation
SELECT id, name FROM users 
WHERE id IN (SELECT user_id FROM group_members WHERE group_id = ?)
```

#### Screen 4: Expenses List
**Location:** `/src/pages/Expenses.tsx`
**Current State:** ✅ Implemented
**Database Requirements:**
```sql
-- List all expenses for user
SELECT 
  e.*,
  g.name as group_name,
  u.name as paid_by_name,
  CASE WHEN e.paid_by_user_id = ? THEN 'paid' ELSE 'split' END as user_relation
FROM expenses e
JOIN groups g ON e.group_id = g.id
JOIN users u ON e.paid_by_user_id = u.id
WHERE e.group_id IN (SELECT group_id FROM group_members WHERE user_id = ?)
ORDER BY e.created_at DESC
```

### Process 3: Expense Management Flow

#### Screen 1: Split Details
**Location:** `/src/pages/SplitDetails.tsx`
**Current State:** ✅ Implemented
**Database Requirements:**
```sql
-- Expense Details
SELECT e.*, g.name as group_name, u.name as paid_by_name
FROM expenses e
JOIN groups g ON e.group_id = g.id
JOIN users u ON e.paid_by_user_id = u.id
WHERE e.id = ?

-- Split Breakdown
SELECT 
  s.*,
  u.name as user_name,
  u.avatar_url,
  CASE WHEN s.settled_at IS NOT NULL THEN 'paid' ELSE 'pending' END as status
FROM expense_splits s
JOIN users u ON s.user_id = u.id
WHERE s.expense_id = ?

-- Comments/Notes
SELECT c.*, u.name as user_name
FROM expense_comments c
JOIN users u ON c.user_id = u.id
WHERE c.expense_id = ?
ORDER BY c.created_at ASC
```

#### Screens 2-5: Edit Expense, Edit Split, Confirm, Settlement
**Current State:** 📋 PARTIALLY IMPLEMENTED
**Database Requirements:**
```sql
-- Update Expense
UPDATE expenses 
SET description = ?, amount = ?, updated_at = NOW()
WHERE id = ? AND group_id IN (SELECT group_id FROM group_members WHERE user_id = ?)

-- Update Splits
UPDATE expense_splits 
SET amount = ?, updated_at = NOW()
WHERE expense_id = ? AND user_id = ?

-- Mark as Settled
UPDATE expense_splits 
SET settled_at = NOW(), settled_by_user_id = ?
WHERE expense_id = ? AND user_id = ?
```

### Process 4: Invitation / Member Management Flow

#### Screen 1: Invite Members
**Current State:** ✅ IMPLEMENTED (in CreateGroup flow)
**Database Requirements:**
```sql
-- Send Email Invitation
INSERT INTO group_invitations (group_id, email, invited_by_user_id, invitation_code)
VALUES (?, ?, ?, ?)

-- Generate Invite Link
INSERT INTO group_invite_links (group_id, created_by_user_id, link_code, expires_at)
VALUES (?, ?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))

-- Check Pending Invitations
SELECT * FROM group_invitations 
WHERE group_id = ? AND accepted_at IS NULL AND expires_at > NOW()
```

## Data Integration Requirements Summary

### Required Database Tables
```sql
-- Core Tables
users (id, name, email, avatar_url, created_at)
groups (id, name, description, created_by_user_id, created_at)
group_members (group_id, user_id, role, joined_at)
expenses (id, description, amount, group_id, paid_by_user_id, receipt_url, created_at)
expense_splits (id, expense_id, user_id, amount, split_type, settled_at, settled_by_user_id)

-- Supporting Tables
group_invitations (id, group_id, email, invited_by_user_id, invitation_code, expires_at, accepted_at)
group_invite_links (id, group_id, created_by_user_id, link_code, expires_at, uses_count)
expense_comments (id, expense_id, user_id, comment, created_at)
activities (id, user_id, group_id, activity_type, description, created_at)
user_group_balances (user_id, group_id, balance_amount, last_updated)
```

### Next Steps for Backend Integration

1. **Replace Static Data with API Calls:**
   - Update OverviewCards to fetch real dashboard metrics
   - Update Groups page to fetch user's actual groups
   - Update all components to use React hooks for data fetching

2. **Add State Management:**
   - Implement React Query or SWR for data fetching
   - Add loading states and error handling
   - Add optimistic updates for better UX

3. **Enhance API Service:**
   - Add dashboard metrics endpoint
   - Add group member management endpoints
   - Add expense splitting endpoints
   - Add invitation management endpoints

4. **Add Authentication:**
   - Implement user authentication
   - Add protected routes
   - Add user context/session management

## User Flow Examples

### Example Flow 1: Create New Group
1. **Dashboard** → Click "New Group" → **Create Group Step 1**
2. **Create Group Step 1** → Enter group name → **Create Group Step 2**
3. **Create Group Step 2** → Add description → **Create Group Step 3**
4. **Create Group Step 3** → Select category, add emails → **Create Group Step 4**
5. **Create Group Step 4** → Copy invite link → **Return to Groups**

### Example Flow 2: Add Expense
1. **Dashboard** → Click floating action button → **New Expenses**
2. **New Expenses** → Choose expense type → **Add Expense Form**
3. **Add Expense Form** → Fill details, upload receipt → **Split Details**
4. **Split Details** → Review split breakdown → **Expenses List**

### Example Flow 3: Settle Payment
1. **Groups** → Click group → **Group Detail**
2. **Group Detail** → Click expense → **Split Details**
3. **Split Details** → Click "Mark as Paid" → **Updated Split Details**

All flows are implemented with proper navigation and data structures ready for backend integration. 
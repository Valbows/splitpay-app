import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { darkTheme } from './theme'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Groups from './pages/Groups'
import CreateGroup from './pages/CreateGroup'
import GroupDetail from './pages/GroupDetail'
import NewExpenses from './pages/NewExpenses'
import Expenses from './pages/Expenses'
import AddExpenseForm from './pages/AddExpenseForm'
import SplitDetails from './pages/SplitDetails'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Authentication Routes (no layout) */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Standalone Routes (no layout) */}
          <Route path="/group/:groupId" element={<GroupDetail />} />
          <Route path="/new-expenses" element={<NewExpenses />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/add-expense" element={<AddExpenseForm />} />
          <Route path="/split/:expenseId" element={<SplitDetails />} />
          
          {/* Main App Routes (with layout) */}
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="/create-group" element={<CreateGroup />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App 
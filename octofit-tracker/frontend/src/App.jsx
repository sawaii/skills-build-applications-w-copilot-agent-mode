import { Link, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const apiBase = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api'

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">OctoFit Tracker</p>
          <h1>Workout intelligence dashboard</h1>
        </div>
        <nav>
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/users">Users</Link>
          <Link className="nav-link" to="/teams">Teams</Link>
          <Link className="nav-link" to="/activities">Activities</Link>
          <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
          <Link className="nav-link" to="/workouts">Workouts</Link>
        </nav>
      </header>

      <main className="container py-4">
        <div className="alert alert-info mb-4">
          API base URL: <strong>{apiBase}</strong>
          <br />
          Set <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces.
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <section className="row g-4">
                <div className="col-md-6">
                  <div className="dashboard-card h-100">
                    <h2>Overview</h2>
                    <p>Monitor your members, teams, activity, and workout goals.</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="dashboard-card h-100">
                    <h2>Quick links</h2>
                    <ul className="mb-0">
                      <li><Link to="/users">View users</Link></li>
                      <li><Link to="/teams">View teams</Link></li>
                      <li><Link to="/activities">View activities</Link></li>
                    </ul>
                  </div>
                </div>
              </section>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

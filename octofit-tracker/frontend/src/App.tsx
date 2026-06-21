import { Link, Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">OctoFit Tracker</p>
          <h1>Stay on top of every workout</h1>
        </div>
        <nav>
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/leaderboard">
            Leaderboard
          </Link>
        </nav>
      </header>

      <main className="container py-4">
        <Routes>
          <Route
            path="/"
            element={
              <section className="row g-4 align-items-stretch">
                <div className="col-md-7">
                  <div className="dashboard-card h-100">
                    <h2>Today&apos;s Focus</h2>
                    <p>
                      Track your activity, manage teams, and build healthy habits.
                    </p>
                    <button className="btn btn-primary">Log workout</button>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="dashboard-card h-100">
                    <h3>Weekly progress</h3>
                    <div className="progress-streak">82%</div>
                  </div>
                </div>
              </section>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <section className="dashboard-card">
                <h2>Leaderboard</h2>
                <p>Top teams and members will appear here.</p>
              </section>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App

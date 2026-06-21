import { useEffect, useState } from 'react'

function Leaderboard() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
    const apiUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
      : 'http://localhost:8000/api/leaderboard/'

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard')
        }
        return response.json()
      })
      .then((payload) => {
        if (isMounted) {
          const data = Array.isArray(payload)
            ? payload
            : Array.isArray(payload.results)
              ? payload.results
              : Array.isArray(payload.data)
                ? payload.data
                : []
          setItems(data)
          setError('')
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  return (
    <section className="dashboard-card">
      <h2>Leaderboard</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id || item.id}>
              <td>{item.rank}</td>
              <td>{item.name}</td>
              <td>{item.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default Leaderboard

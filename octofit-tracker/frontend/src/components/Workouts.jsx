import { useEffect, useState } from 'react'

function Workouts() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
    const apiUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
      : 'http://localhost:8000/api/workouts/'

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch workouts')
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
      <h2>Workouts</h2>
      <div className="row g-3">
        {items.map((item) => (
          <div className="col-md-6" key={item._id || item.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">Type: {item.type}</p>
                <p className="card-text">Duration: {item.duration} min</p>
                <p className="card-text">Difficulty: {item.difficulty}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Workouts

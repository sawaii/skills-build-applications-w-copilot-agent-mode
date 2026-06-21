import { useEffect, useState } from 'react'
import { fetchCollection } from '../utils/api.js'

function Teams() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('teams')
      .then((data) => {
        if (isMounted) {
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
      <h2>Teams</h2>
      <div className="row g-3">
        {items.map((item) => (
          <div className="col-md-6" key={item._id || item.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">Members: {Array.isArray(item.members) ? item.members.length : 0}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Teams

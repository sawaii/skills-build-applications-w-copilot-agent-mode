import { useEffect, useState } from 'react'
import { fetchCollection } from '../utils/api.js'

function Activities() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('activities')
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
      <h2>Activities</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Type</th>
            <th>Duration</th>
            <th>Calories</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id || item.id}>
              <td>{item.userId}</td>
              <td>{item.type}</td>
              <td>{item.duration}</td>
              <td>{item.calories}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default Activities

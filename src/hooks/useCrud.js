import { useCallback, useEffect, useState } from 'react'
import api from '../api/client.js'

export function useCrud(endpoint) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(async (params = {}) => {
    setLoading(true)
    setError('')
    try {
      const res = await api.get(endpoint, { params })
      setItems(res.data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Could not load data.')
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  useEffect(() => {
    refresh()
  }, [refresh])

  async function create(payload) {
    const res = await api.post(endpoint, payload)
    setItems((prev) => [res.data, ...prev])
    return res.data
  }

  async function update(id, payload) {
    const res = await api.put(`${endpoint}/${id}`, payload)
    setItems((prev) => prev.map((i) => (i.id === id ? res.data : i)))
    return res.data
  }

  async function remove(id) {
    await api.delete(`${endpoint}/${id}`)
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  return { items, setItems, loading, error, refresh, create, update, remove }
}

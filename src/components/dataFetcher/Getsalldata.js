import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Getsalldata = () => {
  const [data, setData] = useState('')

  const getalldata = async () => {
    try {
      const res = await axios.get('https://emerald-effective-ladybug-68.mypinata.cloud/ipfs/QmbWy2tNeJJPhvZuThUcMYK8r4c3ARRJubu1kJapvVTZqD')
      setData(res?.data)
      console.log(res?.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getalldata()
  }, [])

  return (
    <div>
      {data ? (
        <div>
          <h2>{data.name}</h2>
          <img src={data.image} alt={data.name} style={{ maxWidth: '200px' }} />
          <p>{data.description}</p>
          <p>Price: {data.price}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Getsalldata
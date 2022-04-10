import React from 'react'
import Button from '../components/Button'
import { useDocumentTitle } from '../lib/connect'

export default function NotFound() {
  useDocumentTitle('Not Found')
  return (
    <main className="center">
      <img src="https://media3.giphy.com/media/RgnTr6sxtYsWQiSzhx/giphy.gif?cid=790b7611e3ab5030cf48e556b0c7b0906ea95db739e5dbcd&rid=giphy.gif&ct=g" alt="" />
      <Button href="/create-playlist">Back To Home</Button>
    </main>
  )
}

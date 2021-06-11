import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { push } from 'connected-next-router'
import WithHeader from '../../shared/layouts/WithHeader'

export default function Post() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query

  return (
    <WithHeader>
      <div className='mx-auto max-w-7xl px-2 sm:px-4 lg:px-8'>
        <pre>{JSON.stringify({ id }, null, 2)}</pre>
        <a href='/feed' onClick={
          (e) => {
            e.preventDefault()
            dispatch(push({ pathname: '/feed' }))
          }
        }>/feed</a>
      </div>
    </WithHeader>
  )
}

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { load } from 'features/imageGrid/imageGridSlice'
import { AppState } from 'app/store'

export default function Home() {
  const dispatch = useDispatch()
  const imageGrid = useSelector((state: AppState) => {
    return state.imageGrid
  })
  useEffect(() => {
    dispatch(
      load({
        key: '5f96323678d05ff0c4eb264ef184556868e303b32a2db88ecbf15746e6f25e02',
        page: 10,
      }),
    )
  }, [])

  return (
    <>
      <h3>Unsplash</h3>
      {imageGrid.images &&
        imageGrid.images.map((image: any) => (
          <div key={image.id} className={`item item-${Math.ceil(image.height / image.width)}`}>
            <img src={image.urls.small} alt={image.user.username} />
          </div>
        ))}
      <pre>{JSON.stringify(imageGrid, null, 2)}</pre>
    </>
  )
}

import { imageGridSelector, load } from 'features/imageGrid/imageGridSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Home() {
  const dispatch = useDispatch()
  const { isLoading, images, error } = useSelector(imageGridSelector.all)

  useEffect(() => {
    dispatch(
      load({
        key: '5f96323678d05ff0c4eb264ef184556868e303b32a2db88ecbf15746e6f25e02',
        page: 10,
      }),
    )
  }, [])

  if (isLoading) {
    return <div>Loading ...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex flex-wrap -mx-4">
        {images.map((image: any) => (
          <div key={image.id} className="md:w-1/3 px-4 mb-8">
            <img className="rounded shadow-md" src={image.urls.small} alt={image.user.username} />
          </div>
        ))}
      </div>
    </div>
  )
}

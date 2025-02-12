import { useEffect, useState } from 'react'

export const useHandleShow = () => {
  const [isHide, setIsHide] = useState(false);

  const handleEnvHide = (hide = true) => {
    setIsHide(hide)
  }

  useEffect(() => {
    const id = setTimeout(() => {
      setIsHide(true)
    }, 5000)

    return () => clearTimeout(id);
  },[])

  return {isHide, handleEnvHide}
}
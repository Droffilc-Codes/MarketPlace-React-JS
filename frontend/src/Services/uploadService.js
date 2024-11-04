import axios from "axios"
import toast from "react-hot-toast"


export const uploadImage =  async event =>{
    let toastId = null

    const image = await getImage(event)
    if(!image) return null

    const formData = new FormData()
    formData.append('image', image, image.name)

    const response = await axios.post('api/upload', formData, {
        onUploadProgress : ({progress}) => {
            if (toastId) toast.update(toastId, { progress })
                else toastId = toast.success('Uploading...', { progress })
    }})
        toast.dismiss(toastId)
    return response.data.imageUrl 
}

const getImage = async event => {
    const files = event.target.files

    if (!files || files.length <= 0) {
        toast.warning('Upload file is not selected', 'File Upload')
        return null

    }
    
    const file = files[0]
    
    if(file.type !== 'image/jpeg' && file.type !=='image/png'){
        toast.error('Only JPEG and PNG are allowed', 'File Type Error')
        return null
    }

    return file

}
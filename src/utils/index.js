import axios from "axios"

export const saveOrUpdateUser=async Dataus=>{
    const {data}=await axios.post(
        `${import.meta.env.VITE_API_URL}/user`,
        Dataus
    )
    return data
}
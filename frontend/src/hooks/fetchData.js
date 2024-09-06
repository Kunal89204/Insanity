import axios from "axios";

const baseUrl = import.meta.env.VITE_BAKCEND_URI



const fetchData = {
    getCategoryInfo: async (accessToken, categoryName) => {
        try {
            console.log(categoryName)
            const response = await axios.get(`${baseUrl}/eachCategory/${categoryName}`, {
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            })
            return response.data
        } catch (error) {
            console.log(error)
            return error
        }
    }
}

export {fetchData}
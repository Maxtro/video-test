import Axios from 'axios'

export const analyticsAPI = {
    getAnalysticsDate() {
        return Axios.get('http://www.mocky.io/v2/5e60c5f53300005fcc97bbdd')
    }
}
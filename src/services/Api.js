import ajax from 'superagent';

class Api{
    constructor(){
        this.baseUrl = process.env.BACKEND_HOST ;
    }

    createPlant(plantName){
        if (!plantName)
            return null;
        const createPlantUrl = `${this.baseUrl}/plants`;
        return ajax.post(createPlantUrl)
            .send({name: plantName})
            .type('application/x-www-form-urlencoded')
            .then((res) => {
                return res.body;
            }).catch((e) => {
                return null;
            })
    }

    getPlant(plantId){
        if (!plantId)
            return null;
        const getPlantUrl = `${this.baseUrl}/plant/${plantId}`;
        return ajax.get(getPlantUrl)
            .then((res) => {
                return res.body;
            }).catch((e) => {
                return null;
            })
    }

    updatePlant(plantId, plantName){
        if (!plantName || !plantId)
            return null;
        const updatePlantUrl = `${this.baseUrl}/plant/${plantId}`;
        return ajax.put(updatePlantUrl)
            .send({name: plantName})
            .type('application/x-www-form-urlencoded')
            .then((res) => {
                return res.body;
            }).catch((e) => {
                return null;
            })
    }

    listPlants(){
        const getPlantsUrl = `${this.baseUrl}/plants`;
        return ajax.get(getPlantsUrl)
            .then((res) => {
                return res.body;
            }).catch((e) => {
                return null;
            })
    }

    deletePlant(plantId){
        if (!plantId)
            return null;
        const getPlantsUrl = `${this.baseUrl}/plant/${plantId}`;
        return ajax.del(getPlantsUrl)
            .then((res) => {
                return res.body;
            }).catch((e) => {
                return null;
            })
    }

    refreshPlantDatapoints(plantId, fromDate, toDate){
        if (!plantId || !fromDate || !toDate)
            return null;
        const refreshPlantDatapointsUrl = `${this.baseUrl}/panels/refresh/${plantId}?from_date=${fromDate}&to_date=${toDate}`
        return ajax.get(refreshPlantDatapointsUrl)
            .then((res) => {
                return res.body;
            }).catch((e) => {
                return null;
            })
    }
}

export default Api;
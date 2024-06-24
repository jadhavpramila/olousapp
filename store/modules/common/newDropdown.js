import axios from "axios";

const defaultState = () => {
  return {
    sectorData: [],
    professionData: [],
    softwareData: [],
  };
};

const state = defaultState();
const getters ={

}

const metations = {

}

const actions={
    getSectorDetails({commit}){
        return new Promise((resolve,reject)=>{
            return axios .get('')
        })
    }
}
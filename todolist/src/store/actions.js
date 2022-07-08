import { getProjectsList } from "@/api";
const actions = {
    async getProjects({ commit }) {
        const { data } = await getProjectsList()
        commit("SET_PROJECRS", data)
    }
}

export default actions
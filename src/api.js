import axios from "axios"

const SHARED = {
    header: {
        "Content-Type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
    }
}

const inferenceInstance = axios.create({ baseURL: "https://inf.cl.uni-trier.de", ...SHARED});
const metricsInstance = axios.create({ baseURL: 'https://metrics.twon.uni-trier.de', ...SHARED});

export function getModels() {
    return inferenceInstance.get("/models/").then((response) => response.data)
}

export function postChat(model, system, prompt) {
    return inferenceInstance.post("/", {model: model, system: system, prompt: prompt})
        .then((response) => response.data)
}

export function postMetrics(samples) {
    return metricsInstance.post("/", {samples: samples})
        .then((response) => response.data)
}

import { getConfigStore } from '@/stores/config'

export default function createPrompt(thread, agent) {
    return getConfigStore()
        .getPrompt.replace('{persona}', agent.persona.trim())
        .replace('{history}', formatHistory(thread, agent))
        .replace('{thread}', formatThread(thread, agent))
}

function formatHistory(thread, agent, n = 2) {
    return (
        thread
            .filter((item) => item.id === agent.id)
            .splice(-n)
            .map((item) => `You posted: ${stripString(item.message)}`)
            .join('\n\n') || 'You have not interacted in the thread yet.'
    ).trim()
}

function formatThread(thread, agent, n = 2) {
    return (
        `Post by ${thread[0].id}: ${stripString(thread[0].message)}\n\n` +
        thread
            .slice(1)
            .filter((item) => item.id !== agent.id)
            .slice(-n)
            .map((item) => `Reply by ${item.id}: ${stripString(item.message)}`)
            .join('\n\n')
    ).trim()
}

function stripString(str) {
    return str.replace(/(\r\n|\n|\r)/gm, '').trim()
}

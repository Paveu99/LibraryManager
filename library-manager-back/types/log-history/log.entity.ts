export type Log = {
    id: number,
    timestamp: string,
    user_id: string,
    action: string,
    details: string
}

export type LogDto = Omit<Log, "id">
export const useApi = () => {
    const call = async <R, P = object>(
        url: string,
        method: "GET" | "DELETE" | "POST" | "PATCH",
        body?: P,
        id?: string
    ) => {
        const commonData = {
            method: method,
            headers: {
                "Content-Type": "application/json",
                ...(!!id ? { "x-user-id": id } : {}),
            },
        };

        const reqData = body
            ? {
                ...commonData,
                body: JSON.stringify(body),
            }
            : commonData

        try {
            const res = await fetch("http://localhost:3001/" + url, reqData)

            if (res.ok) {
                const data = await res.json();

                const preciseData: R = data.data

                return preciseData
            } else {
                const errorResponse = await res.json();
                throw new Error(errorResponse.error?.message || "Unknown error occurred");
            }
        } catch (error: any) {
            throw new Error(error.message || "Error occurred!");
        }
    }

    const apiDelete = async <R>(url: string, id?: string) => {
        return await call<R>(url, "DELETE", undefined, id)
    }

    const apiGet = async <R>(url: string, id?: string) => {
        return await call<R>(url, "GET", undefined, id)
    }

    const apiPost = async <R, P>(url: string, data: P, id?: string) => {
        return await call<R, P>(url, "POST", data, id)
    }

    const apiPatch = async <R, P>(url: string, data: P, id?: string) => {
        return await call<R, P>(url, "PATCH", data, id)
    }

    return {
        apiGet,
        apiDelete,
        apiPost,
        apiPatch,
    }
}

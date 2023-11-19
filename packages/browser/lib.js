let _endpoint = "/api/action";

export function useEndpoint(endpoint) {
    _endpoint = endpoint;
}

export function useMethod(method) {
    _method = method;
}

export function action(definition) {
    const defaultOptions = {
        headers: {},
    };
    return {
        callback(args, options, cb) {
            this.call(args, options)
                .then(res => cb(null, res))
                .catch(err => cb(err));
        },
        async call(args, options = defaultOptions) {
            try {
                const res = await fetch(_endpoint + "?id=" + encodeURIComponent(definition.id), {
                    ...options,
                    method: "POST",
                    headers: {
                        ...options.headers,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ id: definition.id, args })
                });
                const json = await res.json();
                if (res.status === 404) throw new Error("Action not found");
                if (res.status !== 200) throw json.result;
                return json.result;
            } catch (error) {
                throw error;
            }
        }
    }
}

const actionHandlers = new Map();

export function action(Action) {
    return {
        implement(handler) {
            actionHandlers.set(Action.id, handler);
        },
        async call(req, args) {
            if (!actionHandlers.has(Action.id)) throw new Error("Action handler not found");
            const handler = actionHandlers.get(Action.id);
            return await handler(req, args);
        }
    }
}

export function endpoint() {
    return async (req, res) => {
        try {
            const body = req.body;
            if (!actionHandlers.has(body.id)) return res.status(404).end();
            const handler = actionHandlers.get(body.id);
            const result = await handler(req, body.args);
            return res.json({ result: result || null });
        } catch (error) {
            return res.status(500).json({ result: error });
        }
    }
}
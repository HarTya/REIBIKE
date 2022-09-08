import { errorHandler } from 'src/helpers/api';

export { apiHandler };

function apiHandler(handler) {
    return async (req, res) => {
        try {
            await handler(req, res);
        } catch (err) {
            errorHandler(err, res);
        }
    }
}
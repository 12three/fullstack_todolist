class AuthError extends Error {
    constructor(msg, status) {
        super(msg);

        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
        this.status = status || 500;
    }
}

module.exports = AuthError;

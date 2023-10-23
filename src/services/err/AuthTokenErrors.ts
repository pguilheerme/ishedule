export class AuthTokenErrors extends Error {
    constructor(){
        super('Error with authentication tokem.')
    }
}
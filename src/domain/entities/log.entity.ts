export enum LogServerityLevel {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export class LogEntity {

    public message: string;
    public level: LogServerityLevel;
    public createdAt: Date;

    constructor( message: string, level: LogServerityLevel ) {
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
    }
    
}
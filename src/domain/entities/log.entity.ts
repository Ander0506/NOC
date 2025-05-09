export enum LogServerityLevel {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export class LogEntity {

    public message: string;
    public level: LogServerityLevel;
    public createdAt: Date;

    constructor( message: string, level: LogServerityLevel, createdAt?: Date ) {
        this.message = message;
        this.level = level;
        this.createdAt = createdAt ?? new Date();
    }

    static fromJson = ( json: Map<string, any> ): LogEntity => new LogEntity( 
        json.get('message') ?? 'not message', 
        json.get('level') ?? LogServerityLevel.LOW,
        new Date( json.get('createdAt'))
    );

    // static fromJson ( json: string ): LogEntity {
    //     const { message, level, createdAt } = JSON.parse( json );
    //     const log = new LogEntity( message, level);
    //     log.createdAt = new Date( createdAt );

    //     return log;
    // }
    
}
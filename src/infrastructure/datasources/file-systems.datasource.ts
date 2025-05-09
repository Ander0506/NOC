import fs from 'fs';

import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";

export class FileSystemsDatasource implements LogDatasource {

    private readonly logPath: string = 'logs/';
    private readonly allLogsPath: string = 'logs/logs-all.log';
    private readonly mediumLogsPath: string = 'logs/logs-medium.log';
    private readonly highLogsPath: string = 'logs/logs-high.log';

    private readonly listPaths: string[] = [
        this.allLogsPath,
        this.mediumLogsPath,
        this.highLogsPath
    ]

    constructor () {
        this.createLogsFiles();
    }

    private createLogsFiles() {
        if ( !fs.existsSync(this.logPath)) {
            fs.mkdirSync( this.logPath)
        }

        this.listPaths.forEach( path => {
            if ( fs.existsSync( path ) ) return;
            fs.writeFileSync( path, '');
        })
    }

    private getLogsFronFile( path: string ): LogEntity[] {
        const content = fs.readFileSync( path, 'utf-8');

        const logs = content.split('\n').map( log =>  LogEntity.fromJson(JSON.parse(log)) );

        return logs;

    }


    async saveLog(newLog: LogEntity): Promise<void> {

        const logAsJson =  `${ JSON.stringify(newLog) }\n`;

        fs.appendFileSync( this.allLogsPath, logAsJson);

        switch (newLog.level) {
            case LogServerityLevel.MEDIUM:
                fs.appendFileSync( this.mediumLogsPath, logAsJson);
                break;
            case LogServerityLevel.HIGH:
                fs.appendFileSync( this.highLogsPath, logAsJson);
                break;
        
            default:
                break;
        }

    }

    async getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
        
        switch (severityLevel) {
            case LogServerityLevel.LOW:
                return this.getLogsFronFile(this.allLogsPath);
            case LogServerityLevel.MEDIUM:
                return this.getLogsFronFile(this.mediumLogsPath);;
            case LogServerityLevel.HIGH:
                return this.getLogsFronFile(this.highLogsPath);;
        
            default:
                throw new Error(`${ severityLevel } not implemented`);
        }
    }
    
}
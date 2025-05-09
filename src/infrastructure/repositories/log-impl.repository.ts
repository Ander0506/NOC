import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repositories/log.repository";

export class LogImplRepository implements LogRepository {

    constructor(
        private readonly logDatasource: LogDatasource,
    ) {}

    async saveLog(log: LogEntity): Promise<void> {
        this.logDatasource.saveLog(log);
    }

    async getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLogs(severityLevel);
    }

}
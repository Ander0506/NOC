import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemsDatasource } from "../infrastructure/datasources/file-systems.datasource";
import { LogImplRepository } from "../infrastructure/repositories/log-impl.repository";
import { CronService } from "./cron/cron-service";


const fileSystemLogRepository = new LogImplRepository(
    new FileSystemsDatasource()
);

export class Server {

    public static start() {
        console.log('Server started ...');

        CronService.createJob(
            '*/5 * * * * *', // Every 5 minutes
            () => {
                // new CheckService().execute('http://localhost:3000/');
                const url = 'http://localhost:3000/';
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log(`${ url } is ok`),
                    (error: string) => console.log(`${error}`),
                ).execute(url);
            }
        ); // Start the cron job
    }

}
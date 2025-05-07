import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Server {

    public static start() {
        console.log('Server started ...');

        CronService.createJob(
            '*/5 * * * * *', // Every 5 minutes
            () => {
                // new CheckService().execute('http://localhost:3000/');
                const url = 'https://google.com';
                new CheckService(
                    () => console.log(`${ url } is ok`),
                    (error: string) => console.log(`${error}`),
                ).execute(url);
            }
        ); // Start the cron job
    }

}
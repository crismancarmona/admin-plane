import { Module } from "@nestjs/common";
import { ProcessManagerDocker } from "./process-manager.docker";
import { ProcessManagerPM2 } from "./process-manager.pm2";

@Module({
  providers: [ProcessManagerDocker, ProcessManagerPM2],
  exports: [ProcessManagerDocker, ProcessManagerPM2]
})
export class ProcessManagerModule { }
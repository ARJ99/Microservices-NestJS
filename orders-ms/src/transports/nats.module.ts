
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATS_SERVICE } from '../config/services';
import { envs } from '../config';



@Module({
    imports: [ClientsModule.register([
        {
            name: NATS_SERVICE,
            transport: Transport.NATS,
            options: {
                servers: envs.natsServers
            }
        },
    ])],
    controllers: [],
    providers: [],
    exports: [ClientsModule.register([
        {
            name: NATS_SERVICE,
            transport: Transport.NATS,
            options: {
                servers: envs.natsServers
            }
        },
    ])]
})
export class NatsModule { }
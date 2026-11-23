import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';;
import { NatsModule } from '../transports/nats.module';


@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    NatsModule
    // ClientsModule.register([
    //   {
    //     name: NATS_SERVICE,
    //     transport: Transport.NATS,
    //     options: {
    //       servers: envs.natsServers
    //     }
    //   },
    // ]),
  ]
})
export class ProductsModule { }

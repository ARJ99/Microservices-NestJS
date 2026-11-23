import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
// import { ClientsModule, Transport } from '@nestjs/microservices';
//import { envs } from '../config';
// import { PRODUCT_SERVICE } from '../config/services';
import { NatsModule } from '../transports/nats.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    NatsModule
    // ClientsModule.register([
    //   {
    //     name: PRODUCT_SERVICE,
    //     transport: Transport.TCP,
    //     options: {
    //       host: envs.productsMicroserviceHost,
    //       port: envs.productsMicroservicePort
    //     }
    //   },
    // ]),

  ]
})
export class OrdersModule { }

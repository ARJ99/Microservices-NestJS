import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { NATS_SERVICE, PRODUCT_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from '../common';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateProductDto } from '../common/dto/create-product.dto';
import { UpdateProductDto } from '../common/dto/update-product.dto';


@Controller('products')
export class ProductsController {

  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) { }

  @Post()
  createProduct(@Body() createProduct: CreateProductDto) {
    return this.client.send({ cmd: 'create_product' }, createProduct)
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.client.send({ cmd: 'find_all_product' }, paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {

    try {
      //firstValueFrom: Converts that Observable into a Promise for clean `await` 
      //when you expect one response.
      const product = await firstValueFrom(
        this.client.send({ cmd: 'find_one_product' }, { id: id })
      );

      return product;

    } catch (error) {
      throw new RpcException(error as { status: number | string; message: string });
    }
  }

  @Patch(':id')
  patchProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.client.send({ cmd: 'update_product' }, { id, ...updateProductDto })
      .pipe(
        catchError((err) => { throw new RpcException(err) })
      );
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'remove_product' }, { id })
      .pipe(
        catchError((err) => { throw new RpcException(err) })
      );
  }
}

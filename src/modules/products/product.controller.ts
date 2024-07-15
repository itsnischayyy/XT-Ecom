import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProductEntity } from './entities/product.entity';
import { ProductsService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../utility/decorators/current-user.decorator';
import { UnitOfWork } from '../utility/common/unit-of-work';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService,
    private readonly unitOfWork: UnitOfWork,
  ) {}

//   @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createProductDto: CreateProductDto, @CurrentUser() user: any): Promise<ProductEntity> {
    return await this.unitOfWork.run(async (queryRunner) => {
    console.log('user', user);
    return this.productsService.create(createProductDto, user, queryRunner);
  });
  }

  @Get()
  async findAll(): Promise<ProductEntity[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductEntity> {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { UpdateInventoryDto } from './dtos/update-inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  update(@Body() updateInventoryDto: UpdateInventoryDto) {
    return this.inventoryService.update(updateInventoryDto);
  }

  @Get(':productId')
  getInventory(@Param('productId') productId: string) {
    return this.inventoryService.getInventory(productId);
  }
}

import { Injectable } from '@nestjs/common';
import { UpdateInventoryDto } from './dtos/update-inventory.dto';
import { InventoryEntity } from './entities/inventory.entity';

@Injectable()
export class InventoryService {
  private inventory: InventoryEntity[] = [];

  update(updateInventoryDto: UpdateInventoryDto): InventoryEntity {
    const { productId, quantity } = updateInventoryDto;
    const inventoryIndex = this.inventory.findIndex(inv => inv.productId === productId);
    if (inventoryIndex > -1) {
      this.inventory[inventoryIndex].quantity = quantity;
      return this.inventory[inventoryIndex];
    } else {
      const newInventory = { productId, quantity };
      this.inventory.push(newInventory);
      return newInventory;
    }
  }

  getInventory(productId: string): InventoryEntity {
    return this.inventory.find(inv => inv.productId === productId);
  }
}

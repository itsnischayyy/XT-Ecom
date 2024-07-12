import { Injectable } from '@nestjs/common';
import { UnitOfWork } from '../common/unit-of-work';

export function Transactional() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const unitOfWork = this.unitOfWork as UnitOfWork;
      if (!unitOfWork) {
        throw new Error('UnitOfWork not found on the class instance.');
      }

      return await unitOfWork.run(async () => {
        return await originalMethod.apply(this, args);
      });
    };

    return descriptor;
  };
}

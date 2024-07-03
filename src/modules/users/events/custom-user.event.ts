// src/users/events/user-registered.event.ts
export class CustomUserEvent {
    constructor(
      public readonly userDto: any,
    ) {}
  }
  
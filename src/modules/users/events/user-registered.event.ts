// src/users/events/user-registered.event.ts
export class UserRegisteredEvent {
    constructor(
      public readonly userId: number,
      public readonly email: string,
    ) {}
  }
  
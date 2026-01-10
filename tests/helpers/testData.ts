import { faker } from '@faker-js/faker';

/**
 * Interface representing checkout information.
 */
export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  zipCode: string;
}

/**
 * Generates random checkout information using Faker.
 * 
 * @returns An object containing first name, last name, and zip code.
 */
export function generateRandomCheckoutInfo(): CheckoutInfo {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    zipCode: faker.location.zipCode(),
  };
}
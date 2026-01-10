/**
 * Generates a random first name.
 *
 * @returns A random first name string.
 */
export function getRandomFirstName(): string {
  const firstNames = [
    'John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'James', 'Emma',
    'Robert', 'Olivia', 'William', 'Sophia', 'Richard', 'Isabella', 'Joseph', 'Mia',
    'Thomas', 'Charlotte', 'Charles', 'Amelia', 'Daniel', 'Harper', 'Matthew', 'Evelyn'
  ];
  return firstNames[Math.floor(Math.random() * firstNames.length)];
}

/**
 * Generates a random last name.
 *
 * @returns A random last name string.
 */
export function getRandomLastName(): string {
  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Wilson', 'Anderson', 'Thomas', 'Taylor',
    'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White', 'Harris', 'Clark'
  ];
  return lastNames[Math.floor(Math.random() * lastNames.length)];
}

/**
 * Generates a random 5-digit zip code.
 *
 * @returns A random zip code string.
 */
export function getRandomZipCode(): string {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

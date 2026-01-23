import { mergeTests, expect as baseExpect } from '@playwright/test';
import { test as authTest } from './auth';
import { test as checkoutTest } from './checkout';

export const test = mergeTests(authTest, checkoutTest);
export const expect = baseExpect;

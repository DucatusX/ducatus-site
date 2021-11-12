import BigNumber from 'bignumber.js/bignumber';
import { contracts } from '../config';

const { contract } = contracts;

export const normalizedValue = (contractName: string, value: string | number, fixed?: number): number => {
  const decimals = 10 ** contract[contractName.toUpperCase()].params.decimals;
  const amount = new BigNumber(value).div(decimals).toNumber();
  return fixed === 0 ? +amount : +amount.toFixed(fixed || 4);
};

export const deNormalizedValue = (contractName: string, value: string | number): string => {
  const decimals = 10 ** contract[contractName.toUpperCase()].params.decimals;
  const amount = new BigNumber(value).multipliedBy(decimals).toString(10);
  return amount;
};

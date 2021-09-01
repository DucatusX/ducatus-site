import { IChain } from '@amfi/connect-wallet/dist/interface';
import { IChainConfig, IConnectWallet, IContracts } from '../interfaces';

export const isProduction = false;

export const wallets: string[] = ['MetaMask', 'WalletConnect'];

export const blockchains: IChain[] = [
  {
    name: 'binance',
    chainID: 56,
    hex: '0x38',
  },
  {
    name: 'binance-test',
    chainID: 97,
    hex: '0x61',
  },
];

export const chains: IChainConfig = {
  BinanceSmartChain: {
    name: isProduction ? 'Binance Smart Chain Mainnet' : 'Binance Smart Chain Testnet',
    id: isProduction ? 56 : 97,
    rpc: isProduction ? 'https://bsc-dataseed1.binance.org' : 'https://data-seed-prebsc-1-s1.binance.org:8545',
    tx: {
      link: isProduction ? 'https://bsc-dataseed1.binance.org' : 'https://testnet.hecoinfo.com/tx',
    },
    nativeCurrency: {
      name: isProduction ? 'BNB' : 'tBNB',
      symbol: isProduction ? 'BNB' : 'tBNB',
      decimals: 18,
    },
    blockExp: isProduction ? 'https://bscscan.com' : 'https://testnet.bscscan.com',
    useProvider: 'rpc',
  },
};

export const getConnectWalletInfo = (chainName: string): IConnectWallet => {
  const chain = chains[chainName];

  return {
    network: {
      name: chain.name,
      chainID: chain.id,
    },
    provider: {
      MetaMask: { name: 'MetaMask' },
      WalletConnect: {
        name: 'WalletConnect',
        useProvider: chain.useProvider,
        provider: {
          rpc: {
            rpc: {
              [chain.id]: chain.rpc,
            },
            chainId: chain.id,
          },
        },
      },
    },
    settings: { providerType: true },
  };
};

export const contracts: IContracts = {
  type: isProduction ? 'mainnet' : 'testnet',
  // names: ['Token'],
  names: [],
  decimals: 18,
  params: {
    TOKEN: {
      mainnet: {
        address: '0x410a56541bD912F9B60943fcB344f1E3D6F09567',
        abi: [
          { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
          {
            anonymous: false,
            inputs: [
              { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
              { indexed: true, internalType: 'address', name: 'spender', type: 'address' },
              { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
            ],
            name: 'Approval',
            type: 'event',
          },
          {
            anonymous: false,
            inputs: [
              { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
              { indexed: true, internalType: 'address', name: 'spender', type: 'address' },
              { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'ApprovalLocked',
            type: 'event',
          },
          {
            anonymous: false,
            inputs: [
              { indexed: true, internalType: 'address', name: 'farm', type: 'address' },
              { indexed: false, internalType: 'bool', name: 'isFarmNow', type: 'bool' },
            ],
            name: 'FarmStatusChanged',
            type: 'event',
          },
          {
            anonymous: false,
            inputs: [
              { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
              {
                indexed: true,
                internalType: 'bytes32',
                name: 'previousAdminRole',
                type: 'bytes32',
              },
              { indexed: true, internalType: 'bytes32', name: 'newAdminRole', type: 'bytes32' },
            ],
            name: 'RoleAdminChanged',
            type: 'event',
          },
          {
            anonymous: false,
            inputs: [
              { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
              { indexed: true, internalType: 'address', name: 'account', type: 'address' },
              { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
            ],
            name: 'RoleGranted',
            type: 'event',
          },
          {
            anonymous: false,
            inputs: [
              { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
              { indexed: true, internalType: 'address', name: 'account', type: 'address' },
              { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
            ],
            name: 'RoleRevoked',
            type: 'event',
          },
          {
            anonymous: false,
            inputs: [
              { indexed: true, internalType: 'address', name: 'from', type: 'address' },
              { indexed: true, internalType: 'address', name: 'to', type: 'address' },
              { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
            ],
            name: 'Transfer',
            type: 'event',
          },
          {
            anonymous: false,
            inputs: [
              { indexed: true, internalType: 'address', name: 'from', type: 'address' },
              { indexed: true, internalType: 'address', name: 'to', type: 'address' },
              { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'TransferLocked',
            type: 'event',
          },
          {
            inputs: [],
            name: 'DEFAULT_ADMIN_ROLE',
            outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [],
            name: 'MINTER_ROLE',
            outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [{ internalType: 'address', name: 'farm', type: 'address' }],
            name: 'addFarm',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: '', type: 'address' },
              { internalType: 'uint256', name: '', type: 'uint256' },
            ],
            name: 'allMints',
            outputs: [
              { internalType: 'uint256', name: 'time', type: 'uint256' },
              { internalType: 'uint256', name: 'total', type: 'uint256' },
              { internalType: 'uint256', name: 'alreadyUnlocked', type: 'uint256' },
              { internalType: 'uint256', name: 'transferredAsLocked', type: 'uint256' },
            ],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
            name: 'allMintsLength',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'owner', type: 'address' },
              { internalType: 'address', name: 'spender', type: 'address' },
            ],
            name: 'allowance',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'spender', type: 'address' },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'approve',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'to', type: 'address' },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'approveLocked',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
            name: 'balanceOf',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
            name: 'balanceOfLocked',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
            name: 'balanceOfSum',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
            name: 'burn',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'account', type: 'address' },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'burnFrom',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'from', type: 'address' },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'burnFromLocked',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
            name: 'burnLocked',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [],
            name: 'decimals',
            outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'spender', type: 'address' },
              { internalType: 'uint256', name: 'subtractedValue', type: 'uint256' },
            ],
            name: 'decreaseAllowance',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'to', type: 'address' },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'decreaseLockedAllowance',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
            name: 'getRoleAdmin',
            outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'bytes32', name: 'role', type: 'bytes32' },
              { internalType: 'address', name: 'account', type: 'address' },
            ],
            name: 'grantRole',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'bytes32', name: 'role', type: 'bytes32' },
              { internalType: 'address', name: 'account', type: 'address' },
            ],
            name: 'hasRole',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'spender', type: 'address' },
              { internalType: 'uint256', name: 'addedValue', type: 'uint256' },
            ],
            name: 'increaseAllowance',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'to', type: 'address' },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'increaseLockedAllowance',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [{ internalType: 'address', name: '', type: 'address' }],
            name: 'index',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: '', type: 'address' },
              { internalType: 'address', name: '', type: 'address' },
            ],
            name: 'lockedAllowances',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'to', type: 'address' },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
              { internalType: 'uint256', name: 'timeInWeeks', type: 'uint256' },
            ],
            name: 'mintLocked',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [],
            name: 'name',
            outputs: [{ internalType: 'string', name: '', type: 'string' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [{ internalType: 'address', name: 'farm', type: 'address' }],
            name: 'removeFarm',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'bytes32', name: 'role', type: 'bytes32' },
              { internalType: 'address', name: 'account', type: 'address' },
            ],
            name: 'renounceRole',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'bytes32', name: 'role', type: 'bytes32' },
              { internalType: 'address', name: 'account', type: 'address' },
            ],
            name: 'revokeRole',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
            name: 'supportsInterface',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [],
            name: 'symbol',
            outputs: [{ internalType: 'string', name: '', type: 'string' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [],
            name: 'totalSupply',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'recipient', type: 'address' },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'transfer',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'to', type: 'address' },
              { internalType: 'uint256', name: 'amountLocked', type: 'uint256' },
              { internalType: 'uint256', name: 'amountUnlocked', type: 'uint256' },
              { internalType: 'uint256[]', name: 'farmIndexes', type: 'uint256[]' },
            ],
            name: 'transferFarm',
            outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'sender', type: 'address' },
              { internalType: 'address', name: 'recipient', type: 'address' },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'transferFrom',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'from', type: 'address' },
              { internalType: 'uint256', name: 'amountLocked', type: 'uint256' },
              { internalType: 'uint256', name: 'amountUnlocked', type: 'uint256' },
            ],
            name: 'transferFromFarm',
            outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'from', type: 'address' },
              { internalType: 'address', name: 'to', type: 'address' },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'transferFromLocked',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'to', type: 'address' },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'transferLocked',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'who', type: 'address' },
              { internalType: 'uint256', name: 'numberOfBlocks', type: 'uint256' },
            ],
            name: 'unlock',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
        ],
      },
      testnet: {
        address: '0xe0aC1E17D4810d7d7a4680d825233e75960342b7',
        abi: [
          { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
          {
            anonymous: false,
            inputs: [
              { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
              { indexed: true, internalType: 'address', name: 'spender', type: 'address' },
              { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
            ],
            name: 'Approval',
            type: 'event',
          },
          {
            anonymous: false,
            inputs: [
              { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
              { indexed: true, internalType: 'address', name: 'spender', type: 'address' },
              { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'ApprovalLocked',
            type: 'event',
          },
          {
            anonymous: false,
            inputs: [
              { indexed: true, internalType: 'address', name: 'farm', type: 'address' },
              { indexed: false, internalType: 'bool', name: 'isFarmNow', type: 'bool' },
            ],
            name: 'FarmStatusChanged',
            type: 'event',
          },
          {
            anonymous: false,
            inputs: [
              { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
              {
                indexed: true,
                internalType: 'bytes32',
                name: 'previousAdminRole',
                type: 'bytes32',
              },
              { indexed: true, internalType: 'bytes32', name: 'newAdminRole', type: 'bytes32' },
            ],
            name: 'RoleAdminChanged',
            type: 'event',
          },
          {
            anonymous: false,
            inputs: [
              { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
              { indexed: true, internalType: 'address', name: 'account', type: 'address' },
              { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
            ],
            name: 'RoleGranted',
            type: 'event',
          },
          {
            anonymous: false,
            inputs: [
              { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
              { indexed: true, internalType: 'address', name: 'account', type: 'address' },
              { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
            ],
            name: 'RoleRevoked',
            type: 'event',
          },
          {
            anonymous: false,
            inputs: [
              { indexed: true, internalType: 'address', name: 'from', type: 'address' },
              { indexed: true, internalType: 'address', name: 'to', type: 'address' },
              { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
            ],
            name: 'Transfer',
            type: 'event',
          },
          {
            anonymous: false,
            inputs: [
              { indexed: true, internalType: 'address', name: 'from', type: 'address' },
              { indexed: true, internalType: 'address', name: 'to', type: 'address' },
              { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'TransferLocked',
            type: 'event',
          },
          {
            inputs: [],
            name: 'DEFAULT_ADMIN_ROLE',
            outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [],
            name: 'MINTER_ROLE',
            outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [{ internalType: 'address', name: 'farm', type: 'address' }],
            name: 'addFarm',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: '', type: 'address' },
              { internalType: 'uint256', name: '', type: 'uint256' },
            ],
            name: 'allMints',
            outputs: [
              { internalType: 'uint256', name: 'time', type: 'uint256' },
              { internalType: 'uint256', name: 'total', type: 'uint256' },
              { internalType: 'uint256', name: 'alreadyUnlocked', type: 'uint256' },
              { internalType: 'uint256', name: 'transferredAsLocked', type: 'uint256' },
            ],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
            name: 'allMintsLength',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'owner', type: 'address' },
              { internalType: 'address', name: 'spender', type: 'address' },
            ],
            name: 'allowance',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'spender', type: 'address' },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'approve',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'to', type: 'address' },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'approveLocked',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
            name: 'balanceOf',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
            name: 'balanceOfLocked',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
            name: 'balanceOfSum',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
            name: 'burn',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'account', type: 'address' },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'burnFrom',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'from', type: 'address' },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'burnFromLocked',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
            name: 'burnLocked',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [],
            name: 'decimals',
            outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'spender', type: 'address' },
              { internalType: 'uint256', name: 'subtractedValue', type: 'uint256' },
            ],
            name: 'decreaseAllowance',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'to', type: 'address' },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'decreaseLockedAllowance',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
            name: 'getRoleAdmin',
            outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'bytes32', name: 'role', type: 'bytes32' },
              { internalType: 'address', name: 'account', type: 'address' },
            ],
            name: 'grantRole',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'bytes32', name: 'role', type: 'bytes32' },
              { internalType: 'address', name: 'account', type: 'address' },
            ],
            name: 'hasRole',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'spender', type: 'address' },
              { internalType: 'uint256', name: 'addedValue', type: 'uint256' },
            ],
            name: 'increaseAllowance',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'to', type: 'address' },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'increaseLockedAllowance',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [{ internalType: 'address', name: '', type: 'address' }],
            name: 'index',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: '', type: 'address' },
              { internalType: 'address', name: '', type: 'address' },
            ],
            name: 'lockedAllowances',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'to', type: 'address' },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
              { internalType: 'uint256', name: 'timeInWeeks', type: 'uint256' },
            ],
            name: 'mintLocked',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [],
            name: 'name',
            outputs: [{ internalType: 'string', name: '', type: 'string' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [{ internalType: 'address', name: 'farm', type: 'address' }],
            name: 'removeFarm',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'bytes32', name: 'role', type: 'bytes32' },
              { internalType: 'address', name: 'account', type: 'address' },
            ],
            name: 'renounceRole',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'bytes32', name: 'role', type: 'bytes32' },
              { internalType: 'address', name: 'account', type: 'address' },
            ],
            name: 'revokeRole',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
            name: 'supportsInterface',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [],
            name: 'symbol',
            outputs: [{ internalType: 'string', name: '', type: 'string' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [],
            name: 'totalSupply',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'recipient', type: 'address' },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'transfer',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'to', type: 'address' },
              { internalType: 'uint256', name: 'amountLocked', type: 'uint256' },
              { internalType: 'uint256', name: 'amountUnlocked', type: 'uint256' },
              { internalType: 'uint256[]', name: 'farmIndexes', type: 'uint256[]' },
            ],
            name: 'transferFarm',
            outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'sender', type: 'address' },
              { internalType: 'address', name: 'recipient', type: 'address' },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'transferFrom',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'from', type: 'address' },
              { internalType: 'uint256', name: 'amountLocked', type: 'uint256' },
              { internalType: 'uint256', name: 'amountUnlocked', type: 'uint256' },
            ],
            name: 'transferFromFarm',
            outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'from', type: 'address' },
              { internalType: 'address', name: 'to', type: 'address' },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'transferFromLocked',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'to', type: 'address' },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'transferLocked',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'who', type: 'address' },
              { internalType: 'uint256', name: 'numberOfBlocks', type: 'uint256' },
            ],
            name: 'unlock',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
        ],
      },
    },
  },
};

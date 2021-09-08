import { IChain } from '@amfi/connect-wallet/dist/interface';
import { IChainConfig, IConnectWallet, IContracts } from '../interfaces';

export const isProduction = true;

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
  names: ['Token', 'Swap'],
  contract: {
    TOKEN: {
      params: {
        decimals: 18,
      },
      chain: {
        mainnet: {
          address: '0xeAC4cC67f1200D24c1eF6cfb96db6f51cB62B6e2',
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
                { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
                { indexed: true, internalType: 'bytes32', name: 'previousAdminRole', type: 'bytes32' },
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
            { inputs: [], name: 'BACKEND_ROLE', outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'DEFAULT_ADMIN_ROLE', outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }], stateMutability: 'view', type: 'function' },
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
            { inputs: [{ internalType: 'address', name: 'account', type: 'address' }], name: 'balanceOf', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'currentDay', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'decimals', outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }], stateMutability: 'view', type: 'function' },
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
            { inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }], name: 'getRoleAdmin', outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }], stateMutability: 'view', type: 'function' },
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
            { inputs: [], name: 'name', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'notMintedYet', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
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
            { inputs: [], name: 'scheduledMint', outputs: [], stateMutability: 'nonpayable', type: 'function' },
            { inputs: [{ internalType: 'address', name: '_swapAddress', type: 'address' }], name: 'setSwapAddress', outputs: [], stateMutability: 'nonpayable', type: 'function' },
            { inputs: [{ internalType: 'address', name: '_teamAddress', type: 'address' }], name: 'setTeamAddress', outputs: [], stateMutability: 'nonpayable', type: 'function' },
            { inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }], name: 'supportsInterface', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'swapAddress', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'symbol', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'targetTotalSupply', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'teamAddress', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'timeStarted', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'totalSupply', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
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
                { internalType: 'address', name: 'sender', type: 'address' },
                { internalType: 'address', name: 'recipient', type: 'address' },
                { internalType: 'uint256', name: 'amount', type: 'uint256' },
              ],
              name: 'transferFrom',
              outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
              stateMutability: 'nonpayable',
              type: 'function',
            },
          ],
        },
        testnet: {
          address: '0xC3ff779C932B6f75716c159318C02cF52cCB4056',
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
                { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
                { indexed: true, internalType: 'bytes32', name: 'previousAdminRole', type: 'bytes32' },
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
            { inputs: [], name: 'BACKEND_ROLE', outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'DEFAULT_ADMIN_ROLE', outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }], stateMutability: 'view', type: 'function' },
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
            { inputs: [{ internalType: 'address', name: 'account', type: 'address' }], name: 'balanceOf', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'currentDay', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'decimals', outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }], stateMutability: 'view', type: 'function' },
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
            { inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }], name: 'getRoleAdmin', outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }], stateMutability: 'view', type: 'function' },
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
            { inputs: [], name: 'name', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'notMintedYet', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
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
            { inputs: [], name: 'scheduledMint', outputs: [], stateMutability: 'nonpayable', type: 'function' },
            { inputs: [{ internalType: 'address', name: '_swapAddress', type: 'address' }], name: 'setSwapAddress', outputs: [], stateMutability: 'nonpayable', type: 'function' },
            { inputs: [{ internalType: 'address', name: '_teamAddress', type: 'address' }], name: 'setTeamAddress', outputs: [], stateMutability: 'nonpayable', type: 'function' },
            { inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }], name: 'supportsInterface', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'swapAddress', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'symbol', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'targetTotalSupply', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'teamAddress', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'timeStarted', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'totalSupply', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
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
                { internalType: 'address', name: 'sender', type: 'address' },
                { internalType: 'address', name: 'recipient', type: 'address' },
                { internalType: 'uint256', name: 'amount', type: 'uint256' },
              ],
              name: 'transferFrom',
              outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
              stateMutability: 'nonpayable',
              type: 'function',
            },
          ],
        },
      },
    },
    SWAP: {
      chain: {
        mainnet: {
          address: '0x83C15Aed08147083BC23D53703547EE7Db5D1D96',
          abi: [
            {
              inputs: [
                { internalType: 'contract IERC20', name: '_tokenAddress', type: 'address' },
                { internalType: 'address', name: '_feeAddress', type: 'address' },
                { internalType: 'uint128', name: '_numOfThisBlockchain', type: 'uint128' },
                { internalType: 'uint128[]', name: '_numsOfOtherBlockchains', type: 'uint128[]' },
                { internalType: 'uint256', name: '_minTokenAmount', type: 'uint256' },
                { internalType: 'uint256', name: '_maxGasPrice', type: 'uint256' },
              ],
              stateMutability: 'nonpayable',
              type: 'constructor',
            },
            { anonymous: false, inputs: [{ indexed: false, internalType: 'address', name: 'account', type: 'address' }], name: 'Paused', type: 'event' },
            {
              anonymous: false,
              inputs: [
                { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
                { indexed: true, internalType: 'bytes32', name: 'previousAdminRole', type: 'bytes32' },
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
                { indexed: false, internalType: 'address', name: 'user', type: 'address' },
                { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
                { indexed: false, internalType: 'uint256', name: 'amountWithoutFee', type: 'uint256' },
                { indexed: false, internalType: 'bytes32', name: 'originalTxHash', type: 'bytes32' },
              ],
              name: 'TransferFromOtherBlockchain',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                { indexed: false, internalType: 'uint128', name: 'blockchain', type: 'uint128' },
                { indexed: false, internalType: 'address', name: 'user', type: 'address' },
                { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
                { indexed: false, internalType: 'string', name: 'newAddress', type: 'string' },
              ],
              name: 'TransferToOtherBlockchain',
              type: 'event',
            },
            { anonymous: false, inputs: [{ indexed: false, internalType: 'address', name: 'account', type: 'address' }], name: 'Unpaused', type: 'event' },
            { inputs: [], name: 'DEFAULT_ADMIN_ROLE', outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'MANAGER_ROLE', outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'OWNER_ROLE', outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }], stateMutability: 'view', type: 'function' },
            { inputs: [{ internalType: 'uint128', name: 'numOfOtherBlockchain', type: 'uint128' }], name: 'addOtherBlockchain', outputs: [], stateMutability: 'nonpayable', type: 'function' },
            { inputs: [{ internalType: 'address', name: 'newFeeAddress', type: 'address' }], name: 'changeFeeAddress', outputs: [], stateMutability: 'nonpayable', type: 'function' },
            {
              inputs: [
                { internalType: 'uint128', name: 'oldNumOfOtherBlockchain', type: 'uint128' },
                { internalType: 'uint128', name: 'newNumOfOtherBlockchain', type: 'uint128' },
              ],
              name: 'changeOtherBlockchain',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            { inputs: [], name: 'continueExecution', outputs: [], stateMutability: 'nonpayable', type: 'function' },
            { inputs: [{ internalType: 'uint128', name: '', type: 'uint128' }], name: 'existingOtherBlockchain', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'feeAddress', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
            { inputs: [{ internalType: 'uint128', name: '', type: 'uint128' }], name: 'feeAmountOfBlockchain', outputs: [{ internalType: 'uint128', name: '', type: 'uint128' }], stateMutability: 'view', type: 'function' },
            { inputs: [{ internalType: 'uint128', name: 'blockchain', type: 'uint128' }], name: 'getOtherBlockchainAvailableByNum', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
            { inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }], name: 'getRoleAdmin', outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }], stateMutability: 'view', type: 'function' },
            {
              inputs: [
                { internalType: 'bytes32', name: 'role', type: 'bytes32' },
                { internalType: 'uint256', name: 'index', type: 'uint256' },
              ],
              name: 'getRoleMember',
              outputs: [{ internalType: 'address', name: '', type: 'address' }],
              stateMutability: 'view',
              type: 'function',
            },
            { inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }], name: 'getRoleMemberCount', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
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
            { inputs: [{ internalType: 'address', name: 'account', type: 'address' }], name: 'isManager', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
            { inputs: [{ internalType: 'address', name: 'account', type: 'address' }], name: 'isOwner', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
            { inputs: [{ internalType: 'bytes32', name: 'originalTxHash', type: 'bytes32' }], name: 'isProcessedTransaction', outputs: [{ internalType: 'bool', name: 'processed', type: 'bool' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'maxGasPrice', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'minTokenAmount', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'numOfThisBlockchain', outputs: [{ internalType: 'uint128', name: '', type: 'uint128' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'pauseExecution', outputs: [], stateMutability: 'nonpayable', type: 'function' },
            { inputs: [], name: 'paused', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
            { inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }], name: 'processedTransactions', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
            { inputs: [{ internalType: 'uint128', name: 'numOfOtherBlockchain', type: 'uint128' }], name: 'removeOtherBlockchain', outputs: [], stateMutability: 'nonpayable', type: 'function' },
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
              inputs: [
                { internalType: 'uint128', name: 'blockchainNum', type: 'uint128' },
                { internalType: 'uint128', name: 'feeAmount', type: 'uint128' },
              ],
              name: 'setFeeAmountOfBlockchain',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            { inputs: [{ internalType: 'uint256', name: '_maxGasPrice', type: 'uint256' }], name: 'setMaxGasPrice', outputs: [], stateMutability: 'nonpayable', type: 'function' },
            { inputs: [{ internalType: 'uint256', name: '_minTokenAmount', type: 'uint256' }], name: 'setMinTokenAmount', outputs: [], stateMutability: 'nonpayable', type: 'function' },
            { inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }], name: 'supportsInterface', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'tokenAddress', outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
            {
              inputs: [
                { internalType: 'address', name: 'newOwner', type: 'address' },
                { internalType: 'address', name: 'newManager', type: 'address' },
              ],
              name: 'transferOwnerAndSetManager',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                { internalType: 'uint128', name: 'blockchain', type: 'uint128' },
                { internalType: 'uint256', name: 'amount', type: 'uint256' },
                { internalType: 'string', name: 'newAddress', type: 'string' },
              ],
              name: 'transferToOtherBlockchain',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                { internalType: 'address', name: 'user', type: 'address' },
                { internalType: 'uint256', name: 'amountWithFee', type: 'uint256' },
                { internalType: 'bytes32', name: 'originalTxHash', type: 'bytes32' },
              ],
              name: 'transferToUserWithFee',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                { internalType: 'address', name: 'user', type: 'address' },
                { internalType: 'uint256', name: 'amount', type: 'uint256' },
              ],
              name: 'transferToUserWithoutFee',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
          ],
        },
        testnet: {
          address: '0xEAE08205AA81187d0Dfa58d7236b2c551dc8d2E0',
          abi: [
            {
              inputs: [
                { internalType: 'contract IERC20', name: '_tokenAddress', type: 'address' },
                { internalType: 'address', name: '_feeAddress', type: 'address' },
                { internalType: 'uint128', name: '_numOfThisBlockchain', type: 'uint128' },
                { internalType: 'uint128[]', name: '_numsOfOtherBlockchains', type: 'uint128[]' },
                { internalType: 'uint256', name: '_minTokenAmount', type: 'uint256' },
                { internalType: 'uint256', name: '_maxGasPrice', type: 'uint256' },
              ],
              stateMutability: 'nonpayable',
              type: 'constructor',
            },
            { anonymous: false, inputs: [{ indexed: false, internalType: 'address', name: 'account', type: 'address' }], name: 'Paused', type: 'event' },
            {
              anonymous: false,
              inputs: [
                { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
                { indexed: true, internalType: 'bytes32', name: 'previousAdminRole', type: 'bytes32' },
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
                { indexed: false, internalType: 'address', name: 'user', type: 'address' },
                { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
                { indexed: false, internalType: 'uint256', name: 'amountWithoutFee', type: 'uint256' },
                { indexed: false, internalType: 'bytes32', name: 'originalTxHash', type: 'bytes32' },
              ],
              name: 'TransferFromOtherBlockchain',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                { indexed: false, internalType: 'uint128', name: 'blockchain', type: 'uint128' },
                { indexed: false, internalType: 'address', name: 'user', type: 'address' },
                { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
                { indexed: false, internalType: 'string', name: 'newAddress', type: 'string' },
              ],
              name: 'TransferToOtherBlockchain',
              type: 'event',
            },
            { anonymous: false, inputs: [{ indexed: false, internalType: 'address', name: 'account', type: 'address' }], name: 'Unpaused', type: 'event' },
            { inputs: [], name: 'DEFAULT_ADMIN_ROLE', outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'MANAGER_ROLE', outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'OWNER_ROLE', outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }], stateMutability: 'view', type: 'function' },
            { inputs: [{ internalType: 'uint128', name: 'numOfOtherBlockchain', type: 'uint128' }], name: 'addOtherBlockchain', outputs: [], stateMutability: 'nonpayable', type: 'function' },
            { inputs: [{ internalType: 'address', name: 'newFeeAddress', type: 'address' }], name: 'changeFeeAddress', outputs: [], stateMutability: 'nonpayable', type: 'function' },
            {
              inputs: [
                { internalType: 'uint128', name: 'oldNumOfOtherBlockchain', type: 'uint128' },
                { internalType: 'uint128', name: 'newNumOfOtherBlockchain', type: 'uint128' },
              ],
              name: 'changeOtherBlockchain',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            { inputs: [], name: 'continueExecution', outputs: [], stateMutability: 'nonpayable', type: 'function' },
            { inputs: [{ internalType: 'uint128', name: '', type: 'uint128' }], name: 'existingOtherBlockchain', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'feeAddress', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
            { inputs: [{ internalType: 'uint128', name: '', type: 'uint128' }], name: 'feeAmountOfBlockchain', outputs: [{ internalType: 'uint128', name: '', type: 'uint128' }], stateMutability: 'view', type: 'function' },
            { inputs: [{ internalType: 'uint128', name: 'blockchain', type: 'uint128' }], name: 'getOtherBlockchainAvailableByNum', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
            { inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }], name: 'getRoleAdmin', outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }], stateMutability: 'view', type: 'function' },
            {
              inputs: [
                { internalType: 'bytes32', name: 'role', type: 'bytes32' },
                { internalType: 'uint256', name: 'index', type: 'uint256' },
              ],
              name: 'getRoleMember',
              outputs: [{ internalType: 'address', name: '', type: 'address' }],
              stateMutability: 'view',
              type: 'function',
            },
            { inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }], name: 'getRoleMemberCount', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
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
            { inputs: [{ internalType: 'address', name: 'account', type: 'address' }], name: 'isManager', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
            { inputs: [{ internalType: 'address', name: 'account', type: 'address' }], name: 'isOwner', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
            { inputs: [{ internalType: 'bytes32', name: 'originalTxHash', type: 'bytes32' }], name: 'isProcessedTransaction', outputs: [{ internalType: 'bool', name: 'processed', type: 'bool' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'maxGasPrice', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'minTokenAmount', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'numOfThisBlockchain', outputs: [{ internalType: 'uint128', name: '', type: 'uint128' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'pauseExecution', outputs: [], stateMutability: 'nonpayable', type: 'function' },
            { inputs: [], name: 'paused', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
            { inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }], name: 'processedTransactions', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
            { inputs: [{ internalType: 'uint128', name: 'numOfOtherBlockchain', type: 'uint128' }], name: 'removeOtherBlockchain', outputs: [], stateMutability: 'nonpayable', type: 'function' },
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
              inputs: [
                { internalType: 'uint128', name: 'blockchainNum', type: 'uint128' },
                { internalType: 'uint128', name: 'feeAmount', type: 'uint128' },
              ],
              name: 'setFeeAmountOfBlockchain',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            { inputs: [{ internalType: 'uint256', name: '_maxGasPrice', type: 'uint256' }], name: 'setMaxGasPrice', outputs: [], stateMutability: 'nonpayable', type: 'function' },
            { inputs: [{ internalType: 'uint256', name: '_minTokenAmount', type: 'uint256' }], name: 'setMinTokenAmount', outputs: [], stateMutability: 'nonpayable', type: 'function' },
            { inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }], name: 'supportsInterface', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
            { inputs: [], name: 'tokenAddress', outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
            {
              inputs: [
                { internalType: 'address', name: 'newOwner', type: 'address' },
                { internalType: 'address', name: 'newManager', type: 'address' },
              ],
              name: 'transferOwnerAndSetManager',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                { internalType: 'uint128', name: 'blockchain', type: 'uint128' },
                { internalType: 'uint256', name: 'amount', type: 'uint256' },
                { internalType: 'string', name: 'newAddress', type: 'string' },
              ],
              name: 'transferToOtherBlockchain',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                { internalType: 'address', name: 'user', type: 'address' },
                { internalType: 'uint256', name: 'amountWithFee', type: 'uint256' },
                { internalType: 'bytes32', name: 'originalTxHash', type: 'bytes32' },
              ],
              name: 'transferToUserWithFee',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                { internalType: 'address', name: 'user', type: 'address' },
                { internalType: 'uint256', name: 'amount', type: 'uint256' },
              ],
              name: 'transferToUserWithoutFee',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
          ],
        },
      },
    },
  },
};

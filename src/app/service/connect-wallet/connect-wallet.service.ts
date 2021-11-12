import { Injectable } from '@angular/core';
import { ConnectWallet } from '@amfi/connect-wallet';
import { getConnectWalletInfo, contracts, chains, blockchains } from 'src/app/config';
import { IChainConfigData, IConnectWallet } from 'src/app/interfaces';
import BigNumber from 'bignumber.js';

@Injectable({
  providedIn: 'root',
})
export class ConnectWalletService {
  public connectInfo: IConnectWallet;
  public chain: IChainConfigData;

  constructor(private connectWallet: ConnectWallet) {}

  public async initWalletConnect(connectName: string, chainName: string): Promise<boolean> {
    const chainsInfo = this.connectWallet.addChains(blockchains);
    console.log('chainsInfo:', chainsInfo);

    this.connectInfo = getConnectWalletInfo(chainName);
    this.chain = chains[chainName];
    const { provider, network, settings } = this.connectInfo;

    const connecting = this.connectWallet
      .connect(provider[connectName], network, settings)
      .then((connected: boolean) => {
        if (connected) {
          this.initContratcs();
        }
        return connected;
      })
      .catch((err: any) => {
        console.log('initWalletConnect providerWallet err: ', err);
      });

    return Promise.all([connecting]).then((connect: any) => {
      return connect[0];
    });
  }

  private initContratcs(): void {
    const { type, names, contract } = contracts;

    names.map((name) => {
      const { address, abi } = contract[name.toUpperCase()].chain[type];
      this.connectWallet.addContract({ name, address, abi }).then((status) => console.log(`is contract ${name} with ${address} added?: ${status}`));
    });
  }

  public getContract = (name: string) => this.connectWallet.Contract(name);

  private async checkNetwork(): Promise<any> {
    const { connector, providerName, network } = this.connectWallet as any;
    const { network: nInfo } = this.connectInfo;
    const { name, nativeCurrency, rpc, blockExp } = this.chain;

    if (providerName === 'MetaMask') {
      try {
        const resChain = await connector.connector.request({ method: 'eth_chainId' });

        if (network.chainID !== parseInt(resChain, 16)) {
          try {
            await connector.connector.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: `0x${network.chainID.toString(16)}` }],
            });
            return true;
          } catch (error) {
            if (error.code === 4902) {
              try {
                await connector.connector.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: `0x${nInfo.chainID.toString(16)}`,
                      chainName: name,
                      nativeCurrency,
                      rpcUrls: [rpc],
                      blockExplorerUrls: [blockExp],
                    },
                  ],
                });
                try {
                  const newChain = await connector.connector.request({ method: 'eth_chainId' });

                  if (nInfo.chainID !== parseInt(newChain, 16)) {
                    throw new Error('User reject switch network');
                  }
                } catch (err) {
                  throw new Error('get user chain');
                }

                return true;
              } catch (err) {
                throw new Error(`User reject add ${name}`);
              }
            } else {
              throw new Error('User reject switch network');
            }
          }
        }
      } catch (err) {
        console.log('getAccount wallet connect - get user account err: ', err);
        throw new Error(err);
      }
    }
    return true;
  }

  public async getAccount(account: { address?: string; balance?: string }): Promise<any> {
    console.log('start catch account', account);
    return new Promise((resolve: any, reject: any) => {
      this.checkNetwork()
        .then(() => {
          this.connectWallet.getAccounts().subscribe(
            (userAccount: any) => {
              console.log('user account: ', userAccount);
              if (!account || userAccount.address !== account.address) {
                resolve(userAccount);
                console.log(`account connected: ${userAccount.address.substring(0, 4)}...${userAccount.address.slice(userAccount.address.length - 4, userAccount.address.length)}`);
              }
            },
            (err: any) => {
              console.log('getAccount wallet connect - get user account err: ', err);
              if (err.code && err.code === 6) {
                console.log(`⚠️ User account disconnected!`, 'success');
                setTimeout(() => {
                  window.location.reload();
                }, 3000);
              } else {
                console.log(`⚠️ something went wrong`);
              }
              reject(err);
            }
          );
        })
        .catch((err) => {
          console.log(`⚠️ something went wrong`, err);
        });
    });
  }

  /**
   * Token Supply
   * @description Check if address accept spend amount of coins to contract.
   * @example
   * connectWalletService.getAllowance(amount,from,swapAddress).then(() => {},() => {});
   * @returns true | false
   */
  //  public tokenSupply(): Promise<any> {
  //   return new Promise((resolve, reject) => {

  //   });
  //  }

  /**
   * Check Allowance
   * @description Check if address accept spend amount of coins to contract.
   * @example
   * connectWalletService.getAllowance(amount,from,swapAddress).then(() => {},() => {});
   * @returns true | false
   */
  public getAllowance(amount: string, from: string, swapAddress: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.connectWallet
        .Contract('Token')
        .methods.allowance(from, swapAddress)
        .call()
        .then((allowance: string) => {
          const allow = new BigNumber(allowance);
          const allowed = allow.minus(amount);
          console.log('allowance', allowance, amount, allowed.isNegative());
          allowed.isNegative() ? reject() : resolve(1);
        });
    });
  }

  /**
   * Swap tokens from WDUCX to DUCX
   * @description Send coins to swap on contract.
   * @param blockchain blockchain number to swap, for WDUCX -> DUCX = 6, by default use 6
   * @param amount amount WDUCX to swap in wei
   * @param to DUCX address
   * @param from WDUCX address
   * @example
   * connectWalletService.swapWDUCXtoDUCX(blockchain,amount,to,from).then(() => {}).catch((err)=>{});
   * @returns true | false
   */
  public swapWDUCXtoDUCX(blockchain = 6, amount: string, to: string, from: string): Promise<any> {
    const { type, contract } = contracts;
    const swapAddress = contract.SWAP.chain[type].address;

    const swap = (resolve: any, reject: any) => {
      return this.connectWallet
        .Contract('Swap')
        .methods.transferToOtherBlockchain(blockchain, amount, to)
        .send({
          from,
        })
        .then((tx: any) => {
          const { transactionHash } = tx;
          console.log('stake', tx, transactionHash);

          return this.connectWallet.txCheck(transactionHash).then(
            (result) => {
              console.log('swap check transaction result', result);
            },
            (err) => {
              console.log('swap check transaction error', err);
              if (err === null || undefined) {
                this.connectWallet.clTxSubscribers(transactionHash);
              }
            }
          );
        })
        .then(resolve, reject);
    };

    return new Promise((resolve, reject) => {
      this.getAllowance(amount, from, swapAddress).then(
        () => swap(resolve, reject),
        () => {
          this.connectWallet
            .Contract('Token')
            .methods.approve(swapAddress, amount)
            .send({
              from,
            })
            .then(() => {
              swap(resolve, reject);
            }, reject);
        }
      );
    });
  }
}

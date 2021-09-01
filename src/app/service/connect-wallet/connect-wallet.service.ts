import { Injectable } from '@angular/core';
import { ConnectWallet } from '@amfi/connect-wallet';
import { getConnectWalletInfo, contracts, chains, blockchains } from 'src/app/config';
import { IChainConfigData, IConnectWallet } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ConnectWalletService {
  public connectInfo: IConnectWallet;
  public chain: IChainConfigData;

  constructor(private connectWallet: ConnectWallet) {}

  public async initWalletConnect(connectName: string, chainName: string): Promise<boolean> {
    this.connectWallet.addChains(blockchains);

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
    const { type, names, params } = contracts;

    names.map((name) => {
      const { address, abi } = params[name][type];
      this.connectWallet.addContract({ name, address, abi }).then((status) => console.log(`is contract ${name} with ${address} added?: ${status}`));
    });
  }

  public getContract = (name: string) => this.connectWallet.Contract(name);

  private async checkNetwork(): Promise<any> {
    const { connector, providerName, network } = this.connectWallet as any;
    const { provider, network: nInfo, settings } = this.connectInfo;
    const { name, nativeCurrency, rpc, blockExp } = this.chain;

    console.log('checkNetwork:', connector, providerName, network);

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
}

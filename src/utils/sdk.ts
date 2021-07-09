// https://www.npmjs.com/package/@starcoin/starcoin
import { providers } from '@starcoin/starcoin';
import { getNetwork } from '@/utils/helper';

const networks: string[] =
  process.env.REACT_APP_STARCOIN_NETWORKS?.split(',') || [];
const providerMap: Record<string, any> = {};
networks.forEach((n) => {
  providerMap[n] = new providers.JsonRpcProvider(
    `https://${n}-seed.starcoin.org`,
  );
});

export async function getTxnData(txnHash: string) {
  try {
    const provider = providerMap[getNetwork()]
    const result = await provider.getTransaction(txnHash);
    return result;
  } catch (error: any) {
    return false;
  }
}

export async function getAddressData(hash: string) {
  try {
    const provider = providerMap[getNetwork()]
    const result = await provider.getResource(hash, '0x1::Account::Account');
    return result;
  } catch (error: any) {
    return false;
  }
}

export async function getAddressResources(hash: string) {
  try {
    const provider = providerMap[getNetwork()]
    const result = await provider.getResources(hash);
    return result;
  } catch (error: any) {
    return false;
  }
}

export async function getBalancesData(hash: string) {
  try {
    const provider = providerMap[getNetwork()]
    const result = await provider.getBalances(hash);
    return result;
  } catch (error: any) {
    return false;
  }
}

export async function getAddressSTCBalance(hash: string) {
  try {
    const provider = providerMap[getNetwork()]
    const result = await provider.getResource(
      hash,
      '0x1::Account::Balance<0x1::STC::STC>',
    );
    return result;
  } catch (error: any) {
    return false;
  }
}

export async function getEpochData() {
  try {
    const provider = providerMap[getNetwork()]
    const result = await provider.getResource('0x1', '0x1::Epoch::Epoch');
    return result;
  } catch (error: any) {
    return false;
  }
}

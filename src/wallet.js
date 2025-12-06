import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
} from 'wagmi/chains';

const chains = [
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
];
const projectId = '5c2563bcdb4c4f17417550dd05439bf8';

const config = getDefaultConfig({
  appName: 'Token Portfolio', 
  projectId: projectId,
  chains: chains,
  ssr: true, 
});

export { config, chains };
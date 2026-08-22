import type { NextConfig } from 'next';

const [owner = '', repository = ''] = (process.env.GITHUB_REPOSITORY || '/').split('/');
const isUserSite = repository.toLowerCase() === `${owner.toLowerCase()}.github.io`;
const basePath = process.env.GITHUB_ACTIONS === 'true' && repository && !isUserSite ? `/${repository}` : '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
};

export default nextConfig;

export interface CloudinaryUrlParts {
  baseCloudUrl: string;
  assetPath: string;
}

export const parseCloudinaryUrlToParts = (url: string): CloudinaryUrlParts => {
  const [domainWithCloud, assetType, assetPath] = url.split(/\/(image|video)\/upload\//);
  return { baseCloudUrl: `${domainWithCloud}/${assetType}/upload`, assetPath };
};

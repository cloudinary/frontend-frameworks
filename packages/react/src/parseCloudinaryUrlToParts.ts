export interface CloudinaryUrlParts {
  baseCloudUrl: string;
  assetPath: string;
}

export const parseCloudinaryUrlToParts = (url: string): CloudinaryUrlParts => {
  const [assetDomainWithCloud, assetType, assetPath] = url.split(/\/(image|video)\/upload\//);
  return { baseCloudUrl: `${assetDomainWithCloud}/${assetType}/upload`, assetPath };
};

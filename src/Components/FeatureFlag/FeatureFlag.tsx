import { useState, useEffect, FC } from "react";

interface FeatureFlagState {
  [key: string]: boolean;
}

interface FeatureFlagsProps {
  feature: string;
  children: React.ReactNode;
}

const FeatureFlags: FC<FeatureFlagsProps> = ({ feature, children }) => {
  const [features, setFeatures] = useState<FeatureFlagState>({
    free: true,
    pro: false,
    enterprise: false,
  });

  // fetch the feature user has access to from backend API and set it.
  useEffect(() => {
    setTimeout(() => {
      setFeatures((prev) => ({
        ...prev,
        pro: true,
        enterprise: true,
      }));
    }, 8000);
  }, []);

  return features[feature] && children;
};

export default FeatureFlags;

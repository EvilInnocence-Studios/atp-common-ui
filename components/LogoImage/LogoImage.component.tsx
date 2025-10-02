import { useSetting } from "@common/lib/setting/services";
import { LogoImageProps } from "./LogoImage.d";

export const LogoImageComponent = ({}:LogoImageProps) =>{
  const imageUrl = useSetting("spinnerImageUrl");
  return imageUrl ? <img src={imageUrl} alt="Site Logo" style={{maxHeight: '40px'}} /> : null;
};

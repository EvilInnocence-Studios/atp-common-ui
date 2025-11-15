import { useSetting } from "@common/lib/setting/services";
import { LogoImageProps } from "./LogoImage.d";
import { overridable } from "@core/lib/overridable";

export const LogoImageComponent = overridable(({}:LogoImageProps) =>{
  const imageUrl = useSetting("spinnerImageUrl");
  return imageUrl ? <img src={imageUrl} alt="Site Logo" style={{maxHeight: '40px'}} /> : null;
});

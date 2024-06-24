import { getCurrentInstance } from "vue";

export default function useStaticImage() {
  const internalInstance = getCurrentInstance();
  const getStaticImage =
    internalInstance.appContext.config.globalProperties.getStaticImage;

  return getStaticImage;
}

import { Extension } from "./getColorByExtension";

export const getExtensionFromFileName = (fileName: string) =>
  fileName?.split(".").pop() as Extension;

import useRoundUp from "./useRoundUp";
export default function useMpgToLkm(mpg: number) {
  return useRoundUp(235.215 / mpg);
}

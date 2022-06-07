export function pathToHypen(path: string) {
  const h = path.replace(/\//g, "-");
  return h.startsWith("-") ? h.substring(1) : h;
}

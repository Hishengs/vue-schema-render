export function delay (t: number) {
  return new Promise((r) => {
    setTimeout(r, t);
  });
}
export default function delay(sec: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(0);
    }, sec * 1000);
  });
}

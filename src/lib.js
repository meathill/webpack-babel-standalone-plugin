export default async function () {
  const ntmy = await import('./lib2.js');
  return Object.values(ntmy).join(' ');
}

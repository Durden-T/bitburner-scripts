/** @param {NS} ns **/
export async function main(ns) {
	const tmpFloor = Math.floor;
	Math.floor = (number) => { return 1 };
	while (ns.getServerMoneyAvailable('home') < 1e9) { await ns.sleep(100); }
	Math.floor = tmpFloor;
}

/** @param {NS} ns **/
export async function main(ns) {
    const factionList = [
        ["Early-game:", ""],
        ["CyberSec", "Hack CSEC"],
        ["Tian Di Hui", "$1m, Hacking 50, Be in Chongqing, New Tokyo, or Ishima"],
        ["Netburners", "Hacking 80, Total Hacknet levels 100, RAM 8, Cores 4"],
        ["City:", ""],
        ["Sector-12", "$15m, Be in Sector-12, Not in any other city faction but Aevum"],
        ["Chongqing", "$20m, Be in Chongqing, Not in faction Sector-12, Aevum, or Volhaven"],
        ["New Tokyo", "$20m, Be in New Tokyo, Not in faction Sector-12, Aevum, or Volhaven"],
        ["Ishima", "$30m, Be in Ishima,    Not in faction Sector-12, Aevum, or Volhaven"],
        ["Aevum", "$40m, Be in Aevum,     Not in any other city faction but Sector-12"],
        ["Volhaven", "$50m, Be in Volhaven,  Not in any other city faction"],
        ["Hacker:", ""],
        ["NiteSec", "Hack avmnite-02h, Home RAM at least 32"],
        ["The Black Hand", "Hack I.I.I.I, Home RAM of 64 GB"],
        ["BitRunners", "Hack run4theh111z, Home RAM of 128 GB"],
        ["Megacorporations:", ""],
        ["MegaCorp", "Work for MegaCorp, 200k reputation"],
        ["Blade Industries", "Work for Blade Industries, 200k reputation"],
        ["Four Sigma", "Work for Four Sigma, 200k reputation"],
        ["KuaiGong International", "Work for KuaiGong International, 200k reputation"],
        ["NWO", "Work for NWO, 200k reputation"],
        ["OmniTek Incorporated", "Work for OmniTek Incorporated, 200k reputation"],
        ["ECorp", "Work for ECorp, 200k reputation"],
        ["Bachman & Associates", "Work for Bachman & Associates, 200k reputation"],
        ["Clarke Incorporated", "Work for Clarke Incorporated, 200k reputation"],
        ["Fulcrum Secret Tech...", "Hack fulcrumassets, Work for Fulcrum Technologies, 200k reputation"],
        ["Criminal:", ""],
        ["Slum Snakes", "$1m, All combat stats 30, -9 karma"],
        ["Tetrads", "Be in Chongqing, New Tokyo, or Ishima, All combat stats 75, -18 karma"],
        ["Silhouette", " $15m, CTO, CFO, or CEO at any company, -22 karma"],
        ["Speakers for the Dead", "Hacking 100, All combat stats 300, 30 people killed, -45 karma, NOT working for CIA or NSA"],
        ["The Dark Army", "Hacking 300, All combat stats 300, Be in Chongqing, 5 people killed, -45 karma, NOT working for CIA or NSA"],
        ["The Syndicate", " $10m, Hacking 200, All combat stats 200, Be in Aevum or Sector-12, -90 karma, NOT working for CIA or NSA"],
        ["Endgame", ""],
        ["The Covenant", "$75b, 30 augmentations, Hacking 850, All combat stats 850"],
        ["Daedalus", "$100b, 30 augmentations, Hacking 2500 or all combat stats 1500"],
        ["Illuminati", "$150b, 30 augmentations, Hacking 1500, All combat stats 1200"]
    ];
    const factionRow = "| %4s | %02d | %-22s | %s",
        headerRow = "|──────┼────| %-22s | %s";

    const args = ns.flags([
        ["help", false],
        ["noOutput", false],
        ["setNotDone", -1],
        ["clearAll", false]
    ]);

    if (args.help) {
        ns.tprint("Arguments are completed factions.");
        ns.tprint("Flags are [--help], [--noOutput], [--setNotDone numOfFaction], [--clearAll]");
        return;
    }

    const fileLocation = "gFactions.txt";

    let tempStatus = [],
        argLen = ns.args.length,
        modified = false;

    if (ns.fileExists(fileLocation, "home")) {
        var temp = ns.read(fileLocation);
        tempStatus = temp.split(",");
    } else {
        /** @type Array<Number> */
        tempStatus = new Array(32).fill(0);
    }

    for (let i = 0; i < argLen; i++) {
        let tempArg = ns.args[i];
        if (typeof tempArg == "number" && ns.args[i] > 0 && ns.args[i] < 32) {
            tempStatus[tempArg] = 1;
            modified = true;
        } else {
            break;
        }
    }
    if (args.clearAll) {
        let areYouSure = await ns.prompt("Are you sure you want to reset the faction list?");
        if (!areYouSure) {
            return;
        }
        for (var i = 0; i < 31; i++) {
            tempStatus[i] = 0;
            modified = true;
        }
    } else if (args.setNotDone > 0 && args.setNotDone < 32) {
        tempStatus[args.setNotDone] = 0;
        modified = true;
    }

    if (modified) {
        await ns.write(fileLocation, tempStatus, "w");
    }

    if (!args.noOutput) {
        var doneStatus = [];
        for (var i = 0; i < 31; i++) {
            if (tempStatus[i] == 1) {
                doneStatus[i] = "Done";
            } else {
                doneStatus[i] = " No ";
            }
        }

        ns.tprint("┌──────┬────┬────────────────────────┐");
        ns.tprint("| Done | ## | Faction Name:          | Requirements:");
        let offSet = 0;
        for (let i = 0; i < factionList.length; i++) {
            if (factionList[i][1] == "") {
                ns.tprint(ns.vsprintf(headerRow, factionList[i]));
                offSet++;
            } else {
                ns.tprint(ns.vsprintf(factionRow, [doneStatus[i - offSet], i - offSet, factionList[i][0], factionList[i][1]]));
            }
        }
        ns.tprint("└──────┴────┴────────────────────────┘");
    }
}

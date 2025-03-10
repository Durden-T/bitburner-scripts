import { NetscriptExtension } from "/cl/libs/NetscriptExtension";
function autocomplete(data, flags) {
  return [...data.servers];
}
let nsx;
function main(ns) {
  nsx = new NetscriptExtension(ns);
  nsx.killProcessesSpawnFromSameScript();
  const target = ns.args[0];
  const scriptName = "simpleHack.js";
  nsx.scanBFS("home", function(host) {
    if (host.hostname === "home") {
      return;
    }
    if (!ns.hasRootAccess(host.hostname)) {
      ns.tprint(`Skip ${host.hostname}. No root access.`);
      return;
    }
    const numberOfThread = Math.floor(
      (ns.getServerMaxRam(host.hostname) - ns.getServerUsedRam(host.hostname)) / ns.getScriptRam(scriptName)
    );
    if (numberOfThread === 0) {
      ns.tprint(`Skip ${host.hostname}. Not enough RAM.`);
      return;
    }
    ns.scriptKill(scriptName, host.hostname);
    ns.scp(scriptName, host.hostname);
    ns.exec(scriptName, host.hostname, numberOfThread, target);
    ns.tprint(`Host: ${host.hostname}. Threads: ${numberOfThread}`);
  });
}
export {
  autocomplete,
  main
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2hhY2tDb250cm9sbGVyMS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHtBdXRvY29tcGxldGVEYXRhLCBOU30gZnJvbSBcIkBuc1wiO1xyXG5pbXBvcnQge05ldHNjcmlwdEV4dGVuc2lvbn0gZnJvbSBcIi9saWJzL05ldHNjcmlwdEV4dGVuc2lvblwiO1xyXG5cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xyXG5leHBvcnQgZnVuY3Rpb24gYXV0b2NvbXBsZXRlKGRhdGE6IEF1dG9jb21wbGV0ZURhdGEsIGZsYWdzOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcclxuICAgIHJldHVybiBbLi4uZGF0YS5zZXJ2ZXJzXTtcclxufVxyXG5cclxubGV0IG5zeDogTmV0c2NyaXB0RXh0ZW5zaW9uO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1haW4obnM6IE5TKTogdm9pZCB7XHJcbiAgICBuc3ggPSBuZXcgTmV0c2NyaXB0RXh0ZW5zaW9uKG5zKTtcclxuICAgIG5zeC5raWxsUHJvY2Vzc2VzU3Bhd25Gcm9tU2FtZVNjcmlwdCgpO1xyXG5cclxuICAgIGNvbnN0IHRhcmdldCA9IG5zLmFyZ3NbMF07XHJcblxyXG4gICAgY29uc3Qgc2NyaXB0TmFtZSA9IFwic2ltcGxlSGFjay5qc1wiO1xyXG4gICAgbnN4LnNjYW5CRlMoXCJob21lXCIsIGZ1bmN0aW9uIChob3N0KSB7XHJcbiAgICAgICAgLy8gU2tpcCBob21lIHNlcnZlclxyXG4gICAgICAgIGlmIChob3N0Lmhvc3RuYW1lID09PSBcImhvbWVcIikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghbnMuaGFzUm9vdEFjY2Vzcyhob3N0Lmhvc3RuYW1lKSkge1xyXG4gICAgICAgICAgICBucy50cHJpbnQoYFNraXAgJHtob3N0Lmhvc3RuYW1lfS4gTm8gcm9vdCBhY2Nlc3MuYCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbnVtYmVyT2ZUaHJlYWQgPSBNYXRoLmZsb29yKFxyXG4gICAgICAgICAgICAobnMuZ2V0U2VydmVyTWF4UmFtKGhvc3QuaG9zdG5hbWUpIC0gbnMuZ2V0U2VydmVyVXNlZFJhbShob3N0Lmhvc3RuYW1lKSkgLyBucy5nZXRTY3JpcHRSYW0oc2NyaXB0TmFtZSlcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmIChudW1iZXJPZlRocmVhZCA9PT0gMCkge1xyXG4gICAgICAgICAgICBucy50cHJpbnQoYFNraXAgJHtob3N0Lmhvc3RuYW1lfS4gTm90IGVub3VnaCBSQU0uYCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbnMuc2NyaXB0S2lsbChzY3JpcHROYW1lLCBob3N0Lmhvc3RuYW1lKTtcclxuICAgICAgICBucy5zY3Aoc2NyaXB0TmFtZSwgaG9zdC5ob3N0bmFtZSk7XHJcbiAgICAgICAgbnMuZXhlYyhzY3JpcHROYW1lLCBob3N0Lmhvc3RuYW1lLCBudW1iZXJPZlRocmVhZCwgdGFyZ2V0KTtcclxuICAgICAgICBucy50cHJpbnQoYEhvc3Q6ICR7aG9zdC5ob3N0bmFtZX0uIFRocmVhZHM6ICR7bnVtYmVyT2ZUaHJlYWR9YCk7XHJcbiAgICB9KTtcclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiQUFDQSxTQUFRLDBCQUF5QjtBQUcxQixTQUFTLGFBQWEsTUFBd0IsT0FBMkI7QUFDNUUsU0FBTyxDQUFDLEdBQUcsS0FBSyxPQUFPO0FBQzNCO0FBRUEsSUFBSTtBQUVHLFNBQVMsS0FBSyxJQUFjO0FBQy9CLFFBQU0sSUFBSSxtQkFBbUIsRUFBRTtBQUMvQixNQUFJLGlDQUFpQztBQUVyQyxRQUFNLFNBQVMsR0FBRyxLQUFLLENBQUM7QUFFeEIsUUFBTSxhQUFhO0FBQ25CLE1BQUksUUFBUSxRQUFRLFNBQVUsTUFBTTtBQUVoQyxRQUFJLEtBQUssYUFBYSxRQUFRO0FBQzFCO0FBQUEsSUFDSjtBQUNBLFFBQUksQ0FBQyxHQUFHLGNBQWMsS0FBSyxRQUFRLEdBQUc7QUFDbEMsU0FBRyxPQUFPLFFBQVEsS0FBSyxRQUFRLG1CQUFtQjtBQUNsRDtBQUFBLElBQ0o7QUFDQSxVQUFNLGlCQUFpQixLQUFLO0FBQUEsT0FDdkIsR0FBRyxnQkFBZ0IsS0FBSyxRQUFRLElBQUksR0FBRyxpQkFBaUIsS0FBSyxRQUFRLEtBQUssR0FBRyxhQUFhLFVBQVU7QUFBQSxJQUN6RztBQUNBLFFBQUksbUJBQW1CLEdBQUc7QUFDdEIsU0FBRyxPQUFPLFFBQVEsS0FBSyxRQUFRLG1CQUFtQjtBQUNsRDtBQUFBLElBQ0o7QUFDQSxPQUFHLFdBQVcsWUFBWSxLQUFLLFFBQVE7QUFDdkMsT0FBRyxJQUFJLFlBQVksS0FBSyxRQUFRO0FBQ2hDLE9BQUcsS0FBSyxZQUFZLEtBQUssVUFBVSxnQkFBZ0IsTUFBTTtBQUN6RCxPQUFHLE9BQU8sU0FBUyxLQUFLLFFBQVEsY0FBYyxjQUFjLEVBQUU7QUFBQSxFQUNsRSxDQUFDO0FBQ0w7IiwKICAibmFtZXMiOiBbXQp9Cg==

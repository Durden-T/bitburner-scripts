import { NetscriptExtension } from "/cl/libs/NetscriptExtension";
import { CompletedProgramName } from "/cl/libs/Enums";
let nsx;
async function main(ns) {
  nsx = new NetscriptExtension(ns);
  nsx.killProcessesSpawnFromSameScript();
  ns.disableLog("ALL");
  const hosts = nsx.scanBFS("home");
  while (true) {
    let hasRootAccessOnAllHosts = true;
    for (const host of hosts) {
      const hostname = host.hostname;
      const server = ns.getServer(hostname);
      if (ns.hasRootAccess(host.hostname)) {
        continue;
      }
      if (!server.sshPortOpen && ns.fileExists(CompletedProgramName.bruteSsh, "home")) {
        ns.brutessh(host.hostname);
        server.openPortCount++;
      }
      if (!server.ftpPortOpen && ns.fileExists(CompletedProgramName.ftpCrack, "home")) {
        ns.ftpcrack(host.hostname);
        server.openPortCount++;
      }
      if (!server.smtpPortOpen && ns.fileExists(CompletedProgramName.relaySmtp, "home")) {
        ns.relaysmtp(host.hostname);
        server.openPortCount++;
      }
      if (!server.httpPortOpen && ns.fileExists(CompletedProgramName.httpWorm, "home")) {
        ns.httpworm(host.hostname);
        server.openPortCount++;
      }
      if (!server.sqlPortOpen && ns.fileExists(CompletedProgramName.sqlInject, "home")) {
        ns.sqlinject(host.hostname);
        server.openPortCount++;
      }
      if (server.openPortCount >= ns.getServerNumPortsRequired(host.hostname)) {
        ns.nuke(host.hostname);
        ns.tprint(`Nuke ${host.hostname} successfully`);
      } else {
        hasRootAccessOnAllHosts = false;
      }
    }
    if (hasRootAccessOnAllHosts) {
      break;
    }
    await ns.sleep(5e3);
  }
}
export {
  main
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL3B3bkFsbC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHtOU30gZnJvbSBcIkBuc1wiO1xyXG5pbXBvcnQge05ldHNjcmlwdEV4dGVuc2lvbn0gZnJvbSBcImxpYnMvTmV0c2NyaXB0RXh0ZW5zaW9uXCI7XHJcbmltcG9ydCB7Q29tcGxldGVkUHJvZ3JhbU5hbWV9IGZyb20gXCJsaWJzL0VudW1zXCI7XHJcblxyXG5sZXQgbnN4OiBOZXRzY3JpcHRFeHRlbnNpb247XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbWFpbihuczogTlMpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIG5zeCA9IG5ldyBOZXRzY3JpcHRFeHRlbnNpb24obnMpO1xyXG4gICAgbnN4LmtpbGxQcm9jZXNzZXNTcGF3bkZyb21TYW1lU2NyaXB0KCk7XHJcblxyXG4gICAgbnMuZGlzYWJsZUxvZyhcIkFMTFwiKTtcclxuXHJcbiAgICBjb25zdCBob3N0cyA9IG5zeC5zY2FuQkZTKFwiaG9tZVwiKTtcclxuICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgbGV0IGhhc1Jvb3RBY2Nlc3NPbkFsbEhvc3RzID0gdHJ1ZTtcclxuICAgICAgICBmb3IgKGNvbnN0IGhvc3Qgb2YgaG9zdHMpIHtcclxuICAgICAgICAgICAgY29uc3QgaG9zdG5hbWUgPSBob3N0Lmhvc3RuYW1lO1xyXG4gICAgICAgICAgICBjb25zdCBzZXJ2ZXIgPSBucy5nZXRTZXJ2ZXIoaG9zdG5hbWUpO1xyXG4gICAgICAgICAgICBpZiAobnMuaGFzUm9vdEFjY2Vzcyhob3N0Lmhvc3RuYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFzZXJ2ZXIuc3NoUG9ydE9wZW4gJiYgbnMuZmlsZUV4aXN0cyhDb21wbGV0ZWRQcm9ncmFtTmFtZS5icnV0ZVNzaCwgXCJob21lXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBucy5icnV0ZXNzaChob3N0Lmhvc3RuYW1lKTtcclxuICAgICAgICAgICAgICAgIHNlcnZlci5vcGVuUG9ydENvdW50ISsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghc2VydmVyLmZ0cFBvcnRPcGVuICYmIG5zLmZpbGVFeGlzdHMoQ29tcGxldGVkUHJvZ3JhbU5hbWUuZnRwQ3JhY2ssIFwiaG9tZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgbnMuZnRwY3JhY2soaG9zdC5ob3N0bmFtZSk7XHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXIub3BlblBvcnRDb3VudCErKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXNlcnZlci5zbXRwUG9ydE9wZW4gJiYgbnMuZmlsZUV4aXN0cyhDb21wbGV0ZWRQcm9ncmFtTmFtZS5yZWxheVNtdHAsIFwiaG9tZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgbnMucmVsYXlzbXRwKGhvc3QuaG9zdG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgc2VydmVyLm9wZW5Qb3J0Q291bnQhKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFzZXJ2ZXIuaHR0cFBvcnRPcGVuICYmIG5zLmZpbGVFeGlzdHMoQ29tcGxldGVkUHJvZ3JhbU5hbWUuaHR0cFdvcm0sIFwiaG9tZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgbnMuaHR0cHdvcm0oaG9zdC5ob3N0bmFtZSk7XHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXIub3BlblBvcnRDb3VudCErKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXNlcnZlci5zcWxQb3J0T3BlbiAmJiBucy5maWxlRXhpc3RzKENvbXBsZXRlZFByb2dyYW1OYW1lLnNxbEluamVjdCwgXCJob21lXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBucy5zcWxpbmplY3QoaG9zdC5ob3N0bmFtZSk7XHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXIub3BlblBvcnRDb3VudCErKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2VydmVyLm9wZW5Qb3J0Q291bnQhID49IG5zLmdldFNlcnZlck51bVBvcnRzUmVxdWlyZWQoaG9zdC5ob3N0bmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIG5zLm51a2UoaG9zdC5ob3N0bmFtZSk7XHJcbiAgICAgICAgICAgICAgICBucy50cHJpbnQoYE51a2UgJHtob3N0Lmhvc3RuYW1lfSBzdWNjZXNzZnVsbHlgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGhhc1Jvb3RBY2Nlc3NPbkFsbEhvc3RzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGhhc1Jvb3RBY2Nlc3NPbkFsbEhvc3RzKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhd2FpdCBucy5zbGVlcCg1MDAwKTtcclxuICAgIH1cclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiQUFDQSxTQUFRLDBCQUF5QjtBQUNqQyxTQUFRLDRCQUEyQjtBQUVuQyxJQUFJO0FBRUosZUFBc0IsS0FBSyxJQUF1QjtBQUM5QyxRQUFNLElBQUksbUJBQW1CLEVBQUU7QUFDL0IsTUFBSSxpQ0FBaUM7QUFFckMsS0FBRyxXQUFXLEtBQUs7QUFFbkIsUUFBTSxRQUFRLElBQUksUUFBUSxNQUFNO0FBQ2hDLFNBQU8sTUFBTTtBQUNULFFBQUksMEJBQTBCO0FBQzlCLGVBQVcsUUFBUSxPQUFPO0FBQ3RCLFlBQU0sV0FBVyxLQUFLO0FBQ3RCLFlBQU0sU0FBUyxHQUFHLFVBQVUsUUFBUTtBQUNwQyxVQUFJLEdBQUcsY0FBYyxLQUFLLFFBQVEsR0FBRztBQUNqQztBQUFBLE1BQ0o7QUFDQSxVQUFJLENBQUMsT0FBTyxlQUFlLEdBQUcsV0FBVyxxQkFBcUIsVUFBVSxNQUFNLEdBQUc7QUFDN0UsV0FBRyxTQUFTLEtBQUssUUFBUTtBQUN6QixlQUFPO0FBQUEsTUFDWDtBQUNBLFVBQUksQ0FBQyxPQUFPLGVBQWUsR0FBRyxXQUFXLHFCQUFxQixVQUFVLE1BQU0sR0FBRztBQUM3RSxXQUFHLFNBQVMsS0FBSyxRQUFRO0FBQ3pCLGVBQU87QUFBQSxNQUNYO0FBQ0EsVUFBSSxDQUFDLE9BQU8sZ0JBQWdCLEdBQUcsV0FBVyxxQkFBcUIsV0FBVyxNQUFNLEdBQUc7QUFDL0UsV0FBRyxVQUFVLEtBQUssUUFBUTtBQUMxQixlQUFPO0FBQUEsTUFDWDtBQUNBLFVBQUksQ0FBQyxPQUFPLGdCQUFnQixHQUFHLFdBQVcscUJBQXFCLFVBQVUsTUFBTSxHQUFHO0FBQzlFLFdBQUcsU0FBUyxLQUFLLFFBQVE7QUFDekIsZUFBTztBQUFBLE1BQ1g7QUFDQSxVQUFJLENBQUMsT0FBTyxlQUFlLEdBQUcsV0FBVyxxQkFBcUIsV0FBVyxNQUFNLEdBQUc7QUFDOUUsV0FBRyxVQUFVLEtBQUssUUFBUTtBQUMxQixlQUFPO0FBQUEsTUFDWDtBQUNBLFVBQUksT0FBTyxpQkFBa0IsR0FBRywwQkFBMEIsS0FBSyxRQUFRLEdBQUc7QUFDdEUsV0FBRyxLQUFLLEtBQUssUUFBUTtBQUNyQixXQUFHLE9BQU8sUUFBUSxLQUFLLFFBQVEsZUFBZTtBQUFBLE1BQ2xELE9BQU87QUFDSCxrQ0FBMEI7QUFBQSxNQUM5QjtBQUFBLElBQ0o7QUFDQSxRQUFJLHlCQUF5QjtBQUN6QjtBQUFBLElBQ0o7QUFDQSxVQUFNLEdBQUcsTUFBTSxHQUFJO0FBQUEsRUFDdkI7QUFDSjsiLAogICJuYW1lcyI6IFtdCn0K

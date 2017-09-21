import checkLocalComposer from './checkLocalComposer';
import downloadComposer from './downloadComposer';
import runComposerInstall from './runComposerInstall';


export default function composer(args) {
  return checkLocalComposer()
    .catch(downloadComposer)
    .then((commandName) => runComposerInstall(commandName, args));
}

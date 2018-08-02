const { clipboard } = require('electron');
const ipc = require('node-ipc');

let parentIpcId = 'markdown-image-paste-message-parent';
let childIpcId = 'markdown-image-paste-message-child';
let msg_getClipboardContent = 'markdown-image-paste-get-clipboard-content';
let msg_resClipboardContent = 'markdown-image-paste-res-clipboard-content';

// start electron ipc server
ipc.config.id = childIpcId;
ipc.config.retry = 1500;
ipc.config.silent = true;

ipc.serve(() => {
  ipc.server.on(msg_getClipboardContent, (data, socket) => {
    let image = clipboard.readImage();
    let buffer = image.toPNG();
    ipc.server.emit(socket, msg_resClipboardContent, buffer);
  });
});

ipc.server.start();

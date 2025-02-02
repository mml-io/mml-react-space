import { Networked3dWebExperienceClient } from "@mml-io/3d-web-experience-client";

const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
const host = window.location.host;
const userNetworkAddress = `${protocol}//${host}/network`;
const chatNetworkAddress = `${protocol}//${host}/chat-network`;

const sessionToken = new URLSearchParams(window.location.search).get("_s");

const holder = Networked3dWebExperienceClient.createFullscreenHolder();
const app = new Networked3dWebExperienceClient(holder, {
  sessionToken: sessionToken || (window as any).SESSION_TOKEN,
  userNetworkAddress,
  chatNetworkAddress,
  animationConfig: {
    airAnimationFileUrl: "/web-client/assets/models/anim_air.glb",
    idleAnimationFileUrl: "/web-client/assets/models/anim_idle.glb",
    jogAnimationFileUrl: "/web-client/assets/models/anim_jog.glb",
    sprintAnimationFileUrl: "/web-client/assets/models/anim_run.glb",
    doubleJumpAnimationFileUrl: "/web-client/assets/models/anim_double_jump.glb",
  },
  environmentConfiguration: {
    skybox: {
      hdrJpgUrl: "/web-client/assets/hdr/puresky_2k.jpg",
    },
  },
  avatarConfiguration: {
    availableAvatars: [],
  },
  mmlDocuments: {
    index: {
      url: `${protocol}//${host}/mml-document`,
    },
  },
});
app.update();

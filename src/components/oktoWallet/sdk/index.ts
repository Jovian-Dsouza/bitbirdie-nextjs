import { Base } from "./base";
import { Posts } from "./posts";
import { applyMixins } from "./utils";

class OktoSDK extends Base {}
interface OktoSDK extends Posts {}

applyMixins(OktoSDK, [Posts]);

export default OktoSDK;

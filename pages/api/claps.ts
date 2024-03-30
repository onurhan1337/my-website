import createClapsAPI from "@upstash/claps/api";

const ClapsAPI = createClapsAPI({
  maxClaps: 30,
});
export default ClapsAPI;

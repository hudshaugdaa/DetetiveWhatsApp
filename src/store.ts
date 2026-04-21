export const store = {
  getPhone: () => sessionStorage.getItem("funnel_phone") || "",
  setPhone: (v: string) => sessionStorage.setItem("funnel_phone", v),
  getCity: () => sessionStorage.getItem("funnel_city") || "",
  setCity: (v: string) => sessionStorage.setItem("funnel_city", v),
  getStateCode: () => sessionStorage.getItem("funnel_state_code") || "",
  setStateCode: (v: string) => sessionStorage.setItem("funnel_state_code", v),
};

export const STATE_DDDS: Record<string, string[]> = {
  AC: ["68"],
  AL: ["82"],
  AP: ["96"],
  AM: ["92", "97"],
  BA: ["71", "73", "74", "75", "77"],
  CE: ["85", "88"],
  DF: ["61"],
  ES: ["27", "28"],
  GO: ["62", "64"],
  MA: ["98", "99"],
  MT: ["65", "66"],
  MS: ["67"],
  MG: ["31", "32", "33", "34", "35", "37", "38"],
  PA: ["91", "93", "94"],
  PB: ["83"],
  PR: ["41", "42", "43", "44", "45", "46"],
  PE: ["81", "87"],
  PI: ["86", "89"],
  RJ: ["21", "22", "24"],
  RN: ["84"],
  RS: ["51", "53", "54", "55"],
  RO: ["69"],
  RR: ["95"],
  SC: ["47", "48", "49"],
  SP: ["11", "12", "13", "14", "15", "16", "17", "18", "19"],
  SE: ["79"],
  TO: ["63"],
};

export function getDDDsForState(stateCode: string): string[] {
  return STATE_DDDS[stateCode.toUpperCase()] || ["11", "21", "31"];
}

export function randomDDD(stateCode: string): string {
  const ddds = getDDDsForState(stateCode);
  return ddds[Math.floor(Math.random() * ddds.length)];
}

function randomDigits(n: number) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join("");
}

export function fakePhone(stateCode: string) {
  const ddd = randomDDD(stateCode);
  const last3 = randomDigits(4);
  return `(${ddd}) 9XXXX-${last3}`;
}

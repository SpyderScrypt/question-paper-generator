export const SEND_DATA = "SEND_DATA";

export function sendData(resumeData) {
  return {
    type: "SEND_DATA",
    payload: resumeData
  };
}

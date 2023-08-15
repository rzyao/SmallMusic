export function validataMail(mail: string) {
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  return reg.test(mail);
}
export function validataPassword(password: string) {
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
  return reg.test(password);
}

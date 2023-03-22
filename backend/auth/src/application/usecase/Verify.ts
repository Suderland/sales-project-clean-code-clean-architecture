import TokenGenerator from "../../domain/entity/TokenGenerator";

// use case
export default class Verify {
  // constructor serve para guardar "coisas"
  constructor () {
  }

  async execute (token: string): Promise<any> {
    const tokenGenerator = new TokenGenerator('key');
    return tokenGenerator.verify(token);
  }
}

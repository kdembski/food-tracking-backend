import Database from "../config/database.js";
import memberQueries from "../queries/member.js";
import { convertKeysToCamelCase } from "../utils/convert-keys-to-camel-case.js";

class MemberController {
  static getMembers() {
    return new Promise((resolve, reject) => {
      Database.sendQuery(memberQueries.select)
        .then((results) => resolve(convertKeysToCamelCase(results)))
        .catch((error) => reject(error));
    });
  }
}

export default MemberController;
